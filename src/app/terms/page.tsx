import type { Metadata } from "next";
import Link from "next/link";

const LOCAL = "4485" + "6645"; // HK local number (8 digits)
const siteUrl = "https://accordinterior.autragroupltd.com";

export const metadata: Metadata = {
  title: "Terms & Conditions | Accord Interiors Company",
  description:
    "Terms and conditions for Accord Interiors Company services and product orders, including shipping, refunds and governing law (Hong Kong).",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/terms",
    languages: { "en-HK": "/terms", "x-default": "/terms" },
  },
  robots: { index: true, follow: true },
};

const sections = [
  {
    h: "1. About these terms",
    body: [
      "These Terms & Conditions (\"Terms\") govern: (a) the provision of interior design, contracting and project management services by Accord Interiors Company (BR No. 25453531) (\"we\", \"us\", \"our\"); and (b) the sale of paint, finishing materials and related products through our website at accordinterior.autragroupltd.com (the \"Site\").",
      "By engaging our services or placing an order through the Site, you agree to be bound by these Terms. If you do not agree, please do not use our services or the Site.",
    ],
  },
  {
    h: "2. Services",
    body: [
      "Our design and build services are provided on the basis of a written quotation or contract agreed with you before work commences. Quotations are valid for 30 days unless stated otherwise.",
      "Scope of work, timeline, payment schedule and variations are defined in the project contract. Any change to the scope of work requested after commencement will be quoted separately and confirmed in writing before execution.",
      "Project timelines are estimates based on information available at quotation. Delays caused by factors outside our reasonable control (including site conditions, third-party suppliers, or client decisions) may extend the timeline without liability.",
    ],
  },
  {
    h: "3. Products and pricing",
    body: [
      "Product prices displayed on the Site are in Hong Kong Dollars (HKD), inclusive of applicable taxes unless stated otherwise.",
      "Prices are subject to change without notice. The price applicable to your order is the price displayed at the time the order is confirmed.",
      "Colour reproduction on screen is indicative only. Paint colours vary by batch, substrate and application; we recommend ordering a sample or consulting our team before committing to full quantities.",
      "Product availability is subject to supplier stock. Where a product becomes unavailable after ordering, we will contact you to offer an alternative or a full refund.",
    ],
  },
  {
    h: "4. Orders and payment",
    body: [
      "Orders may be placed through the Site's order form, by phone, or by email. An order is confirmed when we accept it and (where applicable) payment is authorised.",
      "Payment for products is processed through our payment partners. By providing payment details you authorise the transaction. We do not store card details on our systems.",
      "Trade pricing for architects and designers is available on request and subject to a separate agreement.",
    ],
  },
  {
    h: "5. Shipping and delivery",
    body: [
      "We deliver across Hong Kong. Standard delivery is 2–3 working days from order confirmation; specialist items (limewash, plasters, large quantities) may take longer and will be confirmed at order.",
      "Delivery is free for orders over HK$2,000. Otherwise a delivery charge applies as quoted at checkout.",
      "Risk in the products passes to you on delivery. Please inspect goods on receipt and notify us of any damage within 48 hours so we can arrange replacement.",
    ],
  },
  {
    h: "6. Refunds and returns",
    body: [
      "Unopened products in original condition may be returned within 7 days of delivery for a refund, subject to a handling fee. Please contact us before returning any goods.",
      "Custom-mixed, tinted, or opened products cannot be returned for hygiene and quality reasons, except where the product is faulty or not as described.",
      "Faulty or damaged products will be replaced or refunded in full, including delivery costs, after we verify the issue.",
      "Refunds are processed to the original payment method within 14 days of approval.",
    ],
  },
  {
    h: "7. Specialist finishes",
    body: [
      "Venetian plaster, limewash and other specialist finishes are materials supplied as kits and, where requested, applied by our own decorators. Application is quoted separately based on site survey.",
      "Because these finishes are hand-applied and naturally variable, minor variations in tone and texture between coats and batches are inherent characteristics of the material and do not constitute defects.",
    ],
  },
  {
    h: "8. Liability",
    body: [
      "Nothing in these Terms limits liability that cannot be limited by law. To the maximum extent permitted by law, our total liability arising from or in connection with any order or service, whether in contract, tort (including negligence) or otherwise, is limited to the amount paid by you for that order or service.",
      "We are not liable for indirect or consequential loss, loss of profits, or loss of data arising from our services or products.",
    ],
  },
  {
    h: "9. Intellectual property",
    body: [
      "All content on the Site, including design concepts, drawings, plans and imagery, is our property or that of our licensors. Design concepts and drawings provided during a project remain our intellectual property until full payment is received, after which the rights transfer to you for use in relation to the project.",
    ],
  },
  {
    h: "10. Governing law and jurisdiction",
    body: [
      "These Terms, and any contract between you and us, are governed by the laws of the Hong Kong Special Administrative Region.",
      "Any dispute arising out of or in connection with these Terms or our services and products shall be subject to the exclusive jurisdiction of the courts of Hong Kong.",
    ],
  },
  {
    h: "11. Contact",
    body: [
      "Questions about these Terms: +852 4485 6645 · accordinteriorscompanys@gmail.com · Flat 1413, 14/F, Sheung Lai House, Sheung Tak Est, TKO, Hong Kong.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <nav className="fixed top-0 inset-x-0 z-50 bg-background/85 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Accord Interiors" className="h-10 w-auto md:h-12" />
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="/products" className="text-sm text-charcoal/70 transition-colors duration-300 hover:text-charcoal">
              Shop
            </Link>
            <Link href="/#contact" className="text-sm text-charcoal/70 transition-colors duration-300 hover:text-charcoal">
              Contact
            </Link>
            <Link
              href="/products"
              className="rounded-full border border-gold/50 bg-gold/5 px-5 py-2 text-sm font-medium text-gold-dark transition-all duration-300 hover:bg-gold/10 hover:border-gold"
            >
              Order Paints
            </Link>
          </div>
          {/* Mobile links — always visible, compact */}
          <div className="flex items-center gap-4 md:hidden">
            <Link href="/products" className="rounded-full border border-gold/50 bg-gold/5 px-4 py-1.5 text-xs font-medium text-gold-dark transition-colors hover:bg-gold/10">
              Shop
            </Link>
            <a
              href={"tel:+852" + LOCAL}
              className="rounded-full border border-gold/50 bg-gold/5 px-4 py-1.5 text-xs font-medium text-gold-dark transition-colors hover:bg-gold/10"
            >
              Call
            </a>
          </div>
        </div>
      </nav>

      <article className="mx-auto max-w-3xl px-6 pt-36 pb-24">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-dark">Legal · 條款及細則</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-charcoal md:text-5xl">Terms &amp; Conditions</h1>
        <p className="mt-3 text-sm text-charcoal/50">Accord Interiors Company · Last updated 12 August 2026</p>

        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-serif text-xl text-charcoal">{s.h}</h2>
              <div className="mt-3 space-y-3">
                {s.body.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-charcoal/65">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>

      <footer className="border-t border-stone/30 py-8">
        <div className="mx-auto max-w-[1400px] px-6">
          <p className="text-center text-xs text-charcoal/30">
            © {new Date().getFullYear()} Accord Interiors Company. All rights reserved.
          </p>
          <p className="mt-1 text-center text-xs text-charcoal/30">BR No. 25453531</p>
          <p className="mt-2 text-center text-xs text-charcoal/40">
            <Link href="/terms" className="hover:text-gold-dark">Terms &amp; Conditions</Link>
            {" · "}
            <Link href="/privacy" className="hover:text-gold-dark">Privacy Policy</Link>
          </p>
        </div>
      </footer>
    </main>
  );
}
