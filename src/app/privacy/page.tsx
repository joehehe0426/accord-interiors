import type { Metadata } from "next";
import Link from "next/link";

const LOCAL = "4485" + "6645"; // HK local number (8 digits)
const siteUrl = "https://accordinterior.autragroupltd.com";

export const metadata: Metadata = {
  title: "Privacy Policy | Accord Interiors Company",
  description:
    "How Accord Interiors Company collects, uses and protects your personal data, in compliance with the Hong Kong Personal Data (Privacy) Ordinance (Cap. 486).",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/privacy",
    languages: { "en-HK": "/privacy", "x-default": "/privacy" },
  },
  robots: { index: true, follow: true },
};

const sections = [
  {
    h: "1. Who we are",
    body: [
      "Accord Interiors Company (BR No. 25453531) is a Hong Kong-based interior design and build studio, registered at Flat 1413, 14/F, Sheung Lai House, Sheung Tak Est, TKO, Hong Kong (\"we\", \"us\", \"our\").",
      "This policy explains what personal data we collect, why we collect it, and how we handle it in accordance with the Hong Kong Personal Data (Privacy) Ordinance (Cap. 486) (the \"Ordinance\").",
    ],
  },
  {
    h: "2. Data we collect",
    body: [
      "We may collect the following categories of personal data:",
      "• Contact details — name, phone number, email address and correspondence address.",
      "• Project information — property address, design preferences, budget range and project briefs you share with us.",
      "• Order information — paint and material orders, quantities, delivery address and payment details you provide when ordering.",
      "• Technical data — device and browsing information collected via cookies when you visit our website (see Section 6).",
      "We collect data directly from you, from your enquiries, orders, site visits, and from our correspondence with you.",
    ],
  },
  {
    h: "3. How we use your data",
    body: [
      "We use personal data for the following purposes:",
      "• To respond to enquiries and provide quotations for design and build services.",
      "• To process and deliver product orders, including paint and finishing materials.",
      "• To manage projects, contracts and ongoing client relationships.",
      "• To send updates and follow-ups related to an enquiry, order or project.",
      "• To comply with legal and regulatory obligations, including anti-money-laundering requirements of payment partners.",
      "We do not sell personal data, and we do not use it for marketing unless you have given separate consent.",
    ],
  },
  {
    h: "4. Sharing and disclosure",
    body: [
      "We share personal data only where necessary to provide our services:",
      "• Payment and financial service providers (including our payment partners) to process transactions.",
      "• Suppliers and delivery partners to fulfil product orders.",
      "• Professional advisers and authorities, where required by law.",
      "All third parties are required to handle your data in accordance with the Ordinance and for limited, defined purposes only.",
    ],
  },
  {
    h: "5. Data retention",
    body: [
      "We retain personal data only as long as necessary for the purposes described in this policy, or as required by law (including record-keeping obligations for financial transactions). Records relating to completed projects and orders are retained for a reasonable period after completion, then securely deleted or anonymised.",
    ],
  },
  {
    h: "6. Cookies",
    body: [
      "Our website uses minimal, functional cookies to operate correctly and to understand basic visitor traffic. We do not use advertising cookies. You may disable cookies in your browser settings, though some site features may then behave differently.",
    ],
  },
  {
    h: "7. Your rights",
    body: [
      "Under the Ordinance you have the right to:",
      "• Access a copy of the personal data we hold about you.",
      "• Request correction of inaccurate personal data.",
      "• Withdraw consent to marketing communications at any time.",
      "To exercise any of these rights, contact us using the details in Section 8. We may ask for proof of identity before processing a request, and will respond within the timeframes required by the Ordinance.",
    ],
  },
  {
    h: "8. Contact",
    body: [
      "For any questions about this policy or your personal data, contact us:",
      "• Phone: +852 4485 6645",
      "• Email: accordinteriorscompanys@gmail.com",
      "• Address: Flat 1413, 14/F, Sheung Lai House, Sheung Tak Est, TKO, Hong Kong",
      "We may update this policy from time to time; the current version will always be published on this page.",
    ],
  },
];

export default function PrivacyPage() {
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
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-dark">Legal · 私隱政策</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-charcoal md:text-5xl">Privacy Policy</h1>
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
