import { useEffect, useMemo, useState } from "react";
import "./App.css";

const FACEBOOK_URL = "https://www.facebook.com/marketplace/profile/61585466383362/";
const TEXT_URL = "sms:+12146359551";

function getWaitlistTextUrl(productName, colorName) {
  const message = `Hey, I want to join the restock waitlist for ${productName} — ${colorName}.`;
  return `sms:+12146359551?&body=${encodeURIComponent(message)}`;
}

const products = [
  {
    id: "romeo",
    name: "Oakley X-Metal Romeo",
    category: "Oakley-Inspired Sunglasses",
    price: "$100",
    status: "Available",
    description:
      "Romeo inspired sunglasses with a bold X-Metal vintage sport look. Multiple lens colorways available.",
    variants: [
      {
        color: "Black Frame / Yellow Red Fire Lens",
        status: "Available",
        images: ["/products/romeo-preview-1.jpeg"],
      },
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
    name: "Oakley X-Metal Juliet",
    category: "Oakley-Inspired Sunglasses",
    price: "$100",
    status: "Available",
    description:
      "Juliet inspired sunglasses with a clean vintage sport-luxury look. Multiple lens colorways available.",
    variants: [
      {
        color: "Black Frame / Red Fire Lens",
        status: "Available",
        images: ["/products/juliet-preview-1.jpeg"],
      },
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
    name: "Oakley Splice",
    category: "Oakley-Inspired Sunglasses",
    price: "$90",
    status: "Available",
    description:
      "Splice inspired wraparound sunglasses with bold early-2000s styling. Multiple lens colorways available.",
    variants: [
      {
        color: "Gunmetal Black Frame / Black Lens — Triple Black",
        status: "Available",
        images: ["/products/splice-preview-1.jpeg"],
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
    name: "Oakley Radar EV",
    category: "Oakley-Inspired Sunglasses",
    price: "$60",
    status: "Available",
    description:
      "Radar EV inspired performance sunglasses with a sporty shield-lens look. Multiple frame and lens colorways available.",
    variants: [
      {
        color: "White Frame / Purple Orange Fire Lens",
        status: "Available",
        images: ["/products/radar-preview-1.jpeg"],
      },
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
  },
  {
    id: "soho",
    name: "Coach Soho Bag",
    category: "Coach-Inspired Bags",
    price: "$120",
    status: "Available",
    description: "Soho style shoulder bag inspired by the original Coach design.",
    variants: [
      {
        color: "Maple Brown Signature Jacquard",
        status: "Available",
        images: [
          "/products/coach-soho-maple-brown-1.jpeg",
          "/products/coach-soho-maple-brown-2.jpeg",
          "/products/coach-soho-maple-brown-3.jpeg",
          "/products/coach-soho-maple-brown-4.jpeg",
          "/products/coach-soho-maple-brown-5.jpeg",
          "/products/coach-soho-maple-brown-6.jpeg",
          "/products/coach-soho-maple-brown-7.jpeg",
          "/products/coach-soho-maple-brown-8.jpeg",
          "/products/coach-soho-maple-brown-9.jpeg",
        ],
      },
    ],
  },
  {
    id: "ashton",
    name: "Coach Ashton Bag",
    category: "Coach-Inspired Bags",
    price: "$140",
    status: "Available",
    description: "Ashton style bag with a clean luxury everyday look.",
    variants: [{ color: "Classic Signature Style", status: "Available" }],
  },
];

function getCategories(productList) {
  return ["All", ...new Set(productList.map((item) => item.category))];
}

function filterProducts(productList, searchText, selectedCategory) {
  return productList.filter((item) => {
    const searchableText = `${item.name} ${item.description} ${item.variants
      .map((variant) => variant.color)
      .join(" ")}`;

    const matchesSearch = searchableText.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
}

function getProductById(productList, productId) {
  return productList.find((item) => item.id === productId);
}

function getProductIdFromHash() {
  return window.location.hash.replace("#", "");
}

function getColorChips(colorName) {
  const name = colorName.toLowerCase();
  const chips = [];

  if (name.includes("black")) chips.push("#020617");

  if (
    name.includes("gunmetal") ||
    name.includes("smoke") ||
    name.includes("gray") ||
    name.includes("silver") ||
    name.includes("mirror")
  ) {
    chips.push("#a1a1aa");
  }

  if (name.includes("white") || name.includes("clear")) chips.push("#ffffff");
  if (name.includes("blue") || name.includes("aqua") || name.includes("ice")) chips.push("#3b82f6");
  if (name.includes("purple")) chips.push("#a855f7");
  if (name.includes("pink")) chips.push("#ec4899");
  if (name.includes("red") || name.includes("fire")) chips.push("#ef4444");

  if (name.includes("orange") || name.includes("gold") || name.includes("yellow") || name.includes("24k")) {
    chips.push("#facc15");
  }

  if (name.includes("green")) chips.push("#34d399");
  if (name.includes("bronze") || name.includes("brown") || name.includes("amber")) chips.push("#92400e");

  return chips.length ? chips.slice(0, 5) : ["#3b82f6", "#a1a1aa"];
}

function getGradient(colorName) {
  const name = colorName.toLowerCase();

  if (name.includes("fire") || name.includes("red") || name.includes("orange")) {
    return "linear-gradient(135deg, rgba(239,68,68,.38), rgba(249,115,22,.24), #020617)";
  }

  if (name.includes("pink")) {
    return "linear-gradient(135deg, rgba(236,72,153,.35), rgba(168,85,247,.25), #020617)";
  }

  if (name.includes("purple") || name.includes("iridescent")) {
    return "linear-gradient(135deg, rgba(168,85,247,.35), rgba(59,130,246,.25), #020617)";
  }

  if (name.includes("blue") || name.includes("ice") || name.includes("aqua")) {
    return "linear-gradient(135deg, rgba(59,130,246,.35), rgba(34,211,238,.2), #020617)";
  }

  if (name.includes("yellow") || name.includes("gold") || name.includes("24k")) {
    return "linear-gradient(135deg, rgba(250,204,21,.3), rgba(249,115,22,.2), #020617)";
  }

  if (name.includes("bronze") || name.includes("brown") || name.includes("amber")) {
    return "linear-gradient(135deg, rgba(146,64,14,.36), rgba(202,138,4,.16), #020617)";
  }

  if (
    name.includes("white") ||
    name.includes("silver") ||
    name.includes("clear") ||
    name.includes("mirror")
  ) {
    return "linear-gradient(135deg, rgba(244,244,245,.24), rgba(161,161,170,.18), #020617)";
  }

  return "linear-gradient(135deg, #27272a, #020617, rgba(30,64,175,.35))";
}

function Icon({ type }) {
  if (type === "bag") return <span className="icon">▢</span>;
  if (type === "glasses") return <span className="icon">⌐⌐</span>;
  if (type === "arrow") return <span>→</span>;
  if (type === "back") return <span>←</span>;
  return <span className="icon">⌕</span>;
}

function StatusBadge({ status }) {
  const className = `status status-${status.toLowerCase().replaceAll(" ", "-")}`;
  return <span className={className}>{status}</span>;
}

function ProductImage({ product, variant, large = false, selectedImage }) {
  const colorName = variant?.color || product.variants?.[0]?.color || product.name;
  const firstImage = selectedImage || variant?.images?.[0];

  if (!firstImage) return null;

  return (
    <div className={`placeholder image-placeholder ${large ? "placeholder-large" : ""}`}>
      <img src={firstImage} alt={`${product.name} ${colorName}`} className="product-image" />
    </div>
  );
}

function PlaceholderVisual({ product, variant, large = false, selectedImage }) {
  const colorName = variant?.color || product.variants?.[0]?.color || product.name;
  const isBag = product.category.includes("Bags");

  if (variant?.images?.length) {
    return <ProductImage product={product} variant={variant} large={large} selectedImage={selectedImage} />;
  }

  return (
    <div className={`placeholder ${large ? "placeholder-large" : ""}`} style={{ background: getGradient(colorName) }}>
      <div className="glow glow-one" />
      <div className="glow glow-two" />

      <div className="placeholder-content">
        <div className="placeholder-icon">{isBag ? <Icon type="bag" /> : <Icon type="glasses" />}</div>
        <p className="placeholder-label">Placeholder Preview</p>
        <h3>{product.name}</h3>
        <p>{colorName}</p>
      </div>
    </div>
  );
}

function ProductGallery({ product, variant, selectedImage, onSelectImage }) {
  const images = variant?.images || [];

  return (
    <div className="gallery-wrap">
      <PlaceholderVisual product={product} variant={variant} large selectedImage={selectedImage} />

      {images.length > 1 && (
        <div className="thumbnail-row">
          {images.map((image, index) => {
            const isSelected = image === selectedImage;

            return (
              <button
                key={image}
                onClick={() => onSelectImage(image)}
                className={`thumbnail-button ${isSelected ? "thumbnail-selected" : ""}`}
                aria-label={`View image ${index + 1}`}
              >
                <img src={image} alt={`${product.name} preview ${index + 1}`} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ProductCard({ item, onSelect, buttonLabel = "View Colors" }) {
  return (
    <article className="product-card">
      <button onClick={() => onSelect(item.id)} className="visual-button">
        <PlaceholderVisual product={item} variant={item.variants?.[0]} />
      </button>

      <div className="product-body">
        <div className="product-top">
          <div>
            <p className="category">{item.category}</p>
            <h3>{item.name}</h3>
          </div>

          <span className="varies">Varies by color</span>
        </div>

        <p className="description">{item.description}</p>

        <div className="mini-chips">
          {item.variants?.slice(0, 5).map((variant) => (
            <div key={variant.color} className="mini-chip-group">
              {getColorChips(variant.color).slice(0, 2).map((chip, index) => (
                <span key={`${variant.color}-${index}`} className="mini-chip" style={{ background: chip }} />
              ))}
            </div>
          ))}

          {item.variants?.length > 5 && <span className="more">+{item.variants.length - 5} more</span>}
        </div>

        <div className="product-bottom">
          <span className="price">{item.price}</span>

          <button onClick={() => onSelect(item.id)} className="white-button">
            {buttonLabel} <Icon type="arrow" />
          </button>
        </div>
      </div>
    </article>
  );
}

function ProductDetailPage({ product, onBack }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedImage, setSelectedImage] = useState(product.variants[0]?.images?.[0] || null);
  const isSoldOut = selectedVariant.status === "Sold Out";

  function handleVariantSelect(variant) {
    setSelectedVariant(variant);
    setSelectedImage(variant.images?.[0] || null);
  }

  return (
    <main className="site">
      <section className="detail-section">
        <div className="container">
          <button onClick={onBack} className="outline-button">
            <Icon type="back" /> Back to Catalog
          </button>

          <div className="detail-grid">
            <div className="detail-visual">
              <ProductGallery
                product={product}
                variant={selectedVariant}
                selectedImage={selectedImage}
                onSelectImage={setSelectedImage}
              />
            </div>

            <div className="detail-panel">
              <p className="category">{product.category}</p>
              <h1>{product.name}</h1>
              <p className="description">{product.description}</p>

              <div className="price-row">
                <span className="big-price">{product.price}</span>
                <StatusBadge status={selectedVariant.status} />
              </div>

              <div className="color-section">
                <div className="section-title-row">
                  <h2>Available Colors</h2>
                  <span>{product.variants.length} options</span>
                </div>

                <div className="variant-grid">
                  {product.variants.map((variant) => {
                    const isSelected = variant.color === selectedVariant.color;

                    return (
                      <button
                        key={variant.color}
                        onClick={() => handleVariantSelect(variant)}
                        className={`variant-card ${isSelected ? "selected" : ""}`}
                      >
                        <div className="mini-chips">
                          {getColorChips(variant.color).map((chip, index) => (
                            <span
                              key={`${variant.color}-${index}`}
                              className="chip small"
                              style={{ background: chip }}
                            />
                          ))}
                        </div>

                        <p>{variant.color}</p>
                        <StatusBadge status={variant.status} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {isSoldOut && (
                <div className="waitlist-box">
                  <h3>Sold out? Join the restock waitlist.</h3>
                  <p>
                    Text me and I’ll save your interest for this exact colorway. Once it comes back, I can message you
                    first.
                  </p>

                  <a href={getWaitlistTextUrl(product.name, selectedVariant.color)} className="blue-button">
                    Text Me for Restock Alert
                  </a>
                </div>
              )}

              <div className="action-row">
                <a href={FACEBOOK_URL} className="outline-button">
                  Facebook
                </a>

                <a href={TEXT_URL} className="blue-button">
                  Text Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedProductId, setSelectedProductId] = useState(() => {
    const hashProductId = getProductIdFromHash();
    const productExists = products.some((item) => item.id === hashProductId);
    return productExists ? hashProductId : null;
  });

  useEffect(() => {
    function handleHashChange() {
      const hashProductId = getProductIdFromHash();
      const productExists = products.some((item) => item.id === hashProductId);
      setSelectedProductId(productExists ? hashProductId : null);
    }

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  function handleProductSelect(productId) {
    setSelectedProductId(productId);
    window.location.hash = productId;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBackToCatalog() {
    setSelectedProductId(null);
    window.history.pushState("", document.title, window.location.pathname + window.location.search);
    setTimeout(() => {
      document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  const categories = getCategories(products);
  const selectedProduct = selectedProductId ? getProductById(products, selectedProductId) : null;

  const filteredProducts = useMemo(() => {
    return filterProducts(products, query, category);
  }, [query, category]);

  const sunglassesProducts = filteredProducts.filter((item) => item.category === "Oakley-Inspired Sunglasses");
  const bagProducts = filteredProducts.filter((item) => item.category === "Coach-Inspired Bags");

  if (selectedProduct) {
    return <ProductDetailPage product={selectedProduct} onBack={handleBackToCatalog} />;
  }

  return (
    <main className="site">
      <section className="hero">
        <div className="container">
          <div className="pill">
            <Icon type="bag" /> IVN Vault
          </div>

          <img src="/ivn-vault-logo.png" alt="IVN Vault" className="hero-logo" />

          <p className="hero-text">
            Browse Oakley-inspired sunglasses and Coach-inspired bags. Message to check availability, colors, bundle
            deals, and pickup options.
          </p>

          <div className="hero-actions">
            <a href="#catalog" className="blue-button">
              View Catalog
            </a>

            <a href="#contact" className="outline-button">
              Contact Me
            </a>
          </div>
        </div>
      </section>

      <section id="catalog" className="container catalog-section">
        <div className="catalog-header">
          <div>
            <p className="current">
              <Icon type="glasses" /> Current Inventory
            </p>
            <h2>Catalog</h2>
          </div>

          <div className="filters">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products or colors..."
            />

            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>

        {sunglassesProducts.length > 0 && (
          <div className="category-section">
            <div className="category-heading">
              <div>
                <h3>Sunglasses</h3>
                <p>Oakley-inspired frames and colorways</p>
              </div>

              <span>{sunglassesProducts.length} styles</span>
            </div>

            <div className="product-grid">
              {sunglassesProducts.map((item) => (
                <ProductCard key={item.id} item={item} onSelect={handleProductSelect} />
              ))}
            </div>
          </div>
        )}

        {sunglassesProducts.length > 0 && bagProducts.length > 0 && (
          <div className="divider">
            <span>Next Category</span>
          </div>
        )}

        {bagProducts.length > 0 && (
          <div className="category-section">
            <div className="category-heading">
              <div>
                <h3>Bags</h3>
                <p>Coach-inspired bag styles</p>
              </div>

              <span>{bagProducts.length} styles</span>
            </div>

            <div className="product-grid">
              {bagProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  onSelect={handleProductSelect}
                  buttonLabel="View Options"
                />
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="container best-seller">
        <div>
          <p className="eyebrow">Bundle Deals</p>
          <h2>Save more when you grab more.</h2>
          <p>
            Bundle pricing can be mixed between sunglasses. Message me the models and colors you want, and I’ll confirm
            the best total.
          </p>
        </div>

        <div className="deal-grid deal-grid-top">
          <div>
            <p>Radar EV</p>
            <h3>2 for $100</h3>
          </div>

          <div>
            <p>Mixed Sunglasses</p>
            <h3>Save $15+</h3>
          </div>

          <div>
            <p>3+ Items</p>
            <h3>Best Deal</h3>
          </div>
        </div>
      </section>

      <section className="order-section">
        <div className="container order-grid">
          <div className="order-intro">
            <p className="eyebrow">How to Order</p>
            <h2>Simple pickup process.</h2>
            <p>Choose what you want, message me, and I’ll confirm the details before meeting.</p>
          </div>

          <div className="steps-grid">
            {[
              "Pick the design and color.",
              "Message me on Facebook.",
              "I’ll confirm availability.",
              "Meet for pickup or arrange delivery.",
            ].map((step, index) => (
              <div key={step} className="step-card">
                <span>{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="transparency-section">
        <div className="container">
          <div className="transparency-box">
            <p className="eyebrow">Transparency Note</p>
            <p>
              Items are inspired-style pieces and are not original retail Oakley or Coach products. The pieces are
              high-quality, 1:1-style items with premium details and overall quality. Message before purchase for full
              details.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container contact-box">
          <div>
            <h2>Interested in something?</h2>
            <p>Message me the product name and color you want. I can confirm availability, pickup, and details.</p>
          </div>

          <div className="contact-actions">
            <a href={FACEBOOK_URL} className="outline-button">
              Facebook
            </a>

            <a href={TEXT_URL} className="blue-button">
              Text Me
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}