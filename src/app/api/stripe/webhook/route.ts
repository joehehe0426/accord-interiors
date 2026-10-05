import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

/**
 * Fulfillment must run here — not on success pages.
 * Configure this URL in Stripe Dashboard → Developers → Webhooks
 * (or `stripe listen --forward-to http://localhost:3000/api/stripe/webhook/`).
 */
export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("[stripe/webhook] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid signature";
    console.error("[stripe/webhook] signature verification failed:", message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.payment_status === "unpaid") break;
        await onCheckoutPaid(session);
        break;
      }
      case "checkout.session.async_payment_failed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.warn("[stripe/webhook] async payment failed", session.id);
        break;
      }
      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        await onInvoicePaid(invoice);
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        console.warn(
          "[stripe/webhook] invoice payment failed",
          invoice.id,
          invoice.customer_email,
        );
        break;
      }
      case "invoice.finalized": {
        const invoice = event.data.object as Stripe.Invoice;
        console.info(
          "[stripe/webhook] invoice finalized",
          invoice.id,
          invoice.hosted_invoice_url,
        );
        break;
      }
      default:
        break;
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Handler failed";
    console.error("[stripe/webhook] handler error:", message);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function onCheckoutPaid(session: Stripe.Checkout.Session) {
  // Hook: mark project deposit paid in your CRM / send internal email.
  console.info("[stripe/webhook] checkout paid", {
    sessionId: session.id,
    amountTotal: session.amount_total,
    currency: session.currency,
    email: session.customer_details?.email ?? session.customer_email,
    projectCode: session.metadata?.project_code,
  });
}

async function onInvoicePaid(invoice: Stripe.Invoice) {
  // Hook: mark milestone paid; invoice.paid is the canonical settled event.
  console.info("[stripe/webhook] invoice paid", {
    invoiceId: invoice.id,
    amountPaid: invoice.amount_paid,
    currency: invoice.currency,
    email: invoice.customer_email,
    projectCode: invoice.metadata?.project_code,
  });
}
