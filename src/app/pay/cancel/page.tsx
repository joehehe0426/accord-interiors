import Link from "next/link";

export default function PayCancelPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <p className="mb-3 text-xs tracking-[0.25em] text-gold-dark uppercase">
        Accord Interiors
      </p>
      <h1 className="mb-4 font-serif text-4xl text-charcoal">Payment cancelled</h1>
      <p className="mb-10 max-w-md text-charcoal/70">
        No charge was made. You can return to the payment page whenever you are
        ready.
      </p>
      <div className="flex gap-4">
        <Link
          href="/pay"
          className="bg-charcoal px-8 py-3 text-sm tracking-[0.15em] text-background uppercase hover:bg-gold-dark"
        >
          Try again
        </Link>
        <Link
          href="/"
          className="border border-charcoal px-8 py-3 text-sm tracking-[0.15em] text-charcoal uppercase hover:border-gold-dark"
        >
          Home
        </Link>
      </div>
    </main>
  );
}
