import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const CATEGORIES = [
  { id: 'all', label: 'All Formulations' },
  { id: 'skin', label: 'Skin Care' },
  { id: 'hair', label: 'Hair Care' },
  { id: 'makeup', label: 'Makeup' },
  { id: 'nails', label: 'Nails' },
  { id: 'hand', label: 'Hand Care' },
  { id: 'neck', label: 'Neck Care' },
  { id: 'jewelry', label: 'Jewelry' }
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = category === 'all' 
    ? products 
    : products.filter((p) => p.category === category);

  return (
    <div className="page-wrapper">
      <div className="app-container">
        <aside className="category-sidebar">
          <div className="sidebar-heading">Categories</div>
          <ul className="category-list">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <button
                  className={`category-btn ${category === c.id ? 'active' : ''}`}
                  onClick={() => setCategory(c.id)}
                >
                  <span>{c.label}</span>
                  <span className="cat-count">
                    {c.id === 'all' ? products.length : products.filter((p) => p.category === c.id).length}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="catalog-content">
          <div className="trust-metrics-strip">
            <div className="metric-item"><strong>5,280+</strong><span>Orders Delivered</span></div>
            <div className="metric-item"><strong>99.4%</strong><span>Fulfillment Score</span></div>
            <div className="metric-item"><strong>4.92 ★</strong><span>Verified Rating</span></div>
            <div className="metric-item"><strong>24-48h</strong><span>Lahore Dispatch</span></div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2>{CATEGORIES.find((c) => c.id === category)?.label}</h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Showing {filtered.length} items</span>
          </div>

          {loading ? (
            <p>Loading formulations...</p>
          ) : (
            <section className="products-grid">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  );
              }
