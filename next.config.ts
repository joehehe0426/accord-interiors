import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Do not use `output: "export"` — Stripe Checkout/webhooks need server API routes.
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
