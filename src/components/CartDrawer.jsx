import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, updateQty, subtotal, triggerWhatsAppCheckout } = useCart();

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(false)} />
      <aside className={`cart-drawer ${isOpen ? 'active' : ''}`}>
        <div className="cart-drawer-header">
          <h3 style={{ fontFamily: 'var(--font-heading)' }}>Shopping Bag</h3>
          <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer' }}>✕</button>
        </div>

        <div className="cart-items-scroll">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              Your shopping bag is currently empty.
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item-row">
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>{item.title}</h4>
                  <span style={{ fontSize: '0.82rem', color: 'var(--brand-gold-dark)', fontWeight: 700 }}>
                    PKR {(item.price * item.qty).toLocaleString()}
                  </span>
                  <div className="cart-qty-ctrl">
                    <button className="btn-qty" onClick={() => updateQty(item.id, -1)}>−</button>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{item.qty}</span>
                    <button className="btn-qty" onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                </div>
                <button
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                  onClick={() => updateQty(item.id, -999)}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem', marginBottom: '12px' }}>
            <span>Subtotal:</span>
            <span style={{ color: 'var(--brand-gold-dark)' }}>PKR {subtotal.toLocaleString()}</span>
          </div>
          <button className="btn-whatsapp-order" onClick={triggerWhatsAppCheckout}>
            Confirm Order via WhatsApp (COD)
          </button>
        </div>
      </aside>
    </>
  );
}
