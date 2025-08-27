import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const addToCart = (product) => {
    setCart((prev) => {
      const current = prev[product._id] || { ...product, count: 0 };
      return {
        ...prev,
        [product._id]: { ...current, count: current.count + 1 },
      };
    });
  };

  const removeFromCart = (product) => {
    setCart((prev) => {
      const current = prev[product._id];
      if (!current) return prev;
      if (current.count === 1) {
        const newCart = { ...prev };
        delete newCart[product._id];
        return newCart;
      }
      return {
        ...prev,
        [product._id]: { ...current, count: current.count - 1 },
      };
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
