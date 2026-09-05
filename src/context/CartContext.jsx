import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
const STORAGE_KEY = 'opulent_react_bag';
const MERCHANT_PHONE = '923001234567';

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsOpen(true);
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const triggerWhatsAppCheckout = () => {
    if (cart.length === 0) return alert("Your bag is empty.");
    let msg = "✨ *NEW ORDER — OPULENT SKIN* ✨%0A%0A*Items:*%0A";
    cart.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.title} (${item.volume}) x${item.qty} — PKR ${(item.price * item.qty).toLocaleString()}%0A`;
    });
    msg += `%0A*Subtotal:* PKR ${subtotal.toLocaleString()}%0A*Payment:* Cash on Delivery (COD)%0A%0APlease confirm name and address!`;
    window.open(`https://wa.me/${MERCHANT_PHONE}?text=${msg}`, '_blank');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        setIsOpen,
        addToCart,
        updateQty,
        totalCount,
        subtotal,
        triggerWhatsAppCheckout
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
    
