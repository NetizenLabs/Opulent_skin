import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { totalCount, setIsOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <header className="site-header">
        <div className="header-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Navigation"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <Link to="/" className="brand-logo" onClick={closeMenu}>
              <svg viewBox="0 0 240 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="20" r="12" stroke="#C5A880" strokeWidth="2" />
                <circle cx="16" cy="20" r="6" fill="#141312" />
                <text x="36" y="26" fontFamily="'Syne', sans-serif" fontWeight="800" fontSize="18" fill="#141312" letterSpacing="-0.5">
                  OPULENT SKIN
                </text>
              </svg>
            </Link>
          </div>

          <nav className={`nav-menu ${mobileOpen ? 'active' : ''}`}>
            <div className="mobile-nav-header">
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800 }}>MENU</span>
              <button className="close-nav-btn" onClick={closeMenu}>✕</button>
            </div>
            <ul className="nav-links">
              <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
              <li><NavLink to="/products" onClick={closeMenu}>Products</NavLink></li>
              <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
              <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
              <li><NavLink to="/admin" className="mobile-admin-link" onClick={closeMenu}>Admin Panel</NavLink></li>
            </ul>
          </nav>

          <div className="nav-actions">
            <button className="btn-nav-bag" onClick={() => setIsOpen(true)}>
              <span>Bag</span>
              <span className="bag-counter-pill">{totalCount}</span>
            </button>
          </div>
        </div>
      </header>
      <div className={`nav-backdrop ${mobileOpen ? 'active' : ''}`} onClick={closeMenu} />
    </>
  );
}
