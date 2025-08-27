import React, { useContext } from "react";
import { CartContext } from "./CartContext";

export default function Home() {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  // Example products with images
  const products = [
    { _id: 1, name: "Apple", price: 50, image: "https://www.shutterstock.com/image-photo/red-apple-cut-half-water-600nw-2532255795.jpg" },
    { _id: 2, name: "Banana", price: 20, image: "https://png.pngtree.com/png-clipart/20220716/ourmid/pngtree-banana-yellow-fruit-banana-skewers-png-image_5944324.png" },
    { _id: 3, name: "Mango", price: 60, image: "https://5.imimg.com/data5/SELLER/Default/2023/9/344928632/OW/RQ/XC/25352890/yellow-mango.jpeg" },
    { _id: 4, name: "Orange", price: 40, image: "https://www.lifelinehealthcarebd.org/data/frontImages/gallery/product_image/Oranges-fruit.jpg" },
    { _id: 5, name: "Grapes", price: 70, image: "https://extension.psu.edu/media/catalog/product/5/9/598fa4dc3131dff06c11acffafcc0e6a.jpeg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:" },
    { _id: 6, name: "Pineapple", price: 90, image: "https://png.pngtree.com/png-vector/20240906/ourmid/pngtree-realistic-pineapple-clipart-illustration-tropical-fruit-graphic-png-image_13764427.png" },
    { _id: 7, name: "Watermelon", price: 120, image: "https://www.millerchemical.com/wp-content/uploads/2021/03/watermelon-1142119394.png" },
    { _id: 8, name: "Papaya", price: 45, image: "https://img.freepik.com/free-photo/tasty-papaya-still-life_23-2151580898.jpg" },
    { _id: 9, name: "Strawberry", price: 150, image: "https://img.freepik.com/free-photo/strawberry-isolated-white-background_1232-1974.jpg?semt=ais_hybrid&w=740&q=80" },
    { _id: 10, name: "Kiwi", price: 80, image: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Kiwi_%28Actinidia_chinensis%29_1_Luc_Viatour.jpg" },
    { _id: 11, name: "Guava", price: 35, image: "https://orgfarm.store/cdn/shop/files/guava.webp?v=1721811540&width=1214" },
    { _id: 12, name: "Cherry", price: 200, image: "https://media.istockphoto.com/id/506627545/photo/cherry-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=xa-4D_CcLiARKWnDKU-blrB0NWHQKpklO7fLswGmbEs=" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Products</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)", // 6 per row
          gap: "20px", // equal gap
        }}
      >
        {products.map((p) => {
          const inCart = cart[p._id];
          return (
            <div
              key={p._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                textAlign: "center",
                background: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={p.image}
                alt={p.name}
                style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
              />
              <h4 style={{ margin: "10px 0" }}>{p.name}</h4>
              <p style={{ fontWeight: "bold", margin: "5px 0" }}>₹{p.price}</p>

              {!inCart ? (
                <button
                  onClick={() => addToCart(p)}
                  style={{
                    background: "#28a745",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Add to Cart
                </button>
              ) : (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <button
                    onClick={() => removeFromCart(p)}
                    style={{
                      background: "#dc3545",
                      color: "#fff",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    –
                  </button>
                  <span style={{ margin: "0 10px" }}>{inCart.count}</span>
                  <button
                    onClick={() => addToCart(p)}
                    style={{
                      background: "#28a745",
                      color: "#fff",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
