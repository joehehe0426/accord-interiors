# Stripe Integration TODO

Single source of truth for remaining Checkout setup after applying Checkout Studio parameters.

**Scenario:** A — existing `checkout.sessions.create` found and updated.

**SDK:** `stripe@22.6.2` → `ui_mode: "hosted_page"` (required for SDK ≥ 21.0.0).

---

## Values to Replace

No placeholder `sample_only` values remain in the Checkout Session call. Existing real values were preserved:

**Files:**
- [src/app/api/stripe/checkout/route.ts](src/app/api/stripe/checkout/route.ts)

| Field | Current Value | Notes |
|-------|---------------|-------|
| mode | `payment` | Correct for one-time project deposits / material payments. Change only if you sell subscriptions. |
| success_url | `${NEXT_PUBLIC_SITE_URL}/pay/success?session_id={CHECKOUT_SESSION_ID}` | Real app route. Keep `{CHECKOUT_SESSION_ID}`. |
| cancel_url | `${NEXT_PUBLIC_SITE_URL}/pay/cancel` | Real app route. |
| line_items | Dynamic `price_data` (HKD amount from request) | Not Dashboard Price IDs. To charge catalogue products instead, replace with `{ price: "price_…", quantity }` from [stripe-products.json](stripe-products.json) / [Dashboard Prices](https://dashboard.stripe.com/acct_1UJpGGFSjPwiBOJo/test/prices). |

Optional later improvement (not required for Studio config):

| Field | Suggestion |
|-------|------------|
| line_items[].price | Use synced Price IDs (e.g. `price_1UJpm1FSjPwiBOJo6HcIX8XK`) when wiring `/products` cart to Checkout. |

---

## Configured Parameters

These were set from Checkout Studio (`fixed_by_ui`) and should not be changed unless you reconfigure Studio.

**Files:**
- [src/app/api/stripe/checkout/route.ts](src/app/api/stripe/checkout/route.ts)

| Parameter | Value |
|-----------|-------|
| ui_mode | `hosted_page` |
| billing_address_collection | `auto` |
| phone_number_collection | `{ enabled: false }` |
| automatic_tax | `{ enabled: false }` |
| allow_promotion_codes | `false` |
| submit_type | `auto` |
| integration_identifier | `hosted_web_0003` |
| origin_context | `web` |

**Not included (by Studio rule):** `payment_method_collection` — only valid when `mode` is `subscription`; current mode is `payment`.

---

## Setup and next steps

### Environment variables

Ensure `.env.local` (see [.env.example](.env.example)) has:

| Variable | Purpose |
|----------|---------|
| `STRIPE_SECRET_KEY` | Server-only secret (`sk_test_…` / restricted `rk_…`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Publishable key if needed client-side |
| `STRIPE_WEBHOOK_SECRET` | From `stripe listen` or Dashboard webhooks |
| `NEXT_PUBLIC_SITE_URL` | e.g. `http://localhost:3000` for local success/cancel URLs |

Names must match the code (`STRIPE_SECRET_KEY`, not `VITE_…` — this is Next.js, not Vite).

### Project structure (already present)

```
src/lib/stripe.ts
src/app/api/stripe/checkout/route.ts   ← Checkout Session (updated)
src/app/api/stripe/webhook/route.ts
src/app/api/stripe/invoices/route.ts
src/app/pay/page.tsx
src/app/pay/success/page.tsx
src/app/pay/cancel/page.tsx
```

### How it works

1. Client `POST /api/stripe/checkout` with amount / description.
2. Server creates a **hosted** Checkout Session with Studio parameters.
3. Client redirects to `session.url` (Stripe-hosted page).
4. After pay → `/pay/success`; cancel → `/pay/cancel`.
5. Fulfillment must use webhooks (`checkout.session.completed` / `async_payment_succeeded`), not the success page alone.

### Testing

1. `stripe listen --forward-to http://localhost:3000/api/stripe/webhook/ --events "checkout.session.completed,checkout.session.async_payment_succeeded,checkout.session.async_payment_failed,invoice.paid,invoice.payment_failed,invoice.finalized"`  
   (Include the trailing `/` — this app sets `trailingSlash: true`; without it Stripe CLI gets HTTP 308 and webhooks fail.)
2. Put `whsec_…` in `STRIPE_WEBHOOK_SECRET`, restart `npm run dev`.
3. Open `/pay`, pay with test card `4242 4242 4242 4242`.
4. Confirm events in the listen terminal and Dashboard (sandbox **acct_1UJpGGFSjPwiBOJo**, Test mode).

### Next steps

- [x] Remove `output: "export"` so `/api/stripe/*` works on a Node host (Vercel / `next start`)
- [ ] Wire `/products` cart to Checkout using Price IDs in `stripe-products.json`
- [ ] Complete Stripe account verification (`charges_enabled`) before live mode
- [ ] Rotate any secret keys that were shared outside a vault
- [ ] Add Dashboard webhook endpoint for production: `https://YOUR_DOMAIN/api/stripe/webhook/`
- [ ] On production host, set env vars from [.env.example](.env.example) (Live keys when going live)
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://accordinterior.autragroupltd.com` in production
- [ ] Implement real fulfillment in the webhook handlers (email / order status)

### Where to get API keys

| Key | Test | Live |
|-----|------|------|
| Publishable + Secret | [Test API keys](https://dashboard.stripe.com/acct_1UJpGGFSjPwiBOJo/test/apikeys) | [Live API keys](https://dashboard.stripe.com/acct_1UJpGGFSjPwiBOJo/apikeys) |
| Webhook `whsec_` | `stripe listen` output | Dashboard → Developers → Webhooks |

Put them in `.env.local` (local) or your host’s environment variables (production). Never commit secrets.

### Resources

- https://support.stripe.com
- https://docs.stripe.com/mcp
- https://docs.stripe.com/payments/checkout
- https://dashboard.stripe.com/acct_1UJpGGFSjPwiBOJo/test/products
