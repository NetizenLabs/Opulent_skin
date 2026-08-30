export function ProductCard(p) {
  const oldPrice = p.oldPrice ? `<span style="font-size:0.75rem; color:var(--text-muted); text-decoration:line-through;">PKR ${p.oldPrice.toLocaleString()}</span>` : '';
  return `
    <article class="product-card" data-id="${p.id}" data-category="${p.category}">
      <div class="p-img-box">
        <span class="p-badge">${p.badge}</span>
        <img src="${p.image}" alt="${p.title}" loading="lazy">
      </div>
      <div class="p-body">
        <span class="p-category-label">${p.category.toUpperCase()} • ${p.volume}</span>
        <h3 class="p-title">${p.title}</h3>
        <p class="p-desc">${p.description}</p>
        <div class="p-footer-row">
          <div>
            <span class="p-price">PKR ${p.price.toLocaleString()}</span>
            ${oldPrice}
          </div>
          <button class="btn-add-cart" data-action="add-to-cart" data-id="${p.id}">
            + Add to Bag
          </button>
        </div>
      </div>
    </article>
  `;
}
