import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col">
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem' }}>OPULENT SKIN</h4>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.86rem', marginTop: '8px' }}>
            Dermatologically validated clean formulations engineered for Pakistani skin tones and humid climates.
          </p>
        </div>

        <div className="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products Catalog</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact & Concierge</Link></li>
            <li><Link to="/admin" style={{ color: 'var(--brand-gold)', fontWeight: 700 }}>Admin Backoffice</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Collections</h4>
          <ul>
            <li><Link to="/products">Skin Care</Link></li>
            <li><Link to="/products">Hair & Scalp</Link></li>
            <li><Link to="/products">Makeup Essentials</Link></li>
            <li><Link to="/products">Beauty Jewelry</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Lahore Flagship</h4>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem' }}>
            M.M. Alam Road, Gulberg III, Lahore<br />
            Helpline: +92 300 1234567<br />
            Cash on Delivery Across Pakistan
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; 2026 Opulent Skin. All rights reserved.</span>
        <span>Component-Based Storefront</span>
      </div>
    </footer>
  );
}
