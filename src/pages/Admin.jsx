import React, { useState, useEffect } from 'react';

const ADMIN_PASSKEY = "admin123";

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: "", category: "skin", price: "", volume: "", badge: "", image: "", description: ""
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
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      id: 'ops-' + Date.now().toString().slice(-4),
      price: Number(formData.price)
    };
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      alert("Product published successfully!");
      setFormData({ title: "", category: "skin", price: "", volume: "", badge: "", image: "", description: "" });
      fetchInventory();
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete formulation?")) {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchInventory();
    }
  };

  if (!authenticated) {
    return (
      <div className="admin-auth-gate" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="form-card" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <h2>Admin Gatekeeper</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.85rem' }}>Enter security PIN to manage store catalog.</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              className="form-control"
              style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '16px' }}
              value={passInput}
              onChange={(e) => setPassInput(e.target.value)}
              placeholder="••••••••"
              required
            />
            <button type="submit" className="btn-primary-action">Enter Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="content-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1>Catalog & Inventory Manager</h1>
          <button
            className="btn-add-cart"
            onClick={() => { sessionStorage.removeItem("opulent_admin_auth"); setAuthenticated(false); }}
          >
            Log Out
          </button>
        </div>

        <div className="form-card" style={{ marginBottom: '40px' }}>
          <h3>Add New Product</h3>
          <form onSubmit={handleAddProduct}>
            <div className="grid-2col" style={{ gap: '16px' }}>
              <div className="form-group">
                <label>Title</label>
                <input className="form-control" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select className="form-control" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                  <option value="skin">Skin</option>
                  <option value="hair">Hair</option>
                  <option value="makeup">Makeup</option>
                  <option value="nails">Nails</option>
                  <option value="hand">Hand</option>
                  <option value="neck">Neck</option>
                  <option value="jewelry">Jewelry</option>
                </select>
              </div>
              <div className="form-group">
                <label>Price (PKR)</label>
                <input type="number" className="form-control" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Volume / Size</label>
                <input className="form-control" required value={formData.volume} onChange={(e) => setFormData({ ...formData, volume: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Badge Tag</label>
                <input className="form-control" required value={formData.badge} onChange={(e) => setFormData({ ...formData, badge: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input type="url" className="form-control" required value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
              </div>
            </div>
            <div className="form-group" style={{ marginTop: '12px' }}>
              <label>Description</label>
              <textarea className="form-control" rows="3" required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </div>
            <button type="submit" className="btn-primary-action" style={{ maxWidth: '240px', marginTop: '10px' }}>Publish Product</button>
          </form>
        </div>

        <div className="form-card">
          <h3>Active Inventory ({products.length} Items)</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
            <thead>
              <tr style={{ background: 'var(--bg-surface-subtle)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Image</th>
                <th style={{ padding: '10px' }}>Title</th>
                <th style={{ padding: '10px' }}>Category</th>
                <th style={{ padding: '10px' }}>Price</th>
                <th style={{ padding: '10px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '10px' }}><img src={p.image} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} alt="" /></td>
                  <td style={{ padding: '10px' }}><strong>{p.title}</strong><br /><small style={{ color: 'var(--text-muted)' }}>{p.volume}</small></td>
                  <td style={{ padding: '10px', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700 }}>{p.category}</td>
                  <td style={{ padding: '10px' }}>PKR {p.price?.toLocaleString()}</td>
                  <td style={{ padding: '10px' }}><button onClick={() => handleDelete(p.id)} style={{ color: 'var(--brand-terracotta)', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 700 }}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
      }
