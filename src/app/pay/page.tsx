"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function PayPage() {
  const [amountHkd, setAmountHkd] = useState("10000");
  const [description, setDescription] = useState(
    "Project deposit — Accord Interiors",
  );
  const [customerEmail, setCustomerEmail] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/stripe/checkout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountHkd: Number(amountHkd),
          description,
          customerEmail: customerEmail || undefined,
          projectCode: projectCode || undefined,
        }),
      });

      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Unable to start checkout");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at top, #e8d5a355 0%, transparent 55%), linear-gradient(180deg, #f8f6f1 0%, #ebe6dc 100%)",
        }}
      />

      <header className="mx-auto flex max-w-lg items-center justify-between px-6 py-8">
        <Link href="/" className="text-sm tracking-[0.2em] text-charcoal uppercase">
          Accord Interiors
        </Link>
        <Link href="/#contact" className="text-sm text-gold-dark hover:underline">
          Contact
        </Link>
      </header>

      <section className="mx-auto max-w-lg px-6 pb-20">
        <p className="mb-3 text-xs tracking-[0.25em] text-gold-dark uppercase">
          Secure payment
        </p>
        <h1 className="mb-3 font-serif text-4xl leading-tight text-charcoal">
          Project payment
        </h1>
        <p className="mb-10 text-base leading-relaxed text-charcoal/70">
          Pay a deposit or progress installment via Stripe Checkout. Formal
          invoices are emailed separately with a hosted payment page.
        </p>

        <form onSubmit={onSubmit} className="space-y-5">
          <label className="block">
            <span className="mb-1.5 block text-xs tracking-wide text-charcoal/60 uppercase">
              Amount (HKD)
            </span>
            <input
              required
              type="number"
              min={1}
              step="0.01"
              value={amountHkd}
              onChange={(e) => setAmountHkd(e.target.value)}
              className="w-full border border-stone bg-surface px-4 py-3 text-charcoal outline-none focus:border-gold"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs tracking-wide text-charcoal/60 uppercase">
              Description
            </span>
            <input
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-stone bg-surface px-4 py-3 text-charcoal outline-none focus:border-gold"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs tracking-wide text-charcoal/60 uppercase">
              Email (optional)
            </span>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full border border-stone bg-surface px-4 py-3 text-charcoal outline-none focus:border-gold"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs tracking-wide text-charcoal/60 uppercase">
              Project code (optional)
            </span>
            <input
              value={projectCode}
              onChange={(e) => setProjectCode(e.target.value)}
              placeholder="e.g. AI-2026-041"
              className="w-full border border-stone bg-surface px-4 py-3 text-charcoal outline-none focus:border-gold"
            />
          </label>

          {error ? (
            <p className="text-sm text-red-700" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-charcoal px-6 py-3.5 text-sm tracking-[0.15em] text-background uppercase transition hover:bg-gold-dark disabled:opacity-60"
          >
            {loading ? "Redirecting…" : "Pay with Stripe"}
          </button>
        </form>

        <p className="mt-8 text-xs leading-relaxed text-charcoal/50">
          Test mode keys only. Card payments redirect to Stripe-hosted Checkout.
          Do not fulfill orders from this page — webhooks confirm payment.
        </p>
      </section>
    </main>
  );
}
