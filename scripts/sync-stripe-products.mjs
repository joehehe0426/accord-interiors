import { readFileSync, writeFileSync } from "fs";
import Stripe from "stripe";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i), l.slice(i + 1)];
    }),
);

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-08-26.dahlia",
});

const catalogue = [
  {
    category: "paint",
    brand: "Edward Bulmer",
    name: "Natural Paint",
    finish: "Natural pigments · hand-ground",
    size: "2.5L tin",
    price: 1680,
    description:
      "The world's most expensive heritage paint, ground from natural pigments and bound with plant-based resins. Zero synthetic chemistry — the colour itself is the luxury. Made in small batches in Herefordshire.",
    image:
      "https://accordinterior.autragroupltd.com/images/products/paint-edward-bulmer.jpg",
    slug: "edward-bulmer-natural-paint",
  },
  {
    category: "paint",
    brand: "San Marco",
    name: "Stucco Veneziano",
    finish: "Venetian plaster · burnished",
    size: "5L kit",
    price: 2680,
    description:
      "The original Venetian plaster, from the family firm that has made it since 1962. Marble dust and slaked lime, trowelled in layers and burnished to a depth no emulsion can imitate. Applied by our own specialists.",
    image:
      "https://accordinterior.autragroupltd.com/images/products/paint-san-marco.jpg",
    slug: "san-marco-stucco-veneziano",
  },
  {
    category: "paint",
    brand: "Novacolor",
    name: "Plaster Art Mineral",
    finish: "Mineral plaster · metallic depth",
    size: "4L kit",
    price: 2280,
    description:
      "Italian mineral plaster with a subtle metallic depth that shifts with the light. The finish of choice for boutique hotels and galleries — specified on our own hospitality projects.",
    image:
      "https://accordinterior.autragroupltd.com/images/products/paint-novacolor.jpg",
    slug: "novacolor-plaster-art-mineral",
  },
  {
    category: "paint",
    brand: "Farrow & Ball",
    name: "Estate Emulsion",
    finish: "Flat matt · 100% matt finish",
    size: "2.5L tin",
    price: 680,
    description:
      "The definitive English heritage emulsion. Deep, chalky colour depth achieved with high pigment load and minimal binder — the finish that made Farrow & Ball a byword for quiet luxury.",
    image:
      "https://accordinterior.autragroupltd.com/images/products/paint-farrow-estate.jpg",
    slug: "farrow-ball-estate-emulsion",
  },
  {
    category: "paint",
    brand: "Farrow & Ball",
    name: "Modern Emulsion",
    finish: "Durable matt · scrubbable",
    size: "2.5L tin",
    price: 720,
    description:
      "The hard-wearing sibling of Estate Emulsion. Advanced resin technology delivers a scrubbable, scuff-resistant finish without surrendering the signature deep matt surface.",
    image:
      "https://accordinterior.autragroupltd.com/images/products/paint-farrow-modern.jpg",
    slug: "farrow-ball-modern-emulsion",
  },
  {
    category: "paint",
    brand: "Little Greene",
    name: "Intelligent Matt",
    finish: "Eco matt · durable",
    size: "2.5L tin",
    price: 590,
    description:
      "The best-selling intelligent emulsion from Britain's oldest decorative paint maker. Tougher than ordinary matt yet fully breathable — the professional decorator's default.",
    image:
      "https://accordinterior.autragroupltd.com/images/products/paint-littlegreene.jpg",
    slug: "little-greene-intelligent-matt",
  },
  {
    category: "paint",
    brand: "Benjamin Moore",
    name: "Aura Interior",
    finish: "Matt · Colour Lock technology",
    size: "3.79L tin (US gallon)",
    price: 780,
    description:
      "Benjamin Moore's flagship. Colour Lock technology delivers intense, fade-resistant colour in a single coat over most surfaces — the premium of choice in high-end HK renovations.",
    image:
      "https://accordinterior.autragroupltd.com/images/products/paint-benjaminmoore.jpg",
    slug: "benjamin-moore-aura-interior",
  },
  {
    category: "paint",
    brand: "Bauwerk Colour",
    name: "Limewash",
    finish: "True limewash · mineral matt",
    size: "3.5L tin",
    price: 1250,
    description:
      "Swiss-crafted slaked-lime wash with a soft, velvety, living surface that deepens with age. Each coat is unique — no two walls finish the same. The rarest finish we carry.",
    image:
      "https://accordinterior.autragroupltd.com/images/products/paint-bauwerk.jpg",
    slug: "bauwerk-colour-limewash",
  },
  {
    category: "paint",
    brand: "Graphenstone",
    name: "Ecosphere Matt",
    finish: "Graphene mineral · ultra low VOC",
    size: "4L tin",
    price: 1380,
    description:
      "Lime-based paint strengthened with graphene. Absorbs CO₂ as it cures, filters airborne pollutants, and carries the world's strictest environmental certifications.",
    image:
      "https://accordinterior.autragroupltd.com/images/products/paint-graphenstone.jpg",
    slug: "graphenstone-ecosphere-matt",
  },
  {
    category: "tiles",
    brand: "Agata Blue",
    name: "Lappato Bookmatch Slab",
    finish: "Quartzite · lappato (semi-polished)",
    size: "1200 × 2800 mm slab",
    price: 18800,
    description:
      "Bookmatched Agata Blue quartzite slabs with a lappato finish — the depth of polished stone with a softer, more tactile surface. Blue-grey veins mirrored across each pair for a continuous, sculptural statement wall.",
    image:
      "https://accordinterior.autragroupltd.com/images/products/tile-agata-1.jpg",
    slug: "agata-blue-lappato-bookmatch-slab",
  },
  {
    category: "tiles",
    brand: "Bisazza",
    name: "Gemmy Glass Mosaic",
    finish: "Vitreous glass mosaic · handmade",
    size: "Per sheet (300 × 300 mm)",
    price: 1880,
    description:
      "The world's most celebrated glass mosaic, handmade in Italy since 1959. Vitreous glass tiles with intense depth and colour that no printed porcelain can imitate — the material of feature walls in Hong Kong's finest residences.",
    image:
      "https://accordinterior.autragroupltd.com/images/products/tile-bisazza.jpg",
    slug: "bisazza-gemmy-glass-mosaic",
  },
  {
    category: "tiles",
    brand: "Calacatta",
    name: "Marble — Bookmatched Slabs",
    finish: "Natural marble · polished",
    size: "Per slab (approx. 2.7 m²)",
    price: 15800,
    description:
      "True Calacatta marble with the dramatic grey veining that defines the stone's legend. Each slab is bookmatched to a mirror pair and supplied with full fabrication and installation by our own stonemasons.",
    image:
      "https://accordinterior.autragroupltd.com/images/products/tile-calacatta.jpg",
    slug: "calacatta-marble-bookmatched-slabs",
  },
  {
    category: "tiles",
    brand: "Marazzi",
    name: "Large-Format Porcelain",
    finish: "Satin · 1200 × 2780 mm",
    size: "Per slab (approx. 3.3 m²)",
    price: 3200,
    description:
      "The flagship large-format porcelain from the Italian factory that defined the category. Full-height slabs with a continuous stone look — the seamless wall and floor treatment specified across our hospitality projects.",
    image:
      "https://accordinterior.autragroupltd.com/images/products/tile-marazzi.jpg",
    slug: "marazzi-large-format-porcelain",
  },
  {
    category: "tiles",
    brand: "Atlas Concorde",
    name: "Smart Architectural Tile",
    finish: "Matt · stone-effect",
    size: "Per box (approx. 1.44 m²)",
    price: 980,
    description:
      "Technical porcelain from the Italian brand specified by architects worldwide. Ultra-flat surfaces, controlled shade variation and precise rectification for grout lines down to 1mm.",
    image:
      "https://accordinterior.autragroupltd.com/images/products/tile-atlas.jpg",
    slug: "atlas-concorde-smart-architectural-tile",
  },
  {
    category: "tiles",
    brand: "Porcelanosa",
    name: "Technical Porcelain",
    finish: "Matt · timber-effect",
    size: "Per box (approx. 1.8 m²)",
    price: 720,
    description:
      "Timber-effect porcelain from Spain's largest tile manufacturer. The warmth of hardwood with the durability of porcelain — no sanding, no sealing, no warping, ever.",
    image:
      "https://accordinterior.autragroupltd.com/images/products/tile-porcelanosa.jpg",
    slug: "porcelanosa-technical-porcelain",
  },
  {
    category: "tiles",
    brand: "Designer Terrazzo",
    name: "Fior di Terrazzo",
    finish: "Terrazzo · polished",
    size: "Per box (approx. 1.44 m²)",
    price: 1450,
    description:
      "Contemporary terrazzo with Italian marble chips cast into a Portland cement base. Each tile is one of a kind — the pattern can never repeat, which is precisely the point.",
    image:
      "https://accordinterior.autragroupltd.com/images/products/tile-terrazzo.jpg",
    slug: "designer-terrazzo-fior-di-terrazzo",
  },
];

const results = [];

for (const item of catalogue) {
  const product = await stripe.products.create({
    name: `${item.brand} ${item.name}`,
    description: item.description.slice(0, 800),
    images: [item.image],
    metadata: {
      slug: item.slug,
      brand: item.brand,
      category: item.category,
      finish: item.finish.slice(0, 500),
      size: item.size,
      source: "accord_interiors_products_page",
    },
  });

  const price = await stripe.prices.create({
    product: product.id,
    currency: "hkd",
    unit_amount: Math.round(item.price * 100),
    nickname: `${item.slug}-hkd`,
    metadata: {
      slug: item.slug,
      size: item.size,
    },
  });

  await stripe.products.update(product.id, { default_price: price.id });

  results.push({
    slug: item.slug,
    name: product.name,
    productId: product.id,
    priceId: price.id,
    amountHkd: item.price,
    category: item.category,
  });

  console.log(
    `OK ${item.slug} → ${product.id} / ${price.id} (HK$${item.price})`,
  );
}

writeFileSync("stripe-products.json", JSON.stringify(results, null, 2));
console.log(`\nCreated ${results.length} products → stripe-products.json`);
