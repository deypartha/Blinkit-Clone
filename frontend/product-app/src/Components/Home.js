import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";

export default function Home() {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [products, setProducts] = useState([]); // ✅ initialize with empty array

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {products.length === 0 ? (   // ✅ prevent map on undefined
        <p>Loading products...</p>
      ) : (
        products.map((p) => {
          const inCart = cart[p._id];
          return (
            <div key={p._id} style={{ marginBottom: 10 }}>
              <img
                src={p.image}
                alt={p.name}
                style={{ width: 50, height: 50, marginRight: 10 }}
              />
              {p.name} - ₹{p.price}
              {!inCart ? (
                <button
                  onClick={() => addToCart(p)}
                  style={{ marginLeft: 10, padding: "4px 10px" }}
                >
                  Add to Cart
                </button>
              ) : (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    marginLeft: 10,
                  }}
                >
                  <button
                    onClick={() => removeFromCart(p)}
                    style={{ padding: "4px 10px" }}
                  >
                    –
                  </button>
                  <span style={{ margin: "0 8px" }}>{inCart.count}</span>
                  <button
                    onClick={() => addToCart(p)}
                    style={{ padding: "4px 10px" }}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
