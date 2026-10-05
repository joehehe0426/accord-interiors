"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, ArrowRight, Drop, ShieldCheck, Leaf, Sparkle, Crown, Swatches, PaintBrushBroad, SquaresFour, ShoppingCart, Plus, Minus, Trash, X } from "@phosphor-icons/react";
import {
  amountForProduct,
  DELIVERY_FEE_HKD,
  FREE_DELIVERY_MIN_HKD,
  stripePriceIdFor,
} from "@/lib/catalogue";
import {
  DEFAULT_REGION,
  formatMoney,
  REGIONS,
  REGION_STORAGE_KEY,
  regionByCountryCode,
  type SiteCurrency,
  type SiteRegion,
} from "@/lib/regions";
import {
  localizeProductCopy,
  PRODUCTS_UI,
  type ProductLocale,
} from "@/lib/products-i18n";

/* ─── Product Catalogue ─── */
type Product = {
  category: "paint" | "tiles" | "services";
  brand: string;
  name: string;
  finish: string;
  size: string;
  /** Fallback display amount; prefer amountForProduct(currency). */
  price: number;
  coverage: string;
  swatch: string;
  accent: string;
  image: string;
  finishImage?: string;
  tag?: string;
  description: string;
  specs: string[];
  icon: "droplet" | "shield" | "leaf" | "sparkle" | "crown" | "swatches" | "paintbrush" | "tiles";
  /** When set, product is only sold in these currencies. */
  currencies?: SiteCurrency[];
};

const LOCAL = "4485" + "6645"; // HK local number (8 digits)

const products: Product[] = [
  {
    category: "paint",
  brand: "Edward Bulmer",
    name: "Natural Paint",
    finish: "Natural pigments · hand-ground",
    size: "2.5L tin",
    price: 1680,
    coverage: "Approx. 11 m² per 2.5L (two coats)",
    swatch: "#7a6a5c",
    accent: "#e8d5a3",
    image: "/images/products/paint-edward-bulmer.jpg",
    tag: "Rare",
    description:
      "The world's most expensive heritage paint, ground from natural pigments and bound with plant-based resins. Zero synthetic chemistry — the colour itself is the luxury. Made in small batches in Herefordshire.",
    specs: ["Plant-based resins", "Hand-ground pigments", "Zero VOCs", "60+ colours"],
    icon: "crown",
  },
  {
    category: "paint",
  brand: "San Marco",
    name: "Stucco Veneziano",
    finish: "Venetian plaster · burnished",
    size: "5L kit",
    price: 2680,
    coverage: "Approx. 8 m² per 5L (two coats)",
    swatch: "#c9b8a4",
    accent: "#a8874a",
    image: "/images/products/paint-san-marco.jpg",
    tag: "Artisan",
    description:
      "The original Venetian plaster, from the family firm that has made it since 1962. Marble dust and slaked lime, trowelled in layers and burnished to a depth no emulsion can imitate. Applied by our own specialists.",
    specs: ["Marble-dust based", "Burnished finish", "Breathable", "Trowel-applied"],
    icon: "swatches",
  },
  {
    category: "paint",
  brand: "Novacolor",
    name: "Plaster Art Mineral",
    finish: "Mineral plaster · metallic depth",
    size: "4L kit",
    price: 2280,
    coverage: "Approx. 6 m² per 4L (two coats)",
    swatch: "#5d6b63",
    accent: "#e8d5a3",
    image: "/images/products/paint-novacolor.jpg",
    tag: "Italian",
    description:
      "Italian mineral plaster with a subtle metallic depth that shifts with the light. The finish of choice for boutique hotels and galleries — specified on our own hospitality projects.",
    specs: ["Mineral-based", "Metallic sheen", "Vapour-permeable", "Hand-applied"],
    icon: "paintbrush",
  },
  {
    category: "paint",
  brand: "Farrow & Ball",
    name: "Estate Emulsion",
    finish: "Flat matt · 100% matt finish",
    size: "2.5L tin",
    price: 680,
    coverage: "Approx. 13 m² per 2.5L (two coats)",
    swatch: "#35465f",
    accent: "#e8d5a3",
    image: "/images/products/paint-farrow-estate.jpg",
    tag: "Heritage",
    description:
      "The definitive English heritage emulsion. Deep, chalky colour depth achieved with high pigment load and minimal binder — the finish that made Farrow & Ball a byword for quiet luxury.",
    specs: ["Water-based", "Low VOC", "Wipeable", "132 colours"],
    icon: "droplet",
  },
  {
    category: "paint",
  brand: "Farrow & Ball",
    name: "Modern Emulsion",
    finish: "Durable matt · scrubbable",
    size: "2.5L tin",
    price: 720,
    coverage: "Approx. 13 m² per 2.5L (two coats)",
    swatch: "#3b4146",
    accent: "#e8d5a3",
    image: "/images/products/paint-farrow-modern.jpg",
    description:
      "The hard-wearing sibling of Estate Emulsion. Advanced resin technology delivers a scrubbable, scuff-resistant finish without surrendering the signature deep matt surface.",
    specs: ["Water-based", "Scrubbable", "Class A wet abrasion", "132 colours"],
    icon: "shield",
  },
  {
    category: "paint",
  brand: "Little Greene",
    name: "Intelligent Matt",
    finish: "Eco matt · durable",
    size: "2.5L tin",
    price: 590,
    coverage: "Approx. 12 m² per 2.5L (two coats)",
    swatch: "#93a199",
    accent: "#e8d5a3",
    image: "/images/products/paint-littlegreene.jpg",
    tag: "Eco",
    description:
      "The best-selling intelligent emulsion from Britain's oldest decorative paint maker. Tougher than ordinary matt yet fully breathable — the professional decorator's default.",
    specs: ["Water-based", "Low VOC", "Breathable", "190 colours"],
    icon: "leaf",
  },
  {
    category: "paint",
  brand: "Benjamin Moore",
    name: "Aura Interior",
    finish: "Matt · Colour Lock technology",
    size: "3.79L tin (US gallon)",
    price: 780,
    coverage: "Approx. 28 m² per 3.79L (two coats)",
    swatch: "#f4f1ec",
    accent: "#a8874a",
    image: "/images/products/paint-benjaminmoore.jpg",
    description:
      "Benjamin Moore's flagship. Colour Lock technology delivers intense, fade-resistant colour in a single coat over most surfaces — the premium of choice in high-end HK renovations.",
    specs: ["Water-based", "Colour Lock", "Self-priming", "3,500+ colours"],
    icon: "sparkle",
  },
  {
    category: "paint",
  brand: "Bauwerk Colour",
    name: "Limewash",
    finish: "True limewash · mineral matt",
    size: "3.5L tin",
    price: 1250,
    coverage: "Approx. 8 m² per 3.5L (two coats)",
    swatch: "#d7cdbe",
    accent: "#e8d5a3",
    image: "/images/products/paint-bauwerk.jpg",
    tag: "Artisan",
    description:
      "Swiss-crafted slaked-lime wash with a soft, velvety, living surface that deepens with age. Each coat is unique — no two walls finish the same. The rarest finish we carry.",
    specs: ["Slaked lime", "Naturally anti-bacterial", "Breathable", "Hand-applied"],
    icon: "droplet",
  },
  {
    category: "paint",
  brand: "Graphenstone",
    name: "Ecosphere Matt",
    finish: "Graphene mineral · ultra low VOC",
    size: "4L tin",
    price: 1380,
    coverage: "Approx. 25 m² per 4L (two coats)",
    swatch: "#e8e4da",
    accent: "#a8874a",
    image: "/images/products/paint-graphenstone.jpg",
    tag: "Green",
    description:
      "Lime-based paint strengthened with graphene. Absorbs CO₂ as it cures, filters airborne pollutants, and carries the world's strictest environmental certifications.",
    specs: ["Carbon-negative", "Graphene-reinforced", "Pollutant-absorbing", "Cradle to Cradle"],
    icon: "leaf",
  },
  {
    category: "tiles",
    brand: "Agata Blue",
    name: "Lappato Bookmatch Slab",
    finish: "Quartzite · lappato (semi-polished)",
    size: "1200 × 2800 mm slab",
    price: 18800,
    coverage: "Bookmatched pair per slab set",
    swatch: "#3a4a63",
    accent: "#e8d5a3",
    image: "/images/products/tile-agata-1.jpg",
    finishImage: "/images/products/tile-agata-2.jpg",
    tag: "Signature",
    description:
      "Bookmatched Agata Blue quartzite slabs with a lappato finish — the depth of polished stone with a softer, more tactile surface. Blue-grey veins mirrored across each pair for a continuous, sculptural statement wall.",
    specs: ["Natural quartzite", "Lappato finish", "Bookmatched", "1200 × 2800 mm"],
    icon: "tiles",
  },
  {
    category: "tiles",
    brand: "Bisazza",
    name: "Gemmy Glass Mosaic",
    finish: "Vitreous glass mosaic · handmade",
    size: "Per sheet (300 × 300 mm)",
    price: 1880,
    coverage: "Approx. 0.09 m² per sheet · 11 sheets per m²",
    swatch: "#4a6d8c",
    accent: "#e8d5a3",
    image: "/images/products/tile-bisazza.jpg",
    finishImage: "/images/products/finish-bisazza.jpg",
    tag: "Iconic",
    description:
      "The world's most celebrated glass mosaic, handmade in Italy since 1959. Vitreous glass tiles with intense depth and colour that no printed porcelain can imitate — the material of feature walls in Hong Kong's finest residences.",
    specs: ["Handmade in Italy", "Vitreous glass", "Marine-grade", "150+ colours"],
    icon: "tiles",
  },
  {
    category: "tiles",
    brand: "Calacatta",
    name: "Marble — Bookmatched Slabs",
    finish: "Natural marble · polished",
    size: "Per slab (approx. 2.7 m²)",
    price: 15800,
    coverage: "Bookmatched pair per slab",
    swatch: "#f0ece4",
    accent: "#a8874a",
    image: "/images/products/tile-calacatta.jpg",
    finishImage: "/images/products/finish-calacatta.jpg",
    tag: "Stone",
    description:
      "True Calacatta marble with the dramatic grey veining that defines the stone's legend. Each slab is bookmatched to a mirror pair and supplied with full fabrication and installation by our own stonemasons.",
    specs: ["Quarried in Carrara", "Bookmatched", "Polished finish", "Fabrication included"],
    icon: "tiles",
  },
  {
    category: "tiles",
    brand: "Marazzi",
    name: "Large-Format Porcelain",
    finish: "Satin · 1200 × 2780 mm",
    size: "Per slab (approx. 3.3 m²)",
    price: 3200,
    coverage: "One slab · approx. 3.3 m²",
    swatch: "#cfc9bd",
    accent: "#e8d5a3",
    image: "/images/products/tile-marazzi.jpg",
    finishImage: "/images/products/finish-marazzi.jpg",
    tag: "Italian",
    description:
      "The flagship large-format porcelain from the Italian factory that defined the category. Full-height slabs with a continuous stone look — the seamless wall and floor treatment specified across our hospitality projects.",
    specs: ["Made in Italy", "Rectified edges", "Full-body porcelain", "Indoor & outdoor"],
    icon: "tiles",
  },
  {
    category: "tiles",
    brand: "Atlas Concorde",
    name: "Smart Architectural Tile",
    finish: "Matt · stone-effect",
    size: "Per box (approx. 1.44 m²)",
    price: 980,
    coverage: "Box covers approx. 1.44 m²",
    swatch: "#b9b4a8",
    accent: "#e8d5a3",
    image: "/images/products/tile-atlas.jpg",
    finishImage: "/images/products/finish-atlas.jpg",
    tag: "Architectural",
    description:
      "Technical porcelain from the Italian brand specified by architects worldwide. Ultra-flat surfaces, controlled shade variation and precise rectification for grout lines down to 1mm.",
    specs: ["Made in Italy", "1mm grout lines", "Slip-resistant R10", "Through-body"],
    icon: "tiles",
  },
  {
    category: "tiles",
    brand: "Porcelanosa",
    name: "Technical Porcelain",
    finish: "Matt · timber-effect",
    size: "Per box (approx. 1.8 m²)",
    price: 720,
    coverage: "Box covers approx. 1.8 m²",
    swatch: "#a89884",
    accent: "#e8d5a3",
    image: "/images/products/tile-porcelanosa.jpg",
    finishImage: "/images/products/finish-porcelanosa.jpg",
    tag: "Spanish",
    description:
      "Timber-effect porcelain from Spain's largest tile manufacturer. The warmth of hardwood with the durability of porcelain — no sanding, no sealing, no warping, ever.",
    specs: ["Made in Spain", "Timber-effect", "Scratch-resistant", "Underfloor heating ready"],
    icon: "tiles",
  },
  {
    category: "tiles",
    brand: "Designer Terrazzo",
    name: "Fior di Terrazzo",
    finish: "Terrazzo · polished",
    size: "Per box (approx. 1.44 m²)",
    price: 1450,
    coverage: "Box covers approx. 1.44 m²",
    swatch: "#d8d2c4",
    accent: "#a8874a",
    image: "/images/products/tile-terrazzo.jpg",
    finishImage: "/images/products/finish-terrazzo.jpg",
    tag: "Designer",
    description:
      "Contemporary terrazzo with Italian marble chips cast into a Portland cement base. Each tile is one of a kind — the pattern can never repeat, which is precisely the point.",
    specs: ["Marble-chip terrazzo", "Hand-cast", "Unique per tile", "Polished finish"],
    icon: "tiles",
  },
  {
    category: "services",
    brand: "Accord Interiors",
    name: "Design Consultation",
    finish: "1:1 design session · remote or in studio",
    size: "Single session",
    price: 500,
    coverage: "Concept direction & material guidance",
    swatch: "#2a2a2a",
    accent: "#e8d5a3",
    image: "/images/about-bg.jpg",
    tag: "USD 500",
    description:
      "One-on-one design consultation — concept direction, material guidance and a clear next-step plan for your renovation or fit-out.",
    specs: ["60–90 minutes", "Mood & material direction", "Written next steps", "HK or remote"],
    icon: "sparkle",
    currencies: ["usd", "hkd"],
  },
  {
    category: "services",
    brand: "Accord Interiors",
    name: "Design Package",
    finish: "Scoped design proposal · full brief",
    size: "Project package",
    price: 700,
    coverage: "Space plan outline & finish recommendations",
    swatch: "#3b4146",
    accent: "#a8874a",
    image: "/images/projects/slide0.jpg",
    tag: "USD 700",
    description:
      "Full design package — space planning outline, finish recommendations and a scoped proposal for your renovation or fit-out.",
    specs: ["Space plan outline", "Finish shortlist", "Scoped proposal", "Project-ready brief"],
    icon: "crown",
    currencies: ["usd", "hkd"],
  },
];

const icons = {
  droplet: Drop,
  shield: ShieldCheck,
  leaf: Leaf,
  sparkle: Sparkle,
  crown: Crown,
  swatches: Swatches,
  paintbrush: PaintBrushBroad,
  tiles: SquaresFour,
};

/* ─── Region (country → currency) ─── */
function useRegion() {
  const [region, setRegionState] = useState<SiteRegion>(DEFAULT_REGION);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(REGION_STORAGE_KEY);
        setRegionState(regionByCountryCode(saved));
      } catch {
        setRegionState(DEFAULT_REGION);
      }
      setLoaded(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function setRegion(next: SiteRegion) {
    setRegionState(next);
    try {
      localStorage.setItem(REGION_STORAGE_KEY, next.countryCode);
    } catch {
      /* ignore */
    }
  }

  return { region, setRegion, loaded };
}

/* ─── Cart ─── */
type CartLine = {
  name: string;
  brand: string;
  size: string;
  price: number;
  qty: number;
  stripePriceId: string;
  currency: SiteCurrency;
};

const CART_KEY = "accord-cart-v3";

function readStoredCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l): l is CartLine =>
        !!l &&
        typeof l === "object" &&
        typeof (l as CartLine).stripePriceId === "string" &&
        (l as CartLine).stripePriceId.startsWith("price_") &&
        typeof (l as CartLine).name === "string" &&
        typeof (l as CartLine).brand === "string" &&
        typeof (l as CartLine).price === "number" &&
        typeof (l as CartLine).qty === "number" &&
        ((l as CartLine).currency === "hkd" || (l as CartLine).currency === "usd"),
    );
  } catch {
    return [];
  }
}

function useCart(currency: SiteCurrency) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Hydrate cart after mount (localStorage)
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setItems(readStoredCart());
      setLoaded(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  // Drop lines that don't match the selected country currency
  useEffect(() => {
    if (!loaded) return;
    setItems((prev) => prev.filter((l) => l.currency === currency));
  }, [currency, loaded]);

  // Persist on change (after initial load)
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, loaded]);

  function add(p: Product, qty = 1) {
    const stripePriceId = stripePriceIdFor(p.brand, p.name, currency);
    const unitPrice = amountForProduct(p.brand, p.name, currency);
    if (!stripePriceId || unitPrice == null) {
      console.error("Missing Stripe price for", p.brand, p.name, currency);
      return;
    }
    setItems((prev) => {
      const found = prev.find((l) => l.stripePriceId === stripePriceId);
      if (found) {
        return prev.map((l) =>
          l.stripePriceId === stripePriceId ? { ...l, qty: l.qty + qty } : l,
        );
      }
      return [
        ...prev,
        {
          name: p.name,
          brand: p.brand,
          size: p.size,
          price: unitPrice,
          qty,
          stripePriceId,
          currency,
        },
      ];
    });
  }

  function setQty(stripePriceId: string, qty: number) {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((l) => l.stripePriceId !== stripePriceId)
        : prev.map((l) => (l.stripePriceId === stripePriceId ? { ...l, qty } : l)),
    );
  }

  function remove(stripePriceId: string) {
    setItems((prev) => prev.filter((l) => l.stripePriceId !== stripePriceId));
  }

  function clear() {
    setItems([]);
  }

  const count = items.reduce((n, l) => n + l.qty, 0);
  const total = items.reduce((n, l) => n + l.price * l.qty, 0);

  return { items, count, total, add, setQty, remove, clear };
}

/* ─── Cart Drawer ─── */
function CartDrawer({
  open,
  onClose,
  items,
  total,
  currency,
  locale,
  setQty,
  remove,
  clear,
}: {
  open: boolean;
  onClose: () => void;
  items: CartLine[];
  total: number;
  currency: SiteCurrency;
  locale: ProductLocale;
  setQty: (stripePriceId: string, qty: number) => void;
  remove: (stripePriceId: string) => void;
  clear: () => void;
}) {
  const ui = PRODUCTS_UI[locale];
  const isHkd = currency === "hkd";
  const delivery =
    isHkd && total > 0 && total < FREE_DELIVERY_MIN_HKD ? DELIVERY_FEE_HKD : 0;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/stripe/checkout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          customerPhone: phone,
          items: items.map((l) => ({
            priceId: l.stripePriceId,
            quantity: l.qty,
          })),
        }),
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error || ui.checkoutStartFail);
      }
      clear();
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : ui.checkoutFail);
      setLoading(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 z-[70] flex h-full w-full max-w-md flex-col bg-surface shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-stone/30 px-6 py-5">
          <div className="flex items-center gap-3">
            <ShoppingCart size={20} className="text-gold-dark" />
            <h2 className="font-serif text-xl text-charcoal">{ui.cart}</h2>
            {items.length > 0 && (
              <span className="rounded-full bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-gold-dark">
                {items.length} {ui.items}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label={ui.closeCart}
            className="rounded-full p-2 text-charcoal/50 transition-colors hover:bg-background hover:text-charcoal"
          >
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="rounded-full bg-gold/10 p-5 text-gold-dark">
              <ShoppingCart size={32} />
            </div>
            <p className="font-serif text-lg text-charcoal">{ui.cartEmpty}</p>
            <button
              onClick={onClose}
              className="mt-2 rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-gold-dark"
            >
              {ui.continueBrowsing}
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-1 flex-col overflow-hidden">
            {/* Items */}
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {items.map((l) => (
                <div
                  key={l.stripePriceId}
                  className="flex items-center gap-4 rounded-2xl border border-stone/30 bg-background p-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-charcoal">
                      {l.brand} {l.name}
                    </p>
                    <p className="mt-0.5 text-xs text-charcoal/45">{l.size}</p>
                    <p className="mt-1 text-sm text-charcoal">
                      {formatMoney(l.price * l.qty, l.currency)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQty(l.stripePriceId, l.qty - 1)}
                      aria-label={`Decrease ${l.name} quantity`}
                      className="rounded-full border border-stone/40 p-1.5 text-charcoal/60 transition-colors hover:border-gold hover:text-gold-dark"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-6 text-center text-sm font-medium text-charcoal">
                      {l.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty(l.stripePriceId, l.qty + 1)}
                      aria-label={`Increase ${l.name} quantity`}
                      className="rounded-full border border-stone/40 p-1.5 text-charcoal/60 transition-colors hover:border-gold hover:text-gold-dark"
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(l.stripePriceId)}
                      aria-label={`Remove ${l.name}`}
                      className="ml-1 rounded-full p-1.5 text-charcoal/40 transition-colors hover:text-red-500"
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                </div>
              ))}

              <div className="rounded-2xl bg-background px-5 py-4">
                <div className="flex items-center justify-between text-sm text-charcoal/60">
                  <span>{ui.subtotal}</span>
                  <span className="font-medium text-charcoal">
                    {formatMoney(total, currency)}
                  </span>
                </div>
                {isHkd ? (
                  <div className="mt-1.5 flex items-center justify-between text-sm text-charcoal/60">
                    <span>{ui.delivery}</span>
                    <span className="font-medium text-charcoal">
                      {delivery === 0 ? ui.free : formatMoney(DELIVERY_FEE_HKD, "hkd")}
                    </span>
                  </div>
                ) : null}
                <div className="mt-3 flex items-center justify-between border-t border-stone/30 pt-3">
                  <span className="text-sm text-charcoal">{ui.total}</span>
                  <span className="text-lg font-medium text-charcoal">
                    {formatMoney(total + delivery, currency)}
                  </span>
                </div>
                {isHkd && total > 0 && total < FREE_DELIVERY_MIN_HKD ? (
                  <p className="mt-2 text-xs text-charcoal/45">
                    {ui.freeDeliveryHint(
                      formatMoney(FREE_DELIVERY_MIN_HKD - total, "hkd"),
                    )}
                  </p>
                ) : null}
              </div>
            </div>

            {/* Checkout */}
            <div className="border-t border-stone/30 px-6 py-5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-medium uppercase tracking-wider text-charcoal/50">{ui.name}</span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={ui.namePlaceholder}
                    className="mt-1.5 w-full rounded-xl border border-stone/50 bg-background px-4 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-gold"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium uppercase tracking-wider text-charcoal/50">{ui.phone}</span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+852 …"
                    className="mt-1.5 w-full rounded-xl border border-stone/50 bg-background px-4 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-gold"
                  />
                </label>
              </div>
              {error ? (
                <p className="mt-3 text-sm text-red-700" role="alert">
                  {error}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={loading}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-charcoal px-8 py-4 text-sm font-medium text-background transition-colors hover:bg-gold-dark disabled:opacity-60"
              >
                {loading ? ui.redirecting : ui.pay}
                {!loading ? <ArrowRight size={16} weight="bold" /> : null}
              </button>
              <p className="mt-3 text-center text-xs text-charcoal/40">
                {isHkd
                  ? ui.payNoteHkd(formatMoney(FREE_DELIVERY_MIN_HKD, "hkd"))
                  : ui.payNoteUsd}
              </p>
            </div>
          </form>
        )}
      </aside>
    </>
  );
}

/* ─── Page ─── */
export function ProductsPage({ locale }: { locale: ProductLocale }) {
  const ui = PRODUCTS_UI[locale];
  const catalog = products.map((p) => localizeProductCopy(p, locale));
  const { region, setRegion } = useRegion();
  const cart = useCart(region.currency);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function countrySelect(value: string) {
    const next = regionByCountryCode(value);
    setRegion(next);
  }

  function regionLabel(code: SiteRegion["countryCode"]) {
    return code === "HK" ? ui.regionHk : ui.regionUs;
  }

  return (
    <main className="min-h-screen bg-background" lang={ui.htmlLang}>
      {/* Nav */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          "bg-background/85 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.04)]"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Accord Interiors" className="h-10 w-auto md:h-12" />
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <label className="flex items-center gap-2 text-sm text-charcoal/70">
              <span className="sr-only">{ui.country}</span>
              <select
                value={region.countryCode}
                onChange={(e) => countrySelect(e.target.value)}
                aria-label={ui.countryAria}
                className="rounded-full border border-stone/50 bg-background px-3 py-1.5 text-sm text-charcoal outline-none transition-colors focus:border-gold"
              >
                {REGIONS.map((r) => (
                  <option key={r.countryCode} value={r.countryCode}>
                    {regionLabel(r.countryCode)} ({r.currencyLabel})
                  </option>
                ))}
              </select>
            </label>
            <div className="flex items-center gap-1 rounded-full border border-stone/40 px-1 py-0.5 text-xs">
              <Link
                href="/products/"
                className={`rounded-full px-2.5 py-1 ${locale === "zh-Hant" ? "bg-charcoal text-background" : "text-charcoal/60"}`}
              >
                {ui.langHant}
              </Link>
              <Link
                href="/products/cn/"
                className={`rounded-full px-2.5 py-1 ${locale === "zh-Hans" ? "bg-charcoal text-background" : "text-charcoal/60"}`}
              >
                {ui.langHans}
              </Link>
            </div>
            <Link href="/#portfolio" className="text-sm text-charcoal/70 transition-colors duration-300 hover:text-charcoal">
              {ui.portfolio}
            </Link>
            <Link href="/#contact" className="text-sm text-charcoal/70 transition-colors duration-300 hover:text-charcoal">
              {ui.contact}
            </Link>
            <a
              href={"tel:+852" + LOCAL}
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/5 px-5 py-2 text-sm font-medium text-gold-dark transition-all duration-300 hover:bg-gold/10 hover:border-gold"
            >
              <Phone size={14} weight="bold" /> +852 {LOCAL.slice(0, 4)} {LOCAL.slice(4)}
            </a>
          </div>
          {/* Mobile hamburger */}
          <button
            className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={ui.menu}
            aria-expanded={mobileOpen}
          >
            <span
              className={`h-[1.5px] w-5 bg-charcoal transition-all duration-300 ${
                mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-5 bg-charcoal transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-5 bg-charcoal transition-all duration-300 ${
                mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
        {/* Mobile menu */}
        {mobileOpen && (
          <div className="absolute inset-x-0 top-0 border-b border-stone/30 bg-background/95 px-6 pb-8 pt-20 backdrop-blur-lg md:hidden">
            <div className="flex flex-col gap-5">
              <label className="flex flex-col gap-1.5 text-sm text-charcoal/70">
                <span className="text-xs uppercase tracking-wider text-charcoal/45">{ui.country}</span>
                <select
                  value={region.countryCode}
                  onChange={(e) => countrySelect(e.target.value)}
                  aria-label={ui.countryAria}
                  className="rounded-xl border border-stone/50 bg-background px-4 py-2.5 text-base text-charcoal outline-none focus:border-gold"
                >
                  {REGIONS.map((r) => (
                    <option key={r.countryCode} value={r.countryCode}>
                      {regionLabel(r.countryCode)} ({r.currencyLabel})
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex gap-2">
                <Link
                  href="/products/"
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-full px-3 py-1 text-sm ${locale === "zh-Hant" ? "bg-charcoal text-background" : "border border-stone/40 text-charcoal/70"}`}
                >
                  {ui.langHant}
                </Link>
                <Link
                  href="/products/cn/"
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-full px-3 py-1 text-sm ${locale === "zh-Hans" ? "bg-charcoal text-background" : "border border-stone/40 text-charcoal/70"}`}
                >
                  {ui.langHans}
                </Link>
              </div>
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="text-lg text-charcoal/70 transition-colors hover:text-charcoal"
              >
                {ui.home}
              </Link>
              <Link
                href="/#portfolio"
                onClick={() => setMobileOpen(false)}
                className="text-lg text-charcoal/70 transition-colors hover:text-charcoal"
              >
                {ui.portfolio}
              </Link>
              <Link
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                className="text-lg text-charcoal/70 transition-colors hover:text-charcoal"
              >
                {ui.contact}
              </Link>
              <a
                href={"tel:+852" + LOCAL}
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-gold/50 bg-gold/5 px-5 py-2.5 text-sm font-medium text-gold-dark transition-all hover:bg-gold/10"
              >
                <Phone size={14} weight="bold" /> +852 {LOCAL.slice(0, 4)} {LOCAL.slice(4)}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-40 pb-16 md:pt-48 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-dark">{ui.heroKicker}</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-charcoal md:text-6xl">
            {ui.heroTitle}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-charcoal/60">
            {ui.heroBody}
          </p>
          <p className="mt-4 text-sm text-charcoal/50">
            {region.currencyLabel} · {regionLabel(region.countryCode)}。
            {region.currency === "usd" ? ui.priceNoteUsd : ui.priceNoteHkd}
          </p>
        </div>
      </section>

      {/* Design packages */}
      <section className="pb-12">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-dark">{ui.servicesKicker}</p>
            <h2 className="mt-2 font-serif text-2xl text-charcoal md:text-3xl">{ui.servicesTitle}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {catalog.filter((p) => p.category === "services").map((p) => {
              const Icon = icons[p.icon];
              const unit = amountForProduct(p.brand, p.name, region.currency) ?? p.price;
              const canBuy = !!stripePriceIdFor(p.brand, p.name, region.currency);
              return (
                <article
                  key={p.name}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-stone/40 bg-surface transition-all duration-500 hover:shadow-[0_20px_60px_-20px_rgba(42,42,42,0.2)]"
                >
                  <div className="relative h-52 overflow-hidden bg-background">
                    <img
                      src={p.image}
                      alt={`${p.brand} ${p.name}`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    <div className="absolute top-5 left-6">
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-white drop-shadow-md">
                        {p.brand}
                      </p>
                      {p.tag && (
                        <span className="mt-2 inline-block rounded-full border border-white/60 bg-black/20 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white backdrop-blur-sm">
                          {p.tag}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="font-serif text-xl text-charcoal md:text-2xl">{p.name}</h2>
                        <p className="mt-1 text-xs uppercase tracking-wider text-charcoal/45">{p.finish}</p>
                      </div>
                      <div className="rounded-full bg-gold/10 p-2.5 text-gold-dark">
                        <Icon size={18} />
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-charcoal/60">{p.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.specs.map((s) => (
                        <span key={s} className="rounded-full border border-stone/50 px-3 py-1 text-[11px] text-charcoal/55">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex items-end justify-between gap-3 border-t border-stone/30 pt-5">
                      <p className="text-xs text-charcoal/45">{p.size} · {p.coverage}</p>
                      <div className="flex items-center gap-3">
                        <p className="text-lg font-medium text-charcoal">
                          {formatMoney(unit, region.currency)}
                        </p>
                        <button
                          onClick={() => canBuy && cart.add(p)}
                          disabled={!canBuy}
                          className="inline-flex items-center gap-1.5 rounded-full bg-charcoal px-4 py-2 text-xs font-medium text-background transition-colors hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label={ui.addAria(p.brand, p.name)}
                        >
                          <Plus size={12} weight="bold" /> {ui.add}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Paints catalogue */}
      <section className="pb-8">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-dark">{ui.paintsKicker}</p>
            <h2 className="mt-2 font-serif text-2xl text-charcoal md:text-3xl">{ui.paintsTitle}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {catalog.filter((p) => p.category === "paint").map((p) => {
              const Icon = icons[p.icon];
              return (
                <article
                  key={p.name}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-stone/40 bg-surface transition-all duration-500 hover:shadow-[0_20px_60px_-20px_rgba(42,42,42,0.2)]"
                >
                  {/* Photo */}
                  <div className="relative h-52 overflow-hidden bg-background">
                    <img
                      src={p.image}
                      alt={`${p.brand} ${p.name} — ${p.finish}`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                    <div className="absolute top-5 left-6">
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-white drop-shadow-md">
                        {p.brand}
                      </p>
                      {p.tag && (
                        <span className="mt-2 inline-block rounded-full border border-white/60 bg-black/20 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white backdrop-blur-sm">
                          {p.tag}
                        </span>
                      )}
                    </div>
                    <p className="absolute bottom-5 left-6 font-mono text-xs tracking-wider text-white/80 drop-shadow-md">
                      {p.swatch}
                    </p>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="font-serif text-xl text-charcoal md:text-2xl">{p.name}</h2>
                        <p className="mt-1 text-xs uppercase tracking-wider text-charcoal/45">{p.finish}</p>
                      </div>
                      <div className="rounded-full bg-gold/10 p-2.5 text-gold-dark">
                        <Icon size={18} />
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-charcoal/60">{p.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.specs.map((s) => (
                        <span key={s} className="rounded-full border border-stone/50 px-3 py-1 text-[11px] text-charcoal/55">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-end justify-between gap-3 border-t border-stone/30 pt-5">
                      <div className="min-w-0">
                        <p className="text-xs text-charcoal/45">{p.size} · {p.coverage}</p>
                        {region.currency !== "hkd" ? (
                          <p className="mt-1 text-[11px] text-charcoal/40">
                            {ui.materialsHkdHint}
                          </p>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-lg font-medium text-charcoal">
                          {formatMoney(p.price, "hkd")}
                        </p>
                        <button
                          onClick={() => cart.add(p)}
                          disabled={region.currency !== "hkd"}
                          className="inline-flex items-center gap-1.5 rounded-full bg-charcoal px-4 py-2 text-xs font-medium text-background transition-colors hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label={ui.addAria(p.brand, p.name)}
                        >
                          <Plus size={14} weight="bold" /> {ui.add}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tiles catalogue */}
      <section className="pt-20 pb-8">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-dark">{ui.tilesKicker}</p>
            <h2 className="mt-2 font-serif text-2xl text-charcoal md:text-3xl">{ui.tilesTitle}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {catalog.filter((p) => p.category === "tiles").map((p) => {
              const Icon = icons[p.icon];
              return (
                <article
                  key={p.name}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-stone/40 bg-surface transition-all duration-500 hover:shadow-[0_20px_60px_-20px_rgba(42,42,42,0.2)]"
                >
                  {/* Photo */}
                  <div className="relative h-52 overflow-hidden bg-background">
                    <img
                      src={p.image}
                      alt={`${p.brand} ${p.name} — ${p.finish}`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 group-hover:opacity-0"
                    />
                    {p.finishImage && (
                      <img
                        src={p.finishImage}
                        alt={`${p.brand} ${p.name} installed — ${p.finish}`}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                    <div className="absolute top-5 left-6">
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-white drop-shadow-md">
                        {p.brand}
                      </p>
                      {p.tag && (
                        <span className="mt-2 inline-block rounded-full border border-white/60 bg-black/20 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white backdrop-blur-sm">
                          {p.tag}
                        </span>
                      )}
                    </div>
                    {p.finishImage && (
                      <span className="absolute top-5 right-5 rounded-full bg-black/30 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white/90 backdrop-blur-sm">
                        In situ
                      </span>
                    )}
                    <p className="absolute bottom-5 left-6 font-mono text-xs tracking-wider text-white/80 drop-shadow-md">
                      {p.swatch}
                    </p>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="font-serif text-xl text-charcoal md:text-2xl">{p.name}</h2>
                        <p className="mt-1 text-xs uppercase tracking-wider text-charcoal/45">{p.finish}</p>
                      </div>
                      <div className="rounded-full bg-gold/10 p-2.5 text-gold-dark">
                        <Icon size={18} />
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-charcoal/60">{p.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.specs.map((s) => (
                        <span key={s} className="rounded-full border border-stone/50 px-3 py-1 text-[11px] text-charcoal/55">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-end justify-between gap-3 border-t border-stone/30 pt-5">
                      <div className="min-w-0">
                        <p className="text-xs text-charcoal/45">{p.size} · {p.coverage}</p>
                        {region.currency !== "hkd" ? (
                          <p className="mt-1 text-[11px] text-charcoal/40">
                            {ui.materialsHkdHint}
                          </p>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-lg font-medium text-charcoal">
                          {formatMoney(p.price, "hkd")}
                        </p>
                        <button
                          onClick={() => cart.add(p)}
                          disabled={region.currency !== "hkd"}
                          className="inline-flex items-center gap-1.5 rounded-full bg-charcoal px-4 py-2 text-xs font-medium text-background transition-colors hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label={ui.addAria(p.brand, p.name)}
                        >
                          <Plus size={14} weight="bold" /> {ui.add}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trade note */}
      <section className="py-16">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="rounded-3xl bg-charcoal px-8 py-10 text-background md:px-14 md:py-14">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-light">{ui.tradeKicker}</p>
                <p className="mt-3 font-serif text-xl leading-snug">
                  {ui.tradeBody}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-light">{ui.applicationKicker}</p>
                <p className="mt-3 text-sm leading-relaxed text-background/70">
                  {ui.applicationBody}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-light">{ui.deliveryKicker}</p>
                <p className="mt-3 text-sm leading-relaxed text-background/70">
                  {ui.deliveryBody}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating cart button */}
      <button
        onClick={() => setCartOpen(true)}
        aria-label={ui.openCart(cart.count)}
        className="fixed bottom-6 right-6 z-[55] flex h-14 w-14 items-center justify-center rounded-full bg-charcoal text-background shadow-[0_12px_40px_-8px_rgba(42,42,42,0.5)] transition-all duration-300 hover:bg-gold-dark hover:scale-105"
      >
        <ShoppingCart size={22} weight="bold" />
        {cart.count > 0 && (
          <span className="absolute -top-1 -right-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-gold px-1.5 text-xs font-bold text-charcoal">
            {cart.count}
          </span>
        )}
      </button>

      {/* Cart drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart.items}
        total={cart.total}
        currency={region.currency}
        locale={locale}
        setQty={cart.setQty}
        remove={cart.remove}
        clear={cart.clear}
      />

      {/* Footer */}
      <footer className="border-t border-stone/30 py-8">
        <p className="text-center text-xs text-charcoal/30">
          © {new Date().getFullYear()} Accord Interiors Company. {ui.rights}
        </p>
        <p className="mt-1 text-center text-xs text-charcoal/30">商業登記號碼 25453531</p>
        <p className="mt-2 text-center text-xs text-charcoal/40">
          <Link href="/terms" className="hover:text-gold-dark">{ui.terms}</Link>
          {" · "}
          <Link href="/privacy" className="hover:text-gold-dark">{ui.privacy}</Link>
        </p>
      </footer>
    </main>
  );
}
