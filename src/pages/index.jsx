import React, { useState } from "react";
import { products, brands, categories } from "../data/products";
import { money } from "../services/format";
import { subscribeNewsletter, sendContactMessage } from "../services/api";
import { Section } from "../components/Section";
import { ProductCard } from "../components/ProductCard";
import { SearchBox } from "../components/SearchBox";

function Page({ title, eyebrow, sub, children }) {
  return (
    <div className="page">
      <div className="pageIntro">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        <p>{sub}</p>
      </div>
      {children}
    </div>
  );
}

export function Home({ go, add, newsletter, setNewsletter }) {
  const [email, setEmail] = useState("");
  async function subscribe() {
    const result = await subscribeNewsletter(email);
    if (result.ok) {
      setNewsletter(true);
      setEmail("");
    }
  }
  return (
    <div>
      <div className="homeSearch">
        <SearchBox go={go} />
      </div>
      <div className="hero">
        <img src="https://images.unsplash.com/photo-1619597455322-4fbbd820250a?w=900&h=500&fit=crop&auto=format" />
        <div className="heroOverlay"></div>
        <div className="heroContent">
          <span className="eyebrow">Hardware for serious builds</span>
          <h1>
            Build Your
            <br />
            <em>Dream PC</em>
          </h1>
          <p>
            Top-tier components at unbeatable prices. Free shipping over €135.
          </p>
          <button className="primary" onClick={() => go("/products")}>
            Shop Now <i className="fi fi-sr-arrow-right" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="trust">
        {[
          ["fi-sr-truck-side", "Free Shipping", "Orders €135+"],
          ["fi-sr-shield-check", "2-Year Warranty", "All products"],
          ["fi-sr-bolt", "Fast Delivery", "1–3 days"],
        ].map((x) => {
          let [i, a, b] = x;
          return (
            <div
              className={`trustCard ${a === "Free Shipping" ? "shippingCard" : ""}`}
              key={a}
            >
              <span
                className={a === "Free Shipping" ? "shippingLogo" : ""}
                aria-label={a === "Free Shipping" ? "Free shipping" : undefined}
              >
                <i className={`fi ${i}`} aria-hidden="true" />
              </span>
              <strong>{a}</strong>
              <small>{b}</small>
            </div>
          );
        })}
      </div>
      <Section
        title="Shop by Category"
        action="All"
        onAction={() => go("/products")}
      >
        <div className="grid2">
          {categories.map(([i, n, c]) => (
            <button
              className="category"
              onClick={() => go("/products")}
              key={n}
            >
              <span>
                <i className={`fi ${i}`} aria-hidden="true" />
              </span>
              <div>
                <strong>{n}</strong>
                <small>{c}</small>
              </div>
            </button>
          ))}
        </div>
      </Section>
      <Section
        title="Featured Products"
        action="See all"
        onAction={() => go("/products")}
      >
        <div className="grid2">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} add={add} go={go} />
          ))}
        </div>
      </Section>
      <Section
        title="Popular Brands"
        action="All"
        onAction={() => go("/brands")}
      >
        <div className="brandGrid">
          {brands.map((b) => (
            <button key={b} onClick={() => go("/brands")}>
              <span>{b.slice(0, 2)}</span>
              {b}
            </button>
          ))}
        </div>
      </Section>
      <div className="newsletter">
        <span className="eyebrow">
          <i className="fi fi-sr-envelope" aria-hidden="true" /> NEWSLETTER
        </span>
        <h3>Stay ahead of the latest hardware</h3>
        <p>
          New hardware, build guides, and product updates — straight to your
          inbox.
        </p>
        {newsletter ? (
          <div className="success">
            <i className="fi fi-sr-check" aria-hidden="true" /> You're
            subscribed — thanks!
          </div>
        ) : (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
            <button className="primary wide" onClick={subscribe}>
              Subscribe Now
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function Products({ add, go }) {
  const [filter, setFilter] = useState("All");
  const list =
    filter === "All" ? products : products.filter((p) => p.category === filter);
  return (
    <Page title="Products" sub="Hardware and accessories for every build.">
      <div className="pills">
        {["All", "CPU", "GPU", "Storage", "Keyboard", "Mouse"].map((f) => (
          <button
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
            key={f}
          >
            {f}
          </button>
        ))}
      </div>
      <p className="count">{list.length} products found</p>
      <div className="grid2">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} add={add} go={go} />
        ))}
      </div>
    </Page>
  );
}

export function ProductDetails({ productId, add, go }) {
  const product = products.find(
    (item) => String(item.id) === String(productId),
  );

  if (!product) {
    return (
      <Page title="Product not found" sub="That hardware page does not exist.">
        <button
          className="primary wide pageAction"
          onClick={() => go("/products")}
        >
          Browse Products
        </button>
      </Page>
    );
  }

  return (
    <Page
      title={product.name}
      sub={`${product.category} hardware for your next build.`}
    >
      <div className="productDetail">
        <img
          className="productDetailImage"
          src={product.image}
          alt={product.name}
        />
        <div className="productDetailBody">
          <span className="productDetailCategory">{product.category}</span>
          <div className="rating">
            <i className="fi fi-sr-star" aria-hidden="true" /> {product.rating}{" "}
            customer rating
          </div>
          <p className="productDescription">{product.description}</p>
          <div className="productDetailPrice">{money(product.price)}</div>
          <button className="primary wide" onClick={() => add(product)}>
            <i className="fi fi-sr-shopping-cart" aria-hidden="true" /> Add to
            cart
          </button>
        </div>
      </div>
      <div className="detailSections">
        <section className="detailSection">
          <h2>What it does</h2>
          <ul>
            {product.features.map((feature) => (
              <li key={feature}>
                <i className="fi fi-sr-check" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        </section>
        <section className="detailSection">
          <h2>Specifications</h2>
          <dl>
            {product.specs.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
      <button className="backLink" onClick={() => go("/products")}>
        <i className="fi fi-sr-arrow-left" aria-hidden="true" /> Back to
        products
      </button>
    </Page>
  );
}

export function Brands() {
  return (
    <Page title="Brands" sub="Shop trusted hardware manufacturers.">
      <div className="brandList">
        {brands.map((b) => (
          <div className="brandRow" key={b}>
            <span>{b.slice(0, 2)}</span>
            <div>
              <b>{b}</b>
              <small>Explore {b} products</small>
            </div>
            <i className="fi fi-sr-angle-right" aria-hidden="true" />
          </div>
        ))}
      </div>
    </Page>
  );
}

export function Checkout({ cart, setCart, go }) {
  const [confirmed, setConfirmed] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const total = cart.reduce((s, p) => s + p.price, 0);

  // Confirm only after the email passes a basic browser-side format check.
  function submitOrder(event) {
    event.preventDefault();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    if (!validEmail) {
      setEmailError(
        "Please enter a valid email address, for example name@example.com.",
      );
      return;
    }
    setEmailError("");
    setCart([]);
    setConfirmed(true);
  }
  if (confirmed)
    return (
      <Page title="Order confirmed" sub="Thank you for your purchase.">
        <div className="purchaseConfirmation">
          <div className="confirmationIcon">
            <i className="fi fi-sr-check" aria-hidden="true" />
          </div>
          <h2>Your order is on its way</h2>
          <p>
            We have received your order and will send a confirmation email
            shortly.
          </p>
          <button className="primary wide" onClick={() => go("/products")}>
            Continue Shopping
          </button>
        </div>
      </Page>
    );
  if (!cart.length)
    return (
      <Page title="Your Cart" sub="Your selected products will appear here.">
        <div className="empty">
          <div>
            <i className="fi fi-sr-shopping-cart" aria-hidden="true" />
          </div>
          <h2>Your cart is empty</h2>
          <p>Add products from the store to continue.</p>
          <button className="primary" onClick={() => go("/products")}>
            Browse Products
          </button>
        </div>
      </Page>
    );
  return (
    <Page
      title="Checkout"
      sub={`${cart.length} item${cart.length > 1 ? "s" : ""} in your cart.`}
    >
      <div className="cartList">
        {cart.map((p, i) => (
          <div className="cartItem" key={i}>
            <img src={p.image} />
            <div>
              <b>{p.name}</b>
              <span>{money(p.price)}</span>
            </div>
            <button
              aria-label={`Remove ${p.name}`}
              onClick={() => setCart((c) => c.filter((_, n) => n !== i))}
            >
              <i className="fi fi-sr-trash" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
      <div className="total">
        <span>Total</span>
        <b>{money(total)}</b>
      </div>
      {!showEmailForm ? (
        <button className="primary wide" onClick={() => setShowEmailForm(true)}>
          Place Order
        </button>
      ) : (
        <form className="orderEmailForm" onSubmit={submitOrder} noValidate>
          <label htmlFor="order-email">Email for order confirmation</label>
          <input
            id="order-email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (emailError) setEmailError("");
            }}
            placeholder="name@example.com"
            autoFocus
            aria-invalid={Boolean(emailError)}
          />
          {emailError && (
            <div className="emailError" role="alert">
              <i className="fi fi-sr-exclamation" aria-hidden="true" />
              {emailError}
            </div>
          )}
          <button className="primary wide" type="submit">
            Confirm Purchase
          </button>
        </form>
      )}
    </Page>
  );
}

export function Support() {
  const faqs = [
    [
      "What is your return policy?",
      "We offer a 30-day no-questions-asked return policy on all products.",
    ],
    [
      "How long does shipping take?",
      "Standard shipping takes 3–5 business days. Express delivery is available at checkout.",
    ],
    [
      "Do you offer warranty on products?",
      "All products carry a minimum 2-year warranty.",
    ],
    [
      "Can I track my order?",
      "Once your order ships, you'll receive an email with a tracking link.",
    ],
    [
      "Do you price-match?",
      "Yes, on the same product from an authorised Danish retailer within 14 days.",
    ],
  ];
  const [open, setOpen] = useState(null);
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  async function send() {
    const result = await sendContactMessage(msg);
    if (result.ok) setSent(true);
  }
  return (
    <Page title="Support" sub="We're here Monday–Friday, 09:00–18:00 CET.">
      <div className="contactCards">
        <div>
          <i className="fi fi-sr-envelope" aria-hidden="true" />
          <b>Email</b>
          <small>24h response</small>
        </div>
        <div>
          <i className="fi fi-sr-phone-call" aria-hidden="true" />
          <b>Phone</b>
          <small>+45 33 12 34 56</small>
        </div>
        <div>
          <i className="fi fi-sr-comment" aria-hidden="true" />
          <b>Live Chat</b>
          <small>Online now</small>
        </div>
      </div>
      <h2 className="subTitle">Frequently Asked Questions</h2>
      <div className="faq">
        {faqs.map(([q, a], i) => (
          <div key={q}>
            <button onClick={() => setOpen(open === i ? null : i)}>
              {q}
              <i
                className={`fi ${open === i ? "fi-sr-angle-up" : "fi-sr-angle-down"}`}
                aria-hidden="true"
              />
            </button>
            {open === i && <p>{a}</p>}
          </div>
        ))}
      </div>
      <div className="formCard">
        <h2>Send a Message</h2>
        {sent ? (
          <div className="success big">
            <i className="fi fi-sr-envelope" aria-hidden="true" />
            <b>Message sent!</b>
            <span>We'll get back to you within 24 hours.</span>
          </div>
        ) : (
          <>
            <input placeholder="Your name" />
            <input placeholder="your@email.dk" />
            <textarea
              rows="4"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Describe your issue..."
            />
            <button className="primary wide" onClick={send}>
              Send Message
            </button>
          </>
        )}
      </div>
    </Page>
  );
}

export function About() {
  return (
    <Page
      title="Denmark's home for serious tech."
      eyebrow="OUR STORY"
      sub="TechHub.dk was founded in 2015 by Copenhagen engineers tired of paying import premiums for PC components. 
      Today we're Denmark's largest independent electronics retailer."
    >
      <img
        className="cover"
        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&h=420&fit=crop&auto=format"
      />
      <div className="stats">
        {[
          ["120k+", "Happy customers"],
          ["18k+", "Products listed"],
          ["9", "Years in business"],
          ["4.9", "Avg. review score"],
        ].map((x) => (
          <div key={x[1]}>
            <b>{x[0]}</b>
            <span>{x[1]}</span>
          </div>
        ))}
      </div>
      <h2 className="subTitle">What we stand for</h2>
      {[
        [
          "fi-sr-shield-check",
          "Trust first",
          "Every product we stock is verified and genuine.",
        ],
        [
          "fi-sr-bolt",
          "Speed matters",
          "Same-day dispatch on orders placed before 14:00.",
        ],
        [
          "fi-sr-comment-info",
          "Expert advice",
          "Our team are builders, gamers, and enthusiasts.",
        ],
        [
          "fi-sr-recycle",
          "Sustainability",
          "Certified carbon-neutral shipping across Denmark.",
        ],
      ].map((x) => (
        <div className="value" key={x[1]}>
          <span>
            <i className={`fi ${x[0]}`} aria-hidden="true" />
          </span>
          <div>
            <b>{x[1]}</b>
            <p>{x[2]}</p>
          </div>
        </div>
      ))}
    </Page>
  );
}

export function Blog() {
  const posts = [
    [
      "Buying Guide",
      "Best GPUs for 1440p Gaming in 2026",
      "12 Sep 2026",
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&h=280&fit=crop",
    ],
    [
      "News",
      "Intel's Arrow Lake Architecture — Everything You Need to Know",
      "8 Sep 2026",
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&h=280&fit=crop",
    ],
    [
      "Tutorial",
      "How to Build Your First PC in 2026 — Step by Step",
      "2 Sep 2026",
      "https://images.unsplash.com/photo-1626218174358-7769486c4b79?w=500&h=280&fit=crop",
    ],
  ];
  return (
    <Page title="Blog" sub="Guides, news, and reviews from our team.">
      <div className="blogFeatured">
        <img src={posts[0][3]} />
        <div>
          <span>{posts[0][0]}</span>
          <h2>{posts[0][1]}</h2>
          <p>
            We tested 12 cards so you don't have to. Here's what actually
            matters at this resolution.
          </p>
          <small>{posts[0][2]} · 8 min read</small>
        </div>
      </div>
      {posts.slice(1).map((p) => (
        <div className="post" key={p[1]}>
          <img src={p[3]} />
          <div>
            <span>{p[0]}</span>
            <b>{p[1]}</b>
            <small>{p[2]} · 5 min read</small>
          </div>
        </div>
      ))}
    </Page>
  );
}

export function Careers() {
  const jobs = [
    "Senior Frontend Engineer",
    "Product Manager — Hardware",
    "Customer Experience Specialist",
    "Warehouse Logistics Coordinator",
    "Growth Marketing Manager",
  ];
  return (
    <Page
      title="Build the future of tech retail."
      eyebrow="JOIN THE TEAM"
      sub="We're a 60-person team of engineers, gamers, and logistics nerds based in Copenhagen. Come do the best work of your career."
    >
      <div className="perk">
        <b>What we offer</b>
        {[
          "25 days holiday + 5 flex days",
          "Employee hardware discount — 20% off",
          "Monthly team lunches",
          "Annual learning budget €1,340",
          "Pension 6% employer contribution",
          "Flexible working hours",
        ].map((x) => (
          <span key={x}>
            <i className="fi fi-sr-check" aria-hidden="true" /> {x}
          </span>
        ))}
      </div>
      <h2 className="subTitle">Open Positions ({jobs.length})</h2>
      {jobs.map((j, i) => (
        <div className="job" key={j}>
          <span>
            <i className="fi fi-sr-briefcase" aria-hidden="true" />
          </span>
          <div>
            <b>{j}</b>
            <small>
              {
                [
                  "Engineering",
                  "Product",
                  "Support",
                  "Operations",
                  "Marketing",
                ][i]
              }{" "}
              · Copenhagen · Full-time
            </small>
          </div>
          <i className="fi fi-sr-angle-right" aria-hidden="true" />
        </div>
      ))}
    </Page>
  );
}

export function Press() {
  return (
    <Page
      title="Press"
      eyebrow="MEDIA CENTRE"
      sub="Press enquiries: press@techhub.dk"
    >
      <h2 className="subTitle">Press Releases</h2>
      {[
        "TechHub.dk surpasses 120,000 active customers",
        "TechHub.dk opens second fulfilment centre in Aarhus",
        "Partnership with ASUS Nordic for exclusive ROG product line",
        "TechHub.dk achieves carbon-neutral shipping certification",
      ].map((x, i) => (
        <div className="release" key={x}>
          <small>
            {["10 Sep 2026", "2 Aug 2026", "15 Jun 2026", "3 Apr 2026"][i]}
          </small>
          <b>{x}</b>
          <p>
            Denmark's leading electronics retailer shares the latest company
            update and milestone.
          </p>
          <button>
            Read full release{" "}
            <i className="fi fi-sr-arrow-right" aria-hidden="true" />
          </button>
        </div>
      ))}
    </Page>
  );
}
