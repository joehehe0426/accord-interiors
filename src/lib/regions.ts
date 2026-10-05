export type SiteCurrency = "hkd" | "usd";

export type SiteRegion = {
  countryCode: "HK" | "US";
  currency: SiteCurrency;
  label: string;
  currencyLabel: string;
  symbol: string;
};

/**
 * Shopper country → checkout currency.
 * Hong Kong → HKD; United States (most common USD market) → USD.
 */
export const REGIONS: readonly SiteRegion[] = [
  {
    countryCode: "HK",
    currency: "hkd",
    label: "Hong Kong",
    currencyLabel: "HKD",
    symbol: "HK$",
  },
  {
    countryCode: "US",
    currency: "usd",
    label: "United States",
    currencyLabel: "USD",
    symbol: "US$",
  },
] as const;

/** Default for local / first visit: Hong Kong (HKD). */
export const DEFAULT_REGION = REGIONS[0];

export const REGION_STORAGE_KEY = "accord-region-v1";

export function regionByCountryCode(
  code: string | null | undefined,
): SiteRegion {
  return REGIONS.find((r) => r.countryCode === code) ?? DEFAULT_REGION;
}

export function formatMoney(
  amount: number,
  currency: SiteCurrency,
  locale = "en-HK",
): string {
  const code = currency === "usd" ? "USD" : "HKD";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
