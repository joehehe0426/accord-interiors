import type { SiteCurrency } from "@/lib/regions";

export type CatalogueItem = {
  key: string;
  /** Default price (used when no localized entry matches). */
  priceId: string;
  amount: number;
  currency: SiteCurrency;
  /** Per-currency Stripe prices when the product is sold in more than one currency. */
  prices?: Partial<
    Record<SiteCurrency, { priceId: string; amount: number }>
  >;
};

/** Stripe Price IDs synced from the /products catalogue (live). */
export const CATALOGUE: ReadonlyArray<CatalogueItem> = [
  { key: "Edward Bulmer::Natural Paint", priceId: "price_1UJtzzFCJQAnnbRE9Ynjz5z6", amount: 1680, currency: "hkd" },
  { key: "San Marco::Stucco Veneziano", priceId: "price_1UJtzxFCJQAnnbREq2sxUCOa", amount: 2680, currency: "hkd" },
  { key: "Novacolor::Plaster Art Mineral", priceId: "price_1UJtzxFCJQAnnbRExiQYD69o", amount: 2280, currency: "hkd" },
  { key: "Farrow & Ball::Estate Emulsion", priceId: "price_1UJu01FCJQAnnbREmpDrB3cu", amount: 680, currency: "hkd" },
  { key: "Farrow & Ball::Modern Emulsion", priceId: "price_1UJtzvFCJQAnnbRERJWHQLsX", amount: 720, currency: "hkd" },
  { key: "Little Greene::Intelligent Matt", priceId: "price_1UJtzuFCJQAnnbREmbGeUQee", amount: 590, currency: "hkd" },
  { key: "Benjamin Moore::Aura Interior", priceId: "price_1UJtzzFCJQAnnbREyUdkTZRt", amount: 780, currency: "hkd" },
  { key: "Bauwerk Colour::Limewash", priceId: "price_1UJtztFCJQAnnbREcNsanBAv", amount: 1250, currency: "hkd" },
  { key: "Graphenstone::Ecosphere Matt", priceId: "price_1UJtztFCJQAnnbREGNJCtGLV", amount: 1380, currency: "hkd" },
  { key: "Agata Blue::Lappato Bookmatch Slab", priceId: "price_1UJtzyFCJQAnnbREVhc9Lqha", amount: 18800, currency: "hkd" },
  { key: "Bisazza::Gemmy Glass Mosaic", priceId: "price_1UJtzzFCJQAnnbRE7EIEYRfY", amount: 1880, currency: "hkd" },
  { key: "Calacatta::Marble — Bookmatched Slabs", priceId: "price_1UJtzzFCJQAnnbREynVFvqDR", amount: 15800, currency: "hkd" },
  { key: "Marazzi::Large-Format Porcelain", priceId: "price_1UJtzzFCJQAnnbREYrkxZEBG", amount: 3200, currency: "hkd" },
  { key: "Atlas Concorde::Smart Architectural Tile", priceId: "price_1UJtzyFCJQAnnbREM2BiDRTI", amount: 980, currency: "hkd" },
  { key: "Porcelanosa::Technical Porcelain", priceId: "price_1UJtzyFCJQAnnbREwKJfgQMV", amount: 720, currency: "hkd" },
  { key: "Designer Terrazzo::Fior di Terrazzo", priceId: "price_1UJtzwFCJQAnnbREs7cznAuF", amount: 1450, currency: "hkd" },
  {
    key: "Accord Interiors::Design Consultation",
    priceId: "price_1UKkO8FCJQAnnbREvkHNvxB1",
    amount: 500,
    currency: "usd",
    prices: {
      usd: { priceId: "price_1UKkO8FCJQAnnbREvkHNvxB1", amount: 500 },
      hkd: { priceId: "price_1UKkPBFCJQAnnbREQTyC3UEQ", amount: 3900 },
    },
  },
  {
    key: "Accord Interiors::Design Package",
    priceId: "price_1UKkO9FCJQAnnbREn8ot0qHU",
    amount: 700,
    currency: "usd",
    prices: {
      usd: { priceId: "price_1UKkO9FCJQAnnbREn8ot0qHU", amount: 700 },
      hkd: { priceId: "price_1UKkPCFCJQAnnbREqI9sxDG2", amount: 5450 },
    },
  },
];

const BY_KEY = Object.fromEntries(CATALOGUE.map((item) => [item.key, item]));

const ALLOWED_PRICE_IDS = new Set<string>();
const AMOUNT_BY_PRICE_ID: Record<string, number> = {};
const CURRENCY_BY_PRICE_ID: Record<string, SiteCurrency> = {};

for (const item of CATALOGUE) {
  ALLOWED_PRICE_IDS.add(item.priceId);
  AMOUNT_BY_PRICE_ID[item.priceId] = item.amount;
  CURRENCY_BY_PRICE_ID[item.priceId] = item.currency;
  if (!item.prices) continue;
  for (const [cur, p] of Object.entries(item.prices) as [
    SiteCurrency,
    { priceId: string; amount: number } | undefined,
  ][]) {
    if (!p) continue;
    ALLOWED_PRICE_IDS.add(p.priceId);
    AMOUNT_BY_PRICE_ID[p.priceId] = p.amount;
    CURRENCY_BY_PRICE_ID[p.priceId] = cur;
  }
}

export const FREE_DELIVERY_MIN_HKD = 2000;
export const DELIVERY_FEE_HKD = 80;
export const MAX_CART_LINES = 20;
export const MAX_LINE_QTY = 99;

export function catalogueKey(brand: string, name: string): string {
  return `${brand}::${name}`;
}

export function catalogueItemFor(
  brand: string,
  name: string,
): CatalogueItem | undefined {
  return BY_KEY[catalogueKey(brand, name)];
}

/** Resolve Stripe Price ID for a product in the shopper's currency. */
export function stripePriceIdFor(
  brand: string,
  name: string,
  currency: SiteCurrency = "hkd",
): string | undefined {
  const item = catalogueItemFor(brand, name);
  if (!item) return undefined;
  const localized = item.prices?.[currency];
  if (localized) return localized.priceId;
  if (item.currency === currency) return item.priceId;
  return undefined;
}

export function amountForProduct(
  brand: string,
  name: string,
  currency: SiteCurrency,
): number | undefined {
  const item = catalogueItemFor(brand, name);
  if (!item) return undefined;
  const localized = item.prices?.[currency];
  if (localized) return localized.amount;
  if (item.currency === currency) return item.amount;
  return undefined;
}

export function isCataloguePriceId(priceId: string): boolean {
  return ALLOWED_PRICE_IDS.has(priceId);
}

export function amountForPriceId(priceId: string): number | undefined {
  return AMOUNT_BY_PRICE_ID[priceId];
}

/** @deprecated Prefer amountForPriceId + currencyForPriceId */
export function amountHkdForPriceId(priceId: string): number | undefined {
  if (CURRENCY_BY_PRICE_ID[priceId] !== "hkd") return undefined;
  return AMOUNT_BY_PRICE_ID[priceId];
}

export function currencyForPriceId(priceId: string): SiteCurrency | undefined {
  return CURRENCY_BY_PRICE_ID[priceId];
}
