import React, { useMemo, useState } from "react";
import { products } from "../data/products";

export function SearchBox({ go, autoFocus = false }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  // Match partial names and categories so a single typed character is useful.
  const matches = useMemo(() => {
    if (!normalizedQuery) return [];
    return products
      .filter((product) =>
        [product.name, product.category].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        ),
      )
      .slice(0, 5);
  }, [normalizedQuery]);

  function selectProduct(product) {
    // Suggestions link directly to the detail view for the selected product.
    setQuery("");
    go(`/products/${product.id}`);
  }

  return (
    <div className="searchBox">
      <div className="search">
        <i className="fi fi-sr-search" aria-hidden="true" />
        <input
          autoFocus={autoFocus}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products, brands..."
          aria-label="Search products, brands, or categories"
        />
        <button
          type="button"
          aria-label="Search"
          onClick={() => matches[0] && selectProduct(matches[0])}
        >
          <i className="fi fi-sr-arrow-right" aria-hidden="true" />
        </button>
      </div>
      {matches.length > 0 && (
        <div className="searchResults">
          {matches.map((product) => (
            <button
              className="searchResult"
              key={product.id}
              type="button"
              onClick={() => selectProduct(product)}
            >
              <img src={product.image} alt="" />
              <span>
                <strong>{product.name}</strong>
                <small>{product.category}</small>
              </span>
              <i className="fi fi-sr-angle-right" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
      {normalizedQuery && matches.length === 0 && (
        <div className="searchEmpty">No matching hardware found.</div>
      )}
    </div>
  );
}
