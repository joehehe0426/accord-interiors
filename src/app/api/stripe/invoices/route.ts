import { NextResponse } from "next/server";
import { getStripe, hkdToCents } from "@/lib/stripe";

type InvoiceLine = {
  description: string;
  amountHkd: number;
  quantity?: number;
};

type InvoiceBody = {
  customerName?: string;
  customerEmail?: string;
  daysUntilDue?: number;
  projectCode?: string;
  memo?: string;
  lines?: InvoiceLine[];
};

function authorize(request: Request): boolean {
  const expected = process.env.STRIPE_INVOICE_API_SECRET;
  if (!expected) return false;
  const provided = request.headers.get("x-accord-invoice-key");
  return Boolean(provided && provided === expected);
}

/**
 * Creates a draft invoice, adds line items, finalizes, and emails the Hosted Invoice Page.
 * Protect with STRIPE_INVOICE_API_SECRET (header: x-accord-invoice-key).
 * Day-to-day unique project invoices can also be created in the Stripe Dashboard.
 */
export async function POST(request: Request) {
  if (!authorize(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as InvoiceBody;
    const customerName = body.customerName?.trim();
    const customerEmail = body.customerEmail?.trim();
    const projectCode = body.projectCode?.trim();
    const memo = body.memo?.trim();
    const daysUntilDue = body.daysUntilDue ?? 14;
    const lines = body.lines ?? [];

    if (!customerEmail) {
      return NextResponse.json(
        { error: "customerEmail is required" },
        { status: 400 },
      );
    }

    if (lines.length === 0) {
      return NextResponse.json(
        { error: "At least one line item is required" },
        { status: 400 },
      );
    }

    for (const line of lines) {
      if (!line.description?.trim() || !(Number(line.amountHkd) > 0)) {
        return NextResponse.json(
          { error: "Each line needs description and amountHkd > 0" },
          { status: 400 },
        );
      }
    }

    const stripe = getStripe();

    const customer = await stripe.customers.create({
      name: customerName || undefined,
      email: customerEmail,
      metadata: {
        source: "accord_interiors",
        ...(projectCode ? { project_code: projectCode } : {}),
      },
    });

    const invoice = await stripe.invoices.create({
      customer: customer.id,
      collection_method: "send_invoice",
      days_until_due: daysUntilDue,
      auto_advance: true,
      description: memo || undefined,
      metadata: {
        source: "accord_interiors",
        ...(projectCode ? { project_code: projectCode } : {}),
      },
      ...(projectCode
        ? {
            custom_fields: [
              { name: "Project code", value: projectCode.slice(0, 30) },
            ],
          }
        : {}),
    });

    if (!invoice.id) {
      throw new Error("Invoice create returned no id");
    }

    for (const line of lines) {
      const quantity = Math.max(1, Math.round(line.quantity ?? 1));
      await stripe.invoiceItems.create({
        customer: customer.id,
        invoice: invoice.id,
        description: line.description.trim(),
        quantity,
        amount: hkdToCents(Number(line.amountHkd)),
        currency: "hkd",
      });
    }

    const finalized = await stripe.invoices.finalizeInvoice(invoice.id);
    if (!finalized.id) {
      throw new Error("Invoice finalize returned no id");
    }
    const sent = await stripe.invoices.sendInvoice(finalized.id);

    return NextResponse.json({
      invoiceId: sent.id,
      status: sent.status,
      hostedInvoiceUrl: sent.hosted_invoice_url,
      invoicePdf: sent.invoice_pdf,
      customerId: customer.id,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create invoice";
    console.error("[stripe/invoices]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
