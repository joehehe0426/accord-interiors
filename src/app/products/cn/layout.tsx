import type { Metadata } from "next";

const siteUrl = "https://accordinterior.autragroupltd.com";

export const metadata: Metadata = {
  title: "精选涂料与饰面物料 | Accord Interiors 商城",
  description:
    "于香港选购顶级饰面物料——Edward Bulmer 天然漆、圣马可威尼斯灰泥、Novacolor 矿物饰面、Farrow & Ball、Little Greene、Bauwerk 石灰浆与 Graphenstone。提供业界价、送货及专业施工。",
  alternates: {
    canonical: "/products/cn",
    languages: {
      "zh-Hant": "/products",
      "zh-Hans": "/products/cn",
      "x-default": "/products",
    },
  },
  openGraph: {
    title: "精选涂料与饰面物料 | Accord Interiors",
    description: "传统乳胶漆、手工天然漆、威尼斯灰泥与碳负矿物饰面——香港供货，业界价与专业施工。",
    url: `${siteUrl}/products/cn`,
    locale: "zh_CN",
    type: "website",
  },
};

export default function SimplifiedProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
