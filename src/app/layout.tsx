import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://accordinterior.autragroupltd.com";

export const metadata: Metadata = {
  title: "Accord Interiors | 香港室內設計及建造工作室",
  description:
    "我們讓空間活起來——由概念到完工。香港設計及建造工作室，以精準與用心打造住宅、商業與酒店室內空間。",
  keywords: [
    "Hong Kong interior design",
    "interior design Hong Kong",
    "HK interior designer",
    "residential design Hong Kong",
    "commercial interior design",
    "contracting Hong Kong",
    "Accord Interiors",
    "室內設計",
    "香港室內設計",
    "裝修工程",
    "家居設計",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
    languages: {
      "zh-Hant": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Accord Interiors | 香港室內設計及建造工作室",
    description:
      "我們讓空間活起來——由概念到完工。香港設計及建造工作室，打造住宅、商業與酒店室內空間。",
    url: siteUrl,
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
  twitter: {
    card: "summary_large_image",
    title: "Accord Interiors | 香港室內設計及建造工作室",
    description:
      "我們讓空間活起來——由概念到完工。香港設計及建造工作室。",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      name: "Accord Interiors Company",
      description:
        "香港室內設計及工程公司，專注住宅、商業與酒店空間。",
      url: siteUrl,
      telephone: "+852" + "44856645",
      email: "accordinteriorscompanys@gmail.com",
      identifier: {
        "@type": "PropertyValue",
        propertyID: "BR",
        name: "Business Registration Number",
        value: "25453531",
      },
      image: `${siteUrl}/images/logo.png`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Flat 1413, 14/F, Sheung Lai House, Sheung Tak Est",
        addressLocality: "TKO",
        addressRegion: "Hong Kong",
        addressCountry: "HK",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 22.3072,
        longitude: 114.2529,
      },
      founder: {
        "@type": "Person",
        name: "Chan Chun Wai",
      },
      knowsAbout: [
        "Interior Design",
        "Contracting",
        "Project Management",
        "Residential Design",
        "Commercial Design",
        "Renovation",
        "Space Planning",
        "Lighting Design",
      ],
      areaServed: "Hong Kong",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "09:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "09:00",
          closes: "13:00",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What interior design services does Accord Interiors offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Accord Interiors provides full-service interior design and contracting for residential, commercial, and hospitality spaces in Hong Kong. Services include space planning, design concept development, construction drawings, project management, and renovation — from initial concept to completion.",
          },
        },
        {
          "@type": "Question",
          name: "Is Accord Interiors based in Hong Kong?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Accord Interiors is a Hong Kong-based design-and-build studio. Our office is located in TKO, and we serve clients across Hong Kong including Hung Hom, Kowloon Tong, Sai Kung, and the Southern District.",
          },
        },
        {
          "@type": "Question",
          name: "What types of projects does Accord Interiors handle?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We handle residential homes and apartments, commercial offices, show flats, restaurants, and public spaces. Our portfolio includes projects at Chatham Gate, Residence Bel-Air, Mount Beacon, Pacific Palisades, Symphony Bay, and more.",
          },
        },
        {
          "@type": "Question",
          name: "Does Accord Interiors provide project management and warranty?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we manage every project from start to finish with full budget transparency and on-time delivery. All projects include a 1-year quality warranty and professional photography upon completion.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <head>
        <link rel="canonical" href={siteUrl} />
        <link rel="alternate" hrefLang="zh-Hant" href={siteUrl} />
        <link rel="alternate" hrefLang="zh-Hans" href={`${siteUrl}/products/cn`} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
