import { readFileSync, writeFileSync } from "fs";
import Stripe from "stripe";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i), l.slice(i + 1)];
    }),
);

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-08-26.dahlia",
});

/** Same packages, HKD list prices for Hong Kong customers. */
const hkdPrices = [
  {
    productId: "prod_VLRG5Drk5Qgcc9",
    slug: "design-consultation",
    amountHkd: 3900,
    usdPriceId: "price_1UKkO8FCJQAnnbREvkHNvxB1",
    amountUsd: 500,
    key: "Accord Interiors::Design Consultation",
  },
  {
    productId: "prod_VLRGT9gZCzmapG",
    slug: "design-package",
    amountHkd: 5450,
    usdPriceId: "price_1UKkO9FCJQAnnbREn8ot0qHU",
    amountUsd: 700,
    key: "Accord Interiors::Design Package",
  },
];

const results = [];

for (const item of hkdPrices) {
  const price = await stripe.prices.create({
    product: item.productId,
    currency: "hkd",
    unit_amount: item.amountHkd * 100,
    nickname: `${item.slug}-hkd`,
    metadata: {
      slug: item.slug,
      currency: "hkd",
    },
  });

  results.push({
    key: item.key,
    slug: item.slug,
    productId: item.productId,
    prices: {
      usd: { priceId: item.usdPriceId, amount: item.amountUsd },
      hkd: { priceId: price.id, amount: item.amountHkd },
    },
  });

  console.log(`OK ${item.slug} HKD → ${price.id} (HK$${item.amountHkd})`);
}

writeFileSync(
  "stripe-usd-packages.json",
  JSON.stringify(results, null, 2) + "\n",
);
console.log(JSON.stringify(results, null, 2));
