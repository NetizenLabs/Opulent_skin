import React, { useState, useEffect } from 'react';

const ADMIN_PASSKEY = "admin123";

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [products, setProducts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Comprehensive e-commerce specification schema
  const [formData, setFormData] = useState({
    title: "",
    sku: "",
    category: "skin",
    price: "",
    oldPrice: "",
    stockQty: "50",
    volume: "",
    badge: "New Formula",
    image: "",
    description: "",
    ingredients: "",
    howToUse: ""
  });

  useEffect(() => {
    if (sessionStorage.getItem("opulent_admin_auth") === "true") {
      setAuthenticated(true);
      fetchInventory();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passInput === ADMIN_PASSKEY) {
      sessionStorage.setItem("opulent_admin_auth", "true");
      setAuthenticated(true);
      fetchInventory();
    } else {
      alert("Invalid Admin Passkey.");
    }
  };

  const fetchInventory = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch {
      // Fallback
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      id: 'ops-' + Date.now().toString().slice(-4),
      sku: formData.sku || 'SKU-' + Math.floor(1000 + Math.random() * 9000),
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stockQty: Number(formData.stockQty)
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert(`Published "${payload.title}" successfully!`);
        setFormData({
          title: "",
          sku: "",
          category: "skin",
          price: "",
          oldPrice: "",
          stockQty: "50",
          volume: "",
          badge: "New Formula",
          image: "",
          description: "",
          ingredients: "",
          howToUse: ""
        });
        fetchInventory();
      } else {
        alert("Failed to save to server.");
      }
    } catch {
      alert("Network error connecting to /api/products");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Remove formulation from live catalog?")) {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchInventory();
    }
  };

  if (!authenticated) {
    return (
      <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '16px' }}>
        <div className="form-card" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>Admin Passkey</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.88rem' }}>
            Enter your administrative credentials to manage store inventory.
          </p>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                style={{ textAlign: 'center', fontSize: '1.2rem', letterSpacing: '0.15em' }}
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" className="btn-primary-action" style={{ width: '100%' }}>
              Authenticate & Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="content-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '2rem' }}>Catalog Operations</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Live Vercel Serverless Sync</p>
          </div>
          <button
            className="btn-add-cart"
            style={{ padding: '8px 18px', background: 'var(--bg-surface-subtle)' }}
            onClick={() => { sessionStorage.removeItem("opulent_admin_auth"); setAuthenticated(false); }}
          >
            Log Out
          </button>
        </div>

        {/* COMPREHENSIVE PRODUCT ENTRY FORM */}
        <div className="form-card">
          <h2 style={{ fontSize: '1.3rem', marginBottom: '18px' }}>Add New Formulation</h2>
          <form onSubmit={handleAddProduct}>
            <div className="admin-grid-3col">
              <div className="form-group">
                <label>Product Title *</label>
                <input
                  className="form-control"
                  required
                  value={formData.title}
                  placeholder="e.g. 15% Vitamin C Glow Concentrate"
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>SKU / Serial Code</label>
                <input
                  className="form-control"
                  value={formData.sku}
                  placeholder="e.g. OPS-SKN-001"
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  className="form-control"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="skin">Skin Care</option>
                  <option value="hair">Hair Care</option>
                  <option value="makeup">Makeup Essentials</option>
                  <option value="nails">Nail Care</option>
                  <option value="hand">Hand Care</option>
                  <option value="neck">Neck Care</option>
                  <option value="jewelry">Beauty Jewelry</option>
                </select>
              </div>

              <div className="form-group">
                <label>Sale Price (PKR) *</label>
                <input
                  type="number"
                  className="form-control"
                  required
                  placeholder="2450"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Regular / Strikethrough Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="2950 (Optional)"
                  value={formData.oldPrice}
                  onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Stock Count *</label>
                <input
                  type="number"
                  className="form-control"
                  required
                  value={formData.stockQty}
                  onChange={(e) => setFormData({ ...formData, stockQty: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Volume / Net Weight *</label>
                <input
                  className="form-control"
                  required
                  placeholder="e.g. 30ml Dropper / 50g Jar"
                  value={formData.volume}
                  onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Badge Tag *</label>
                <input
                  className="form-control"
                  required
                  placeholder="e.g. Dermatologist Tested"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>High-Res Image URL *</label>
                <input
                  type="url"
                  className="form-control"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '12px' }}>
              <label>Formula Highlights & Summary *</label>
              <textarea
                className="form-control"
                rows="2"
                required
                placeholder="Key active percentages, skin benefits, target concerns..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="admin-grid-2col" style={{ marginTop: '12px' }}>
              <div className="form-group">
                <label>Full INCI Ingredients</label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Aqua, Ethyl Ascorbic Acid, Ferulic Acid, Centella Asiatica..."
                  value={formData.ingredients}
                  onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Directions for Application</label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Apply 3-4 drops morning and evening after cleansing..."
                  value={formData.howToUse}
                  onChange={(e) => setFormData({ ...formData, howToUse: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary-action"
              style={{ maxWidth: '280px', marginTop: '16px' }}
            >
              {isSubmitting ? "Publishing..." : "Publish to Storefront"}
            </button>
          </form>
        </div>

        {/* INVENTORY LISTING (DESKTOP TABLE + MOBILE STACK CARDS) */}
        <div className="form-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.3rem' }}>Live Catalog ({products.length})</h2>
            <button
              onClick={fetchInventory}
              style={{ background: 'none', border: '1px solid var(--border-color)', padding: '6px 14px', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontWeight: 700 }}
            >
              Refresh
            </button>
          </div>

          {/* Desktop Table */}
          <table className="admin-desktop-table">
            <thead>
              <tr>
                <th>Preview</th>
                <th>Title & SKU</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td><img src={p.image} style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '4px' }} alt="" /></td>
                  <td><strong>{p.title}</strong><br /><small style={{ color: 'var(--text-muted)' }}>{p.sku || p.id} • {p.volume}</small></td>
                  <td style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700 }}>{p.category}</td>
                  <td>{p.stockQty || 'In Stock'}</td>
                  <td>PKR {p.price?.toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(p.id)}
                      style={{ color: 'var(--brand-terracotta)', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 700 }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Stack Cards */}
          <div className="admin-mobile-cards">
            {products.map((p) => (
              <div key={p.id} className="admin-item-card">
                <div className="admin-card-left">
                  <img src={p.image} className="admin-card-img" alt="" />
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>{p.title}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {p.category.toUpperCase()} • {p.volume}
                    </span>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--brand-gold-dark)', marginTop: '2px' }}>
                      PKR {p.price?.toLocaleString()}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(p.id)}
                  style={{ color: 'var(--brand-terracotta)', border: 'none', background: 'none', padding: '8px', fontWeight: 700 }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
                    }
                          
