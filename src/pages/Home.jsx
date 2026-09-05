import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setFeatured(data.slice(0, 4)))
      .catch(() => {});
  }, []);

  return (
    <div className="page-wrapper">
      <section className="page-hero">
        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--brand-gold-dark)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '12px' }}>
          Clinically Formulated Botanicals[span_23](start_span)[span_23](end_span)
        </span>
        <h1>Pure Formulations for Radiant Skin</h1>
        <p>Dermatologically crafted skincare and cosmetic essentials tailored for South Asian skin tones and high-humidity climates[span_24](start_span)[span_24](end_span).</p>
        <div style={{ marginTop: '24px' }}>
          <Link to="/products" className="btn-primary-action" style={{ display: 'inline-block', width: 'auto', padding: '14px 32px' }}>
            Explore Complete Catalog
          </Link>
        </div>
      </section>

      <div className="content-container" style={{ paddingTop: '40px' }}>
        <div className="trust-metrics-strip">
          <div className="metric-item"><strong>5,280+</strong><span>Orders Delivered[span_25](start_span)[span_25](end_span)</span></div>
          <div className="metric-item"><strong>99.4%</strong><span>Fulfillment Score[span_26](start_span)[span_26](end_span)</span></div>
          <div className="metric-item"><strong>4.92 ★</strong><span>Verified Rating</span></div>
          <div className="metric-item"><strong>24-48h</strong><span>Lahore Dispatch[span_27](start_span)[span_27](end_span)</span></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <h2>Featured Formulations</h2>
          <Link to="/products" style={{ color: 'var(--brand-gold-dark)', fontWeight: 700, textDecoration: 'none' }}>
            View All Categories ➔
          </Link>
        </div>

        <section className="products-grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </section>
      </div>
    </div>
  );
}
