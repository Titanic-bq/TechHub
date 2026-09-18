import React from "react";
import { money } from "../services/format";

export function ProductCard({ product, add, go }) {
  return (
    <article className="product">
      <div className="productImg">
        <img src={product.image} />
        <span>{product.category}</span>
      </div>
      <div className="productBody">
        <div className="rating">
          <i className="fi fi-sr-star" aria-hidden="true" /> {product.rating}
        </div>
        <button
          className="productName"
          onClick={() => go?.(`/products/${product.id}`)}
        >
          {product.name}
        </button>
        <div className="prices">
          <b>{money(product.price)}</b>
          <del>{money(product.old)}</del>
        </div>
        <button onClick={() => add(product)}>Add to cart</button>
      </div>
    </article>
  );
}
