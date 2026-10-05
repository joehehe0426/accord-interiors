import Link from "next/link";

export default function PaySuccessPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <p className="mb-3 text-xs tracking-[0.25em] text-gold-dark uppercase">
        Accord Interiors
      </p>
      <h1 className="mb-4 font-serif text-4xl text-charcoal">Thank you</h1>
      <p className="mb-10 max-w-md text-charcoal/70">
        Your payment was submitted. Confirmation is finalized by Stripe
        webhooks — you will receive a receipt by email when available.
      </p>
      <Link
        href="/"
        className="bg-charcoal px-8 py-3 text-sm tracking-[0.15em] text-background uppercase hover:bg-gold-dark"
      >
        Back to home
      </Link>
    </main>
  );
}
