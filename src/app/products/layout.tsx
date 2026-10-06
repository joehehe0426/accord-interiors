import type { Metadata } from "next";

const siteUrl = "https://accordinterior.autragroupltd.com";

export const metadata: Metadata = {
  title: "精選塗料與飾面物料 | Accord Interiors 商城",
  description:
    "於香港選購頂級飾面物料——Edward Bulmer 天然漆、聖馬可威尼斯灰泥、Novacolor 礦物飾面、Farrow & Ball、Little Greene、Bauwerk 石灰漿與 Graphenstone。提供業界價、送貨及專業施工。",
  keywords: [
    "香港油漆",
    "Farrow and Ball Hong Kong",
    "精選塗料",
    "油漆",
    "室內設計",
    "Accord Interiors",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/products",
    languages: {
      "zh-Hant": "/products",
      "zh-Hans": "/products/cn",
      "x-default": "/products",
    },
  },
  openGraph: {
    title: "精選塗料與飾面物料 | Accord Interiors",
    description:
      "傳統乳膠漆、手工天然漆、威尼斯灰泥與碳負礦物飾面——香港供貨，業界價與專業施工。",
    url: `${siteUrl}/products`,
    siteName: "Accord Interiors",
    locale: "zh_HK",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 696,
        alt: "Accord Interiors",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
