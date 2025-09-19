import { createContext, useContext, useMemo, useState } from "react";

const CartCtx = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // {product, quantity}

  const add = (product, quantity = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.product._id === product._id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + quantity };
        return copy;
      }
      return [...prev, { product, quantity }];
    });
  };

  const remove = (id) => setItems(prev => prev.filter(i => i.product._id !== id));
  const clear = () => setItems([]);

  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  const value = useMemo(() => ({ items, add, remove, clear, total, count }), [items, total, count]);
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export const useCart = () => useContext(CartCtx);

