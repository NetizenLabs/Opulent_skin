import React from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <div className="p-img-box">
        <span className="p-badge">{product.badge}</span>
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>
      <div className="p-body">
        <span className="p-category-label">{product.category.toUpperCase()} • {product.volume}</span>
        <h3 className="p-title">{product.title}</h3>
        <p className="p-desc">{product.description}</p>
        <div className="p-footer-row">
          <div>
            <span className="p-price">PKR {product.price?.toLocaleString()}</span>
            {product.oldPrice && (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginLeft: '6px' }}>
                PKR {product.oldPrice.toLocaleString()}
              </span>
            )}
          </div>
          <button className="btn-add-cart" onClick={() => addToCart(product)}>
            + Add to Bag
          </button>
        </div>
      </div>
    </article>
  );
}
