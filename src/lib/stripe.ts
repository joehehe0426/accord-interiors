import Stripe from "stripe";

let stripeClient: Stripe | null = null;

/**
 * Server-only Stripe client. Never import this into Client Components.
 * Uses the instance pattern (not the deprecated global apiKey setter).
 */
export function getStripe(): Stripe {
  if (stripeClient) return stripeClient;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }

  stripeClient = new Stripe(secretKey, {
    apiVersion: "2026-08-26.dahlia",
    typescript: true,
    appInfo: {
      name: "Accord Interiors",
      url: "https://accordinterior.autragroupltd.com",
    },
  });

  return stripeClient;
}

export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://accordinterior.autragroupltd.com";
  return raw.replace(/\/+$/, "");
}

/** HKD amounts use the smallest currency unit (cents). e.g. HKD 1,000.00 → 100000 */
export function hkdToCents(amountHkd: number): number {
  return Math.round(amountHkd * 100);
}
