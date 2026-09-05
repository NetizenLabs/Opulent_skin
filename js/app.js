(function() {
  let activeCategory = 'all';
  window.products = [];

  async function loadLiveProducts() {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        window.products = await res.json();
      } else {
        throw new Error("Failed to load from API");
      }
    } catch (err) {
      // Fallback to local cache if offline
      const fallback = localStorage.getItem('opulent_products');
      window.products = fallback ? JSON.parse(fallback) : [];
    }
    renderCatalog();
  }

  function renderCatalog() {
    const container = document.getElementById('products-grid');
    const countDisplay = document.getElementById('catalog-count-display');
    const titleDisplay = document.getElementById('active-category-title');

    if (!container) return;

    const list = window.products || [];
    const filtered = activeCategory === 'all'
      ? list
      : list.filter(p => p.category === activeCategory);

    container.innerHTML = filtered.map(window.ProductCard).join('');

    if (countDisplay) countDisplay.innerText = `Showing ${filtered.length} items`;

    const titles = {
      all: "All Formulations",
      skin: "Skin Care Collection",
      hair: "Hair & Scalp Treatments",
      makeup: "Makeup & Beauty",
      nails: "Nails & Care",
      hand: "Hand Care & Balms",
      neck: "Neck & Décolleté",
      jewelry: "Beauty Jewelry"
    };

    if (titleDisplay) titleDisplay.innerText = titles[activeCategory] || "Products";
  }

  function setupSidebar() {
    const sidebar = document.querySelector('.category-sidebar');
    if (!sidebar) return;

    sidebar.addEventListener('click', (e) => {
      const btn = e.target.closest('.category-btn');
      if (!btn) return;

      sidebar.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category || 'all';
      renderCatalog();
    });
  }

  function setupEvents() {
    document.addEventListener('click', (e) => {
      const addBtn = e.target.closest('[data-action="add-to-cart"]');
      if (addBtn && window.Cart) {
        window.Cart.addToCart(addBtn.dataset.id);
        openDrawer();
        return;
      }

      const incBtn = e.target.closest('[data-action="increase-qty"]');
      if (incBtn && window.Cart) { window.Cart.updateQuantity(incBtn.dataset.id, 1); return; }

      const decBtn = e.target.closest('[data-action="decrease-qty"]');
      if (decBtn && window.Cart) { window.Cart.updateQuantity(decBtn.dataset.id, -1); return; }

      const remBtn = e.target.closest('[data-action="remove-item"]');
      if (remBtn && window.Cart) { window.Cart.updateQuantity(remBtn.dataset.id, -999); return; }

      if (e.target.closest('#btn-trigger-bag')) { openDrawer(); return; }
      if (e.target.closest('#btn-close-bag') || e.target.closest('#cart-overlay')) { closeDrawer(); return; }

      if (e.target.closest('#btn-whatsapp-checkout') && window.Cart) {
        const url = window.Cart.generateWhatsAppOrderUrl();
        if (url) window.open(url, '_blank');
        else alert("Your shopping bag is empty!");
      }
    });
  }

  function openDrawer() {
    document.getElementById('cart-drawer')?.classList.add('active');
    document.getElementById('cart-overlay')?.classList.add('active');
  }

  function closeDrawer() {
    document.getElementById('cart-drawer')?.classList.remove('active');
    document.getElementById('cart-overlay')?.classList.remove('active');
  }

  function init() {
    setupSidebar();
    setupEvents();
    if (window.Cart) window.Cart.renderCartUI();
    loadLiveProducts();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
