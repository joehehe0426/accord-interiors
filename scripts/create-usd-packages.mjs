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

const packages = [
  {
    name: "Design Consultation",
    brand: "Accord Interiors",
    slug: "design-consultation",
    amountUsd: 500,
    description:
      "One-on-one design consultation with Accord Interiors — concept direction, material guidance and a clear next-step plan for your project.",
    image:
      "https://accordinterior.autragroupltd.com/images/about-bg.jpg",
  },
  {
    name: "Design Package",
    brand: "Accord Interiors",
    slug: "design-package",
    amountUsd: 700,
    description:
      "Full design package with Accord Interiors — space planning outline, finish recommendations and a scoped proposal for your renovation or fit-out.",
    image:
      "https://accordinterior.autragroupltd.com/images/projects/slide0.jpg",
  },
];

const results = [];

for (const item of packages) {
  const product = await stripe.products.create({
    name: `${item.brand} ${item.name}`,
    description: item.description,
    images: [item.image],
    metadata: {
      slug: item.slug,
      brand: item.brand,
      category: "services",
      source: "accord_interiors_products_page",
      currency: "usd",
    },
  });

  const price = await stripe.prices.create({
    product: product.id,
    currency: "usd",
    unit_amount: item.amountUsd * 100,
    nickname: `${item.slug}-usd`,
    metadata: {
      slug: item.slug,
      currency: "usd",
    },
  });

  await stripe.products.update(product.id, { default_price: price.id });

  results.push({
    key: `${item.brand}::${item.name}`,
    slug: item.slug,
    name: product.name,
    productId: product.id,
    priceId: price.id,
    amountUsd: item.amountUsd,
    currency: "usd",
  });

  console.log(
    `OK ${item.slug} → ${product.id} / ${price.id} (USD $${item.amountUsd})`,
  );
}

writeFileSync(
  "stripe-usd-packages.json",
  JSON.stringify(results, null, 2) + "\n",
);
console.log(JSON.stringify(results, null, 2));
