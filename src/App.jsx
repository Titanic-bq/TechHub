import React, { useEffect, useState } from "react";
import {
  Home,
  Products,
  ProductDetails,
  Brands,
  Checkout,
  Support,
  About,
  Blog,
  Careers,
  Press,
} from "./pages";
import { SearchBox } from "./components/SearchBox";
import "./styles/main.css";

export default function App() {
  // The app uses browser history directly to keep routing lightweight for this demo.
  const [path, setPath] = useState(location.pathname);
  const [cart, setCart] = useState([]);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  useEffect(() => {
    const onPop = () => setPath(location.pathname);
    addEventListener("popstate", onPop);
    return () => removeEventListener("popstate", onPop);
  }, []);

  function go(to) {
    // Update the URL without a full reload so cart state stays in memory.
    history.pushState({}, "", to);
    setPath(to);
    setMenu(false);
    scrollTo(0, 0);
  }

  function add(product) {
    // Cart entries are kept as individual items so duplicate products are supported.
    setCart((c) => [...c, product]);
  }

  const count = cart.length;

  return (
    <div className="app">
      <header className="header">
        <div className="topbar">
          <button className="logo" onClick={() => go("/")}>
            <span className="logoMark">TH</span>
            <span>
              TechHub<span className="dot">.dk</span>
            </span>
          </button>
          <div className="actions">
            <button
              className="iconBtn"
              onClick={() => setSearch((v) => !v)}
              aria-label="Search"
            >
              <i className="fi fi-sr-search" aria-hidden="true" />
            </button>
            <button
              className="iconBtn cartBtn"
              onClick={() => go("/checkout")}
              aria-label="Cart"
            >
              <i className="fi fi-sr-shopping-cart" aria-hidden="true" />
              {count > 0 && <b>{count}</b>}
            </button>
            <button
              className="iconBtn"
              onClick={() => setMenu((v) => !v)}
              aria-label="Menu"
            >
              <i
                className={`fi ${menu ? "fi-sr-cross" : "fi-sr-menu-burger"}`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
        {search && path !== "/" && (
          <div className="searchWrap">
            <SearchBox go={go} autoFocus />
          </div>
        )}
        {menu && (
          <nav className="drawer">
            {[
              ["Products", "/products"],
              ["Brands", "/brands"],
              ["Support", "/support"],
              ["About", "/about"],
            ].map(([label, url]) => (
              <button key={url} onClick={() => go(url)}>
                {label}
                <i className="fi fi-sr-angle-right" aria-hidden="true" />
              </button>
            ))}
          </nav>
        )}
      </header>

      <main>
        {path === "/" && (
          <Home
            go={go}
            add={add}
            newsletter={newsletter}
            setNewsletter={setNewsletter}
          />
        )}
        {path === "/products" && <Products add={add} go={go} />}
        {path.startsWith("/products/") && (
          <ProductDetails productId={path.split("/")[2]} add={add} go={go} />
        )}
        {path === "/brands" && <Brands />}
        {path === "/checkout" && (
          <Checkout cart={cart} setCart={setCart} go={go} />
        )}
        {path === "/support" && <Support />}
        {path === "/about" && <About />}
        {path === "/blog" && <Blog />}
        {path === "/careers" && <Careers />}
        {path === "/press" && <Press />}
      </main>

      <footer>
        <button className="logo" onClick={() => go("/")}>
          <span className="logoMark">TH</span>
          <span>
            TechHub<span className="dot">.dk</span>
          </span>
        </button>
        <p>
          Denmark's electronics destination. Premium components, unbeatable
          prices.
        </p>
        <div className="footerGrid">
          <div>
            <strong>SHOP</strong>
            <button onClick={() => go("/products")}>PC Components</button>
            <button onClick={() => go("/products")}>Gaming</button>
            <button onClick={() => go("/products")}>Monitors</button>
          </div>
          <div>
            <strong>COMPANY</strong>
            <button onClick={() => go("/about")}>About Us</button>
            <button onClick={() => go("/support")}>Contact</button>
            <button onClick={() => go("/blog")}>Blog</button>
            <button onClick={() => go("/careers")}>Careers</button>
            <button onClick={() => go("/press")}>Press</button>
          </div>
        </div>
        <small>© 2026 TechHub.dk · CVR 12345678 · All rights reserved</small>
      </footer>
    </div>
  );
}
