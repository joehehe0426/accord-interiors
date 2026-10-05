import { NextResponse } from "next/server";
import type Stripe from "stripe";
import {
  amountForPriceId,
  currencyForPriceId,
  DELIVERY_FEE_HKD,
  FREE_DELIVERY_MIN_HKD,
  isCataloguePriceId,
  MAX_CART_LINES,
  MAX_LINE_QTY,
} from "@/lib/catalogue";
import { getSiteUrl, getStripe, hkdToCents } from "@/lib/stripe";
import type { SiteCurrency } from "@/lib/regions";

type CartItem = {
  priceId: string;
  quantity: number;
};

type CheckoutBody = {
  items?: CartItem[];
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  amountHkd?: number;
  description?: string;
  projectCode?: string;
};

function mergeCartItems(items: CartItem[]): CartItem[] {
  const merged = new Map<string, number>();
  for (const item of items) {
    const qty = Math.min(
      MAX_LINE_QTY,
      Math.max(0, Math.round(Number(item.quantity) || 0)),
    );
    if (!qty) continue;
    merged.set(
      item.priceId,
      Math.min(MAX_LINE_QTY, (merged.get(item.priceId) ?? 0) + qty),
    );
  }
  return [...merged.entries()].map(([priceId, quantity]) => ({
    priceId,
    quantity,
  }));
}

/**
 * Creates a Stripe Checkout Session.
 * - Cart: `items: [{ priceId, quantity }]` from /products (single currency)
 * - Deposit: `amountHkd` from /pay
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutBody;
    const stripe = getStripe();
    const siteUrl = getSiteUrl();

    const rawItems = Array.isArray(body.items) ? body.items : [];
    const useCart = rawItems.length > 0;

    let line_items: Stripe.Checkout.SessionCreateParams.LineItem[];
    let cancelUrl = `${siteUrl}/pay/cancel`;
    let cartCurrency: SiteCurrency | null = null;
    const metadata: Record<string, string> = {
      source: useCart ? "products_cart" : "pay_deposit",
    };

    if (useCart) {
      if (rawItems.length > MAX_CART_LINES) {
        return NextResponse.json(
          { error: `Cart cannot exceed ${MAX_CART_LINES} lines` },
          { status: 400 },
        );
      }

      for (const item of rawItems) {
        if (!item.priceId || !isCataloguePriceId(item.priceId)) {
          return NextResponse.json(
            { error: "Each cart item needs a valid catalogue priceId" },
            { status: 400 },
          );
        }
      }

      const cartItems = mergeCartItems(rawItems);
      if (cartItems.length === 0) {
        return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
      }

      const currencies = new Set(
        cartItems.map((item) => currencyForPriceId(item.priceId)),
      );
      if (currencies.has(undefined) || currencies.size !== 1) {
        return NextResponse.json(
          {
            error:
              "Cart mixes currencies. Choose one country (Hong Kong / United States) and try again.",
          },
          { status: 400 },
        );
      }
      cartCurrency = [...currencies][0] as SiteCurrency;
      metadata.currency = cartCurrency;

      line_items = cartItems.map((item) => ({
        price: item.priceId,
        quantity: item.quantity,
      }));

      if (cartCurrency === "hkd") {
        const subtotalHkd = cartItems.reduce((sum, item) => {
          const unit = amountForPriceId(item.priceId) ?? 0;
          return sum + unit * item.quantity;
        }, 0);

        if (subtotalHkd < FREE_DELIVERY_MIN_HKD) {
          line_items.push({
            quantity: 1,
            price_data: {
              currency: "hkd",
              unit_amount: hkdToCents(DELIVERY_FEE_HKD),
              product_data: { name: "Island-wide delivery" },
            },
          });
        }
      }

      cancelUrl = `${siteUrl}/products/`;
      if (body.customerName?.trim()) {
        metadata.customer_name = body.customerName.trim().slice(0, 200);
      }
      if (body.customerPhone?.trim()) {
        metadata.customer_phone = body.customerPhone.trim().slice(0, 40);
      }
    } else {
      const amountHkd = Number(body.amountHkd);
      const description =
        body.description?.trim() || "Accord Interiors — project payment";
      const projectCode = body.projectCode?.trim();

      if (!Number.isFinite(amountHkd) || amountHkd < 1) {
        return NextResponse.json(
          { error: "amountHkd must be at least 1 (HKD), or pass cart items" },
          { status: 400 },
        );
      }
      if (amountHkd > 5_000_000) {
        return NextResponse.json(
          { error: "amountHkd exceeds allowed maximum" },
          { status: 400 },
        );
      }

      line_items = [
        {
          quantity: 1,
          price_data: {
            currency: "hkd",
            unit_amount: hkdToCents(amountHkd),
            product_data: {
              name: description.slice(0, 250),
              metadata: projectCode ? { project_code: projectCode } : undefined,
            },
          },
        },
      ];
      if (projectCode) metadata.project_code = projectCode.slice(0, 100);
    }

    const session = await stripe.checkout.sessions.create({
      ui_mode: "hosted_page",
      mode: "payment",
      billing_address_collection: "auto",
      phone_number_collection: { enabled: false },
      automatic_tax: { enabled: false },
      allow_promotion_codes: false,
      submit_type: "auto",
      integration_identifier: "hosted_web_0003",
      origin_context: "web",
      customer_email: body.customerEmail?.trim() || undefined,
      line_items,
      success_url: `${siteUrl}/pay/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      metadata,
      ...(useCart && cartCurrency === "hkd"
        ? {
            shipping_address_collection: {
              allowed_countries: ["HK"],
            },
          }
        : {}),
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Checkout Session missing redirect URL" },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create checkout";
    console.error("[stripe/checkout]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
