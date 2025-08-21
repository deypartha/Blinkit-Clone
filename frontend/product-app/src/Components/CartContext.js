import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const userId = "user123"; // later replace with logged-in user ID

  // Load cart from server on page load
  useEffect(() => {
    axios.get(`http://localhost:5000/cart/${userId}`)
      .then(res => {
        const cartData = {};
        res.data.items.forEach(item => {
          cartData[item.productId] = { ...item };
        });
        setCart(cartData);
      })
      .catch(err => console.error(err));
  }, []);

  // Add to Cart
  const addToCart = async (product) => {
    const res = await axios.post("http://localhost:5000/cart/add", {
      userId,
      product,
    });
    const cartData = {};
    res.data.items.forEach(item => {
      cartData[item.productId] = { ...item };
    });
    setCart(cartData);
  };

  // Remove from Cart
  const removeFromCart = async (product) => {
    const res = await axios.post("http://localhost:5000/cart/remove", {
      userId,
      productId: product._id,
    });
    const cartData = {};
    res.data.items.forEach(item => {
      cartData[item.productId] = { ...item };
    });
    setCart(cartData);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
