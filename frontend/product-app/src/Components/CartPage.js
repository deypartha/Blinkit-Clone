import React, { useContext } from "react";
import { CartContext } from "./CartContext";

function CartPage() {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const cartItems = Object.values(cart);

  const totalItems = cartItems.reduce((acc, item) => acc + item.count, 0);
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  return (
    <div>
      <h2>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.img} alt={item.name} width="50" />
              <span>{item.name}</span>
              <span>₹{item.price}</span>
              <div>
                <button onClick={() => addToCart(item)}>+</button>
                <span>{item.count}</span>
                <button onClick={() => removeFromCart(item)}>–</button>
              </div>
              <span>Total: ₹{item.price * item.count}</span>
            </div>
          ))}

          <hr />
          <h3>Total Items: {totalItems}</h3>
          <h3>Total Amount: ₹{totalAmount}</h3>
        </div>
      )}
    </div>
  );
}

export default CartPage;
