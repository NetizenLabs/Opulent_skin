import { products } from '../data/products.js';

const STORAGE_KEY = 'opulent_skin_bag';
export const MERCHANT_WHATSAPP = '923001234567';

let bagState = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

function saveBag() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bagState));
  renderCartUI();
}

export function addToCart(productId) {
  const item = products.find(p => p.id === productId);
  if (!item) return;

  const existing = bagState.find(i => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    bagState.push({
      id: item.id,
      title: item.title,
      price: item.price,
      volume: item.volume,
      image: item.image,
      qty: 1
    });
  }
  saveBag();
}

export function updateQuantity(productId, delta) {
  const item = bagState.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    bagState = bagState.filter(i => i.id !== productId);
  }
  saveBag();
}

export function getCartSummary() {
  const count = bagState.reduce((sum, item) => sum + item.qty, 0);
  const total = bagState.reduce((sum, item) => sum + (item.price * item.qty), 0);
  return { count, total, items: bagState };
}

export function renderCartUI() {
  const { count, total, items } = getCartSummary();
  const countBadge = document.getElementById('global-cart-badge');
  const cartContainer = document.getElementById('cart-items-container');
  const totalElement = document.getElementById('cart-total-amount');

  if (countBadge) countBadge.innerText = count;
  if (totalElement) totalElement.innerText = `PKR ${total.toLocaleString()}`;

  if (!cartContainer) return;

  if (items.length === 0) {
    cartContainer.innerHTML = `
      <div style="text-align:center; padding:40px 0; color:var(--text-muted);">
        <p>Your shopping bag is currently empty.</p>
      </div>
    `;
    return;
  }

  cartContainer.innerHTML = items.map(item => `
    <div class="cart-item-row" data-id="${item.id}">
      <div>
        <h4 style="font-size:0.9rem; font-weight:700;">${item.title}</h4>
        <span style="font-size:0.82rem; color:var(--brand-gold-dark); font-weight:700;">PKR ${(item.price * item.qty).toLocaleString()}</span>
        <div class="cart-qty-ctrl">
          <button class="btn-qty" data-action="decrease-qty" data-id="${item.id}">−</button>
          <span style="font-weight:700; font-size:0.85rem;">${item.qty}</span>
          <button class="btn-qty" data-action="increase-qty" data-id="${item.id}">+</button>
        </div>
      </div>
      <button style="background:none; border:none; color:var(--text-muted); cursor:pointer;" data-action="remove-item" data-id="${item.id}">✕</button>
    </div>
  `).join('');
}

export function generateWhatsAppOrderUrl() {
  const { items, total } = getCartSummary();
  if (items.length === 0) return null;

  let msg = "✨ *NEW ORDER — OPULENT SKIN* ✨%0A%0A";
  msg += "*Order Formulations:*%0A";
  items.forEach((item, index) => {
    msg += `${index + 1}. ${item.title} (${item.volume}) x${item.qty} — PKR ${(item.price * item.qty).toLocaleString()}%0A`;
  });
  msg += `%0A*Total Order Amount:* PKR ${total.toLocaleString()}%0A`;
  msg += "*Payment Method:* Cash on Delivery (COD)%0A%0A";
  msg += "Please confirm delivery details (Customer Name, City, Address)!";

  return `https://wa.me/${MERCHANT_WHATSAPP}?text=${msg}`;
}
