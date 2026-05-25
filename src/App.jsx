import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const FACEBOOK_URL =
  "https://www.facebook.com/marketplace/profile/61585466383362/";
const TEXT_URL = "sms:+12146359551";

const HOME_BACKGROUND = "#000000";
const DETAIL_BACKGROUND =
  "radial-gradient(circle at -10% -8%, rgba(37,99,235,0.32), transparent 22%), #000000";

const coachSohoGallery = Array.from(
  { length: 9 },
  (_, index) => `/products/coach-soho-maple-brown-${index + 1}.jpeg`
);

const radarEvBlackPPGallery = Array.from(
  { length: 13 },
  (_, index) => `/products/radar-ev/radar-ev-black-pp-${index + 1}.JPG`
);

const radarEvGreenBlueGallery = Array.from(
  { length: 13 },
  (_, index) => `/products/radar-ev/radar-ev-green-blue-cf${index + 1}.JPG`
);

const radarEvPurpleGallery = Array.from(
  { length: 11 },
  (_, index) => `/products/radar-ev/radar-ev-purple${index + 1}.JPG`
);

const radarEvGallery = [
  ...radarEvBlackPPGallery,
  ...radarEvGreenBlueGallery,
  ...radarEvPurpleGallery,
];

const products = [
  {
    id: "romeo",
    brand: "Oakley",
    category: "Sunglasses",
    title: "Oakley X-Metal Romeo",
    shortTitle: "Romeo",
    price: 100,
    previewImage: "/products/romeo-preview-1.jpeg",
    previewFit: "cover",
    description:
      "Romeo inspired sunglasses with a bold X-Metal vintage sport look. Multiple lens colorways available.",
    variants: [
      { color: "Black Frame / Yellow Red Fire Lens", status: "Available" },
      { color: "Black Frame / Pink Mirror Lens", status: "Available" },
      { color: "Black Frame / Deep Blue Purple Lens", status: "Available" },
      { color: "Silver Frame / Smoke Gray Lens", status: "Available" },
      { color: "Silver Frame / Pink Purple Mirror Lens", status: "Available" },
      { color: "Silver Frame / Black Smoke Lens", status: "Available" },
      { color: "Black Frame / Gold Red Fire Lens", status: "Available" },
      { color: "Silver Frame / Blue Purple Mirror Lens", status: "Available" },
    ],
  },
  {
    id: "juliet",
    brand: "Oakley",
    category: "Sunglasses",
    title: "Oakley X-Metal Juliet",
    shortTitle: "Juliet",
    price: 100,
    previewImage: "/products/juliet-preview-1.jpeg",
    previewFit: "cover",
    description:
      "Juliet inspired sunglasses with a clean vintage sport-luxury look. Multiple lens colorways available.",
    variants: [
      { color: "Black Frame / Red Fire Lens", status: "Available" },
      { color: "Black Frame / Smoke Black Lens", status: "Available" },
      { color: "Gunmetal Frame / Purple Gold Mirror Lens", status: "Available" },
      { color: "Gunmetal Frame / Hot Pink Mirror Lens", status: "Available" },
      { color: "Silver Frame / Black Lens", status: "Available" },
      { color: "Gunmetal Frame / Royal Blue Mirror Lens", status: "Available" },
      { color: "Gunmetal Frame / Ice Blue Mirror Lens", status: "Available" },
      { color: "Black Frame / Orange Red Mirror Lens", status: "Available" },
      { color: "Silver Frame / Smoke Gray Lens", status: "Available" },
      { color: "Black Frame / Yellow Orange Mirror Lens", status: "Available" },
      { color: "Black Frame / Purple Aqua Mirror Lens", status: "Available" },
      { color: "Black Frame / Triple Black Smoke Lens", status: "Available" },
    ],
  },
  {
    id: "splice",
    brand: "Oakley",
    category: "Sunglasses",
    title: "Oakley Splice",
    shortTitle: "Splice",
    price: 90,
    previewImage: "/products/splice-preview-1.jpeg",
    previewFit: "cover",
    description:
      "Splice inspired wraparound sunglasses with bold early-2000s styling. Multiple lens colorways available.",
    variants: [
      {
        color: "Gunmetal Black Frame / Black Lens — Triple Black",
        status: "Available",
      },
      { color: "Clear Silver Frame / Pink Purple Mirror Lens", status: "Available" },
      { color: "Black Frame / Smoke Black Lens", status: "Available" },
      { color: "Black Frame / Blue Purple Mirror Lens", status: "Available" },
      { color: "Silver Frame / Yellow Red Fire Lens", status: "Available" },
      { color: "Black Frame / Black Lens — Front View", status: "Available" },
      { color: "Black Frame / Ice Blue Mirror Lens", status: "Available" },
      { color: "Black Frame / Bronze Amber Lens", status: "Available" },
      { color: "Silver Frame / Light Blue Ice Lens", status: "Available" },
      { color: "Gunmetal Frame / Yellow Red Mirror Lens", status: "Available" },
      { color: "Black Frame / Yellow Lens — Front View", status: "Available" },
      { color: "Clear Frame / Silver Ice Lens", status: "Available" },
      { color: "Gunmetal Frame / Clear Light Gray Lens", status: "Available" },
      { color: "Silver Frame / Smoke Gray Lens", status: "Available" },
      { color: "Black Frame / Pink Blue Iridescent Lens", status: "Available" },
      { color: "Black Frame / Aqua Green Mirror Lens", status: "Available" },
    ],
  },
  {
    id: "radar-ev",
    brand: "Oakley",
    category: "Sunglasses",
    title: "Oakley Radar EV",
    shortTitle: "Radar EV",
    price: 60,
    previewImage: "/products/radar-ev/radar-ev-black-pp-1.JPG",
    previewFit: "cover",
    description:
      "Sporty shield-lens style with multiple colorways and the best entry price in the catalog.",
    variants: [
      { color: "White Frame / Purple Orange Fire Lens", status: "Available" },
      { color: "Pink Frame / Red and Orange Lens", status: "Available" },
      { color: "Clear Smoke Frame / Purple Orange Fire Lens", status: "Available" },
      { color: "White Frame / Royal Blue Lens", status: "Available" },
      { color: "Black Clear Frame / Silver Mirror Lens", status: "Available" },
      { color: "Purple Frame / Purple Lens", status: "Sold Out" },
      { color: "Black Frame / 24k Gold Lens", status: "Available" },
      { color: "Black Frame / Royal Blue Lens", status: "Available" },
      { color: "Black Clear Frame / Blue Green Mirror Lens", status: "Available" },
      { color: "Light Blue Frame / Blue Lens", status: "Available" },
      { color: "Black Frame / Matte Black Lens", status: "Available" },
      { color: "Gunmetal Black Frame / Smoke Gray Lens", status: "Available" },
    ],
    gallery: radarEvGallery,
    waitlistColor: "Purple Frame / Purple Lens",
  },
  {
    id: "coach-soho",
    brand: "Coach",
    category: "Bags",
    title: "Coach Soho Bag",
    shortTitle: "Soho Bag",
    price: 120,
    previewImage: "/products/coach-soho-maple-brown-1.jpeg",
    previewFit: "contain",
    description:
      "Soho style shoulder bag inspired by the original Coach design.",
    variants: [{ color: "Maple Brown Signature Jacquard", status: "Available" }],
    gallery: coachSohoGallery,
  },
  {
    id: "coach-ashton",
    brand: "Coach",
    category: "Bags",
    title: "Coach Ashton Bag",
    shortTitle: "Ashton Bag",
    price: 140,
    previewImage: "",
    previewFit: "contain",
    description: "Classic signature style shoulder bag with a clean everyday look.",
    variants: [{ color: "Classic Signature Style", status: "Coming Soon" }],
  },
];

const bundleDeals = [
  "Buy 2 Radar EV pairs for $100 total",
  "Buy 2 sunglasses and save on the total bundle",
  "Mix pairs and message me for the best bundle price",
  "Best deals usually happen when you grab 2 or more items",
];

const howToOrderSteps = [
  "Pick the design and color.",
  "Message me on Facebook or text me.",
  "I’ll confirm availability.",
  "Meet for pickup or arrange delivery.",
];

function CornerGlow() {
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -260,
          left: -250,
          width: 560,
          height: 560,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.68) 0%, rgba(37,99,235,0.34) 28%, rgba(37,99,235,0.12) 48%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 360,
          height: 360,
          background:
            "radial-gradient(circle at 0% 0%, rgba(59,130,246,0.16), transparent 62%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </>
  );
}

function getColorChips(colorName = "") {
  const name = colorName.toLowerCase();
  const chips = [];

  if (name.includes("black")) chips.push("#111827");
  if (
    name.includes("gunmetal") ||
    name.includes("smoke") ||
    name.includes("gray") ||
    name.includes("silver")
  ) {
    chips.push("#a1a1aa");
  }
  if (name.includes("white") || name.includes("clear")) chips.push("#f4f4f5");
  if (name.includes("blue") || name.includes("aqua") || name.includes("ice"))
    chips.push("#2563eb");
  if (name.includes("green")) chips.push("#22c55e");
  if (name.includes("purple")) chips.push("#9333ea");
  if (name.includes("pink")) chips.push("#ec4899");
  if (name.includes("red")) chips.push("#ef4444");
  if (name.includes("orange") || name.includes("fire")) chips.push("#f97316");
  if (name.includes("yellow") || name.includes("gold") || name.includes("24k"))
    chips.push("#facc15");
  if (name.includes("bronze") || name.includes("brown") || name.includes("maple"))
    chips.push("#92400e");

  return [...new Set(chips)].slice(0, 3);
}

function slugify(value) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

function statusStyle(status) {
  switch (status) {
    case "Available":
      return {
        background: "rgba(16,185,129,0.18)",
        color: "#6ee7b7",
        border: "1px solid rgba(16,185,129,0.22)",
      };
    case "Low Stock":
      return {
        background: "rgba(250,204,21,0.14)",
        color: "#fde047",
        border: "1px solid rgba(250,204,21,0.22)",
      };
    case "Sold Out":
      return {
        background: "rgba(239,68,68,0.14)",
        color: "#fca5a5",
        border: "1px solid rgba(239,68,68,0.22)",
      };
    case "Coming Soon":
    default:
      return {
        background: "rgba(96,165,250,0.14)",
        color: "#93c5fd",
        border: "1px solid rgba(96,165,250,0.22)",
      };
  }
}

function OakleyMiniLogo() {
  return (
    <img
      src="/brand/oakley-logo.png"
      alt="Oakley"
      style={{
        width: 18,
        height: 18,
        objectFit: "contain",
        display: "block",
        filter: "brightness(0) invert(1)",
      }}
    />
  );
}

function CoachMiniLogo() {
  return (
    <img
      src="/brand/coach-logo.png"
      alt="Coach"
      style={{
        width: 18,
        height: 18,
        objectFit: "contain",
        display: "block",
        borderRadius: 3,
        background: "#fff",
        padding: 1,
      }}
    />
  );
}

function BundleMiniIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3L21 12L12 21L3 12L12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PickupMiniIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 3V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 16V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3 12H8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 12H21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 18L9 12L15 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 20L17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function HeroTag({ icon, label }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "14px 24px",
        borderRadius: 999,
        border: "1px solid rgba(59,130,246,0.36)",
        background: "rgba(2,6,23,0.78)",
        color: "#f3f4f6",
        fontWeight: 700,
        fontSize: 17,
        lineHeight: 1,
        boxShadow: "0 0 0 1px rgba(37,99,235,0.04) inset",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
        }}
      >
        {icon}
      </span>
      <span>{label}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      style={{
        ...statusStyle(status),
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
        padding: "8px 14px",
        fontSize: 13,
        fontWeight: 800,
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}

function ProductCard({ product, onOpen }) {
  const chips = [...new Set(product.variants.flatMap((v) => getColorChips(v.color)))].slice(
    0,
    8
  );

  return (
    <div
      style={{
        background: "rgba(3,7,18,0.94)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: 28,
        overflow: "hidden",
        boxShadow: "0 24px 60px rgba(0,0,0,0.32)",
      }}
    >
      <div
        style={{
          height: 300,
          background:
            product.previewImage && product.previewImage.trim() !== ""
              ? "#0b1120"
              : "radial-gradient(circle at 30% 20%, rgba(148,66,32,0.9), rgba(12,18,44,0.95) 70%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 18,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {product.previewImage ? (
          <img
            src={product.previewImage}
            alt={product.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: product.previewFit || "cover",
              borderRadius: 20,
              display: "block",
              background: product.previewFit === "contain" ? "#ffffff" : "#0b1120",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              textAlign: "center",
              padding: 24,
            }}
          >
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#c4d4ff",
                marginBottom: 12,
              }}
            >
              Placeholder Preview
            </div>
            <div style={{ fontSize: 42, fontWeight: 900, lineHeight: 1.05 }}>
              {product.shortTitle}
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: 26 }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 14,
            marginBottom: 16,
          }}
        >
          <div>
            <div
              style={{
                color: "#93c5fd",
                fontSize: 15,
                marginBottom: 8,
              }}
            >
              {product.brand}-Inspired {product.category}
            </div>
            <h3
              style={{
                margin: 0,
                color: "#ffffff",
                fontSize: 26,
                lineHeight: 1.15,
              }}
            >
              {product.title}
            </h3>
          </div>

          <div
            style={{
              flexShrink: 0,
              borderRadius: 999,
              background: "rgba(37,99,235,0.22)",
              color: "#bfdbfe",
              padding: "10px 16px",
              fontSize: 15,
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            Varies by color
          </div>
        </div>

        <p
          style={{
            color: "rgba(255,255,255,0.70)",
            fontSize: 16,
            lineHeight: 1.8,
            margin: "0 0 18px 0",
          }}
        >
          {product.description}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 24,
          }}
        >
          {chips.map((chip, index) => (
            <span
              key={`${product.id}-${chip}-${index}`}
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: chip,
                border: "1px solid rgba(255,255,255,0.22)",
                display: "inline-block",
              }}
            />
          ))}
          {product.variants.length > 8 ? (
            <span style={{ color: "rgba(255,255,255,0.58)", fontSize: 14 }}>
              +{product.variants.length - 8} more
            </span>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontSize: 30,
              fontWeight: 900,
              color: "#ffffff",
            }}
          >
            ${product.price}
          </div>

          <button
            onClick={() => onOpen(product.id)}
            style={{
              border: 0,
              cursor: "pointer",
              borderRadius: 18,
              padding: "16px 24px",
              background: "#ffffff",
              color: "#111827",
              fontSize: 16,
              fontWeight: 800,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            View Colors
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductDetailPage({ product, onBack }) {
  const gallery =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : product.previewImage
      ? [product.previewImage]
      : [];

  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
  }, [product.id]);

  const waitlistMessage = encodeURIComponent(
    `Hi! I want the ${product.title}${
      product.waitlistColor ? ` in ${product.waitlistColor}` : ""
    }. Please let me know when it’s back in stock.`
  );

  return (
    <main
      style={{
        minHeight: "100vh",
        background: DETAIL_BACKGROUND,
        color: "#ffffff",
        padding: "28px 20px 80px",
      }}
    >
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <button
          onClick={onBack}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "transparent",
            color: "#cbd5e1",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 999,
            padding: "12px 18px",
            cursor: "pointer",
            marginBottom: 26,
            fontWeight: 700,
          }}
        >
          <BackIcon />
          Back to catalog
        </button>

        <div
          style={{
            display: "grid",
            gap: 28,
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            alignItems: "start",
          }}
        >
          <div
            style={{
              background: "rgba(3,7,18,0.96)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 30,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background: "#0b1120",
                minHeight: 420,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
              }}
            >
              {gallery.length > 0 ? (
                <img
                  src={gallery[activeImage]}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: 500,
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    minHeight: 420,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 18,
                  }}
                >
                  Image coming soon
                </div>
              )}
            </div>

            {gallery.length > 1 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(72px, 1fr))",
                  gap: 12,
                  padding: 18,
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                {gallery.map((image, index) => (
                  <button
                    key={image}
                    onClick={() => setActiveImage(index)}
                    style={{
                      border:
                        activeImage === index
                          ? "2px solid #3b82f6"
                          : "1px solid rgba(255,255,255,0.10)",
                      borderRadius: 16,
                      padding: 0,
                      cursor: "pointer",
                      overflow: "hidden",
                      background: "#0b1120",
                    }}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      style={{
                        width: "100%",
                        aspectRatio: "1 / 1",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div
            style={{
              background: "rgba(3,7,18,0.96)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 30,
              padding: 28,
            }}
          >
            <div
              style={{
                color: "#93c5fd",
                fontSize: 16,
                marginBottom: 10,
              }}
            >
              {product.brand}-Inspired {product.category}
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: 46,
                lineHeight: 1.05,
                marginBottom: 14,
              }}
            >
              {product.title}
            </h1>

            <p
              style={{
                color: "rgba(255,255,255,0.72)",
                fontSize: 18,
                lineHeight: 1.75,
                margin: "0 0 22px 0",
              }}
            >
              {product.description}
            </p>

            <div
              style={{
                fontSize: 36,
                fontWeight: 900,
                marginBottom: 24,
              }}
            >
              ${product.price}
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                marginBottom: 22,
              }}
            >
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  borderRadius: 18,
                  padding: "16px 22px",
                  background: "#4f7ee8",
                  color: "#ffffff",
                  fontWeight: 800,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Message on Facebook
              </a>

              <a
                href={TEXT_URL}
                style={{
                  textDecoration: "none",
                  borderRadius: 18,
                  padding: "16px 22px",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.16)",
                  color: "#ffffff",
                  fontWeight: 800,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Text Me
              </a>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 22,
                padding: 20,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "#c4d4ff",
                  marginBottom: 14,
                }}
              >
                Colorways
              </div>

              <div style={{ display: "grid", gap: 14 }}>
                {product.variants.map((variant) => {
                  const waitlistHref = `${TEXT_URL}?&body=${waitlistMessage}`;

                  return (
                    <div
                      key={`${product.id}-${variant.color}`}
                      style={{
                        padding: 16,
                        borderRadius: 18,
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(2,6,23,0.72)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          gap: 12,
                          flexWrap: "wrap",
                          marginBottom: 10,
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: 18,
                              fontWeight: 800,
                              marginBottom: 8,
                            }}
                          >
                            {variant.color}
                          </div>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              flexWrap: "wrap",
                            }}
                          >
                            {getColorChips(variant.color).map((chip, index) => (
                              <span
                                key={`${variant.color}-${chip}-${index}`}
                                style={{
                                  width: 14,
                                  height: 14,
                                  borderRadius: "50%",
                                  background: chip,
                                  border: "1px solid rgba(255,255,255,0.22)",
                                  display: "inline-block",
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        <StatusBadge status={variant.status} />
                      </div>

                      {variant.status === "Sold Out" ? (
                        <a
                          href={waitlistHref}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textDecoration: "none",
                            marginTop: 10,
                            borderRadius: 14,
                            padding: "12px 16px",
                            background: "rgba(59,130,246,0.16)",
                            color: "#bfdbfe",
                            fontWeight: 800,
                          }}
                        >
                          Join Restock Waitlist
                        </a>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            {product.category === "Sunglasses" ? (
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 22,
                  padding: 20,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: "#c4d4ff",
                    marginBottom: 14,
                  }}
                >
                  Bundle Deals
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  {bundleDeals.map((deal) => (
                    <div
                      key={deal}
                      style={{
                        color: "rgba(255,255,255,0.76)",
                        lineHeight: 1.6,
                      }}
                    >
                      • {deal}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 22,
                padding: 20,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "#c4d4ff",
                  marginBottom: 14,
                }}
              >
                How to Order
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                {howToOrderSteps.map((step, index) => (
                  <div
                    key={step}
                    style={{
                      color: "rgba(255,255,255,0.76)",
                      lineHeight: 1.7,
                    }}
                  >
                    {index + 1}. {step}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                fontSize: 14,
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.56)",
              }}
            >
              Items are inspired-style pieces and are not original retail Oakley
              or Coach products. Message before purchase for full details.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function App() {
  const catalogRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("All");
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const found = products.find((product) => slugify(product.id) === hash);
      if (found) {
        setSelectedProductId(found.id);
      }
    }

    const handlePopState = () => {
      const currentHash = window.location.hash.replace("#", "");
      if (!currentHash) {
        setSelectedProductId(null);
        return;
      }

      const found = products.find((product) => slugify(product.id) === currentHash);
      setSelectedProductId(found ? found.id : null);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const openProduct = (productId) => {
    setSelectedProductId(productId);
    const nextHash = `#${slugify(productId)}`;
    window.history.pushState({ productId }, "", nextHash);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeProduct = () => {
    if (window.location.hash) {
      window.history.pushState({}, "", window.location.pathname);
    }
    setSelectedProductId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectedProduct = products.find((product) => product.id === selectedProductId);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        filterValue === "All" || product.category === filterValue;

      const haystack = [
        product.title,
        product.brand,
        product.category,
        product.description,
        ...product.variants.map((variant) => variant.color),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = haystack.includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [filterValue, searchTerm]);

  const sunglasses = filteredProducts.filter(
    (product) => product.category === "Sunglasses"
  );
  const bags = filteredProducts.filter((product) => product.category === "Bags");

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (selectedProduct) {
    return <ProductDetailPage product={selectedProduct} onBack={closeProduct} />;
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: HOME_BACKGROUND,
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <CornerGlow />

      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <section
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "34px 20px 52px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <img
              src="/ivn-vault-logo.png"
              alt="IVN Vault"
              style={{
                width: "min(100%, 620px)",
                display: "block",
                margin: "0 auto 18px",
              }}
            />

            <h1
              style={{
                fontSize: "clamp(52px, 9vw, 120px)",
                lineHeight: 1.02,
                margin: "0 0 22px 0",
                fontWeight: 900,
                letterSpacing: "-0.04em",
              }}
            >
              Your private catalog
              <br />
              for the latest drops.
            </h1>

            <p
              style={{
                margin: "0 auto 38px",
                maxWidth: 980,
                fontSize: "clamp(22px, 2.2vw, 34px)",
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.72)",
              }}
            >
              Browse sunglasses, bags, available colorways, and bundle deals —
              all in one clean local catalog.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                justifyContent: "center",
                marginBottom: 40,
              }}
            >
              <HeroTag icon={<OakleyMiniLogo />} label="Sunglasses" />
              <HeroTag icon={<CoachMiniLogo />} label="Bags" />
              <HeroTag icon={<BundleMiniIcon />} label="Bundle Deals" />
              <HeroTag icon={<PickupMiniIcon />} label="Local Pickup" />
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                justifyContent: "center",
              }}
            >
              <button
                onClick={scrollToCatalog}
                style={{
                  cursor: "pointer",
                  border: 0,
                  borderRadius: 999,
                  padding: "20px 36px",
                  minWidth: 220,
                  background: "#5b86ea",
                  color: "#ffffff",
                  fontSize: 18,
                  fontWeight: 900,
                  boxShadow: "0 20px 40px rgba(37,99,235,0.28)",
                }}
              >
                View Catalog
              </button>

              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  borderRadius: 999,
                  padding: "20px 36px",
                  minWidth: 220,
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.14)",
                  color: "#ffffff",
                  fontSize: 18,
                  fontWeight: 900,
                  boxShadow: "0 20px 40px rgba(2,6,23,0.28)",
                }}
              >
                Contact Me
              </a>
            </div>
          </div>
        </section>

        <section
          ref={catalogRef}
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 20px 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
              marginBottom: 26,
            }}
          >
            <div>
              <div
                style={{
                  color: "#93c5fd",
                  fontSize: 15,
                  fontWeight: 700,
                  marginBottom: 10,
                }}
              >
                ⌁ Current Inventory
              </div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "clamp(44px, 7vw, 80px)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                }}
              >
                Catalog
              </h2>
            </div>

            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                width: "min(100%, 540px)",
              }}
            >
              <div
                style={{
                  flex: 1,
                  minWidth: 240,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(3,7,18,0.86)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 22,
                  padding: "0 16px",
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.48)" }}>
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search products or colors..."
                  style={{
                    width: "100%",
                    border: 0,
                    outline: "none",
                    background: "transparent",
                    color: "#ffffff",
                    height: 60,
                    fontSize: 16,
                  }}
                />
              </div>

              <select
                value={filterValue}
                onChange={(event) => setFilterValue(event.target.value)}
                style={{
                  minWidth: 180,
                  background: "rgba(3,7,18,0.86)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 22,
                  color: "#ffffff",
                  height: 60,
                  fontSize: 16,
                  padding: "0 18px",
                  outline: "none",
                }}
              >
                <option value="All">All</option>
                <option value="Sunglasses">Sunglasses</option>
                <option value="Bags">Bags</option>
              </select>
            </div>
          </div>

          <CategorySection
            title="Sunglasses"
            subtitle="Oakley-inspired frames and colorways"
            count={`${
              products.filter((item) => item.category === "Sunglasses").length
            } styles`}
            items={sunglasses}
            onOpen={openProduct}
          />

          <CategorySection
            title="Bags"
            subtitle="Coach-inspired bag styles"
            count={`${
              products.filter((item) => item.category === "Bags").length
            } styles`}
            items={bags}
            onOpen={openProduct}
          />
        </section>
      </div>
    </main>
  );
}

function CategorySection({ title, subtitle, count, items, onOpen }) {
  if (!items.length) return null;

  return (
    <section style={{ marginTop: 46 }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 20,
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "clamp(28px, 5vw, 54px)",
              lineHeight: 1,
            }}
          >
            {title}
          </h3>
          <p
            style={{
              margin: "10px 0 0 0",
              color: "rgba(255,255,255,0.58)",
              fontSize: 18,
            }}
          >
            {subtitle}
          </p>
        </div>

        <div
          style={{
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "12px 18px",
            color: "rgba(255,255,255,0.72)",
            fontSize: 15,
          }}
        >
          {count}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gap: 26,
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {items.map((item) => (
          <ProductCard key={item.id} product={item} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}