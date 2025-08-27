import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";

function CartPage() {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const cartItems = Object.values(cart);

  const totalItems = cartItems.reduce((acc, item) => acc + item.count, 0);
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  // ✅ Handle Razorpay Payment
  const handlePayment = async () => {
    try {
      // 1️⃣ Create order from backend
      const { data } = await axios.post("http://localhost:5000/api/payment", {
        amount: totalAmount * 100, // Razorpay expects paisa
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // your key id
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: "My Store",
        description: "Order Payment",
        handler: function (response) {
          alert("Payment successful! 🎉");
          console.log(response);
        },
        prefill: {
          name: "Partha Dey",
          email: "deypartha222004@gmail.com",
          contact: "6297571084",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
  if (error.response) {
    console.error("Server responded with:", error.response.status, error.response.data);
  } else if (error.request) {
    console.error("No response received:", error.request);
  } else {
    console.error("Axios setup error:", error.message);
  }
  alert("Something went wrong!");

    }
  };
    const [showDrivers, setShowDrivers] = useState(false);
  const [drivers] = useState([
    { id: 1, name: "Ravi Kumar", vehicle: "Bike", rating: 4.7 },
    { id: 2, name: "Aman Singh", vehicle: "Scooter", rating: 4.5 },
    { id: 3, name: "Priya Sharma", vehicle: "Car", rating: 4.8 },
  ]);
  const [currentDriverIndex, setCurrentDriverIndex] = useState(0);
  const [allocatedDriver, setAllocatedDriver] = useState(null);
  const [countdown, setCountdown] = useState(10);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let interval, timer;
    if (showDrivers && !allocatedDriver) {
      setCountdown(10); // reset countdown when new driver shows

      // countdown timer
      timer = setInterval(() => {
        setCountdown((prev) => (prev > 1 ? prev - 1 : 10));
      }, 1000);

      // change driver every 10 sec
      interval = setInterval(() => {
        setCurrentDriverIndex((prev) => {
          const nextIndex = (prev + 1) % drivers.length;
          if (nextIndex === 0) {
            // full cycle done
            setFinished(true);
            clearInterval(interval);
            clearInterval(timer);
          }
          return nextIndex;
        });
      }, 10000);
    }
    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [showDrivers, allocatedDriver, drivers.length]);

  const handleCheckout = () => {
    setShowDrivers(true);
    setAllocatedDriver(null);
    setCurrentDriverIndex(0);
    setCountdown(10);
    setFinished(false);
  };

  const allocateDriver = (driver) => {
    setAllocatedDriver(driver);
    setShowDrivers(false);
    setFinished(false);
  };

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      textAlign: "center",
    },
    button: {
      padding: "10px 20px",
      fontSize: "16px",
      margin: "10px",
      cursor: "pointer",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#007bff",
      color: "#fff",
    },
    card: {
      border: "1px solid #ddd",
      padding: "15px",
      borderRadius: "10px",
      margin: "15px auto",
      width: "320px",
      boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
    },
    driverName: {
      fontSize: "18px",
      fontWeight: "bold",
    },
    info: {
      fontSize: "14px",
      margin: "5px 0",
    },
    countdown: {
      fontSize: "16px",
      color: "red",
      marginTop: "10px",
    },
    success: {
      color: "green",
      fontWeight: "bold",
      marginTop: "15px",
    },
    fail: {
      color: "darkred",
      fontWeight: "bold",
      marginTop: "15px",
    },
  };
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>🛒 Your Cart</h2>

      {/* Top Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => window.history.back()}
          style={{
            padding: "10px 20px",
            border: "none",
            background: "#ddd",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ⬅ Back to Home
        </button>
        <button
          onClick={handlePayment} // ✅ open popup instead of navigating
          style={{
            padding: "10px 20px",
            border: "none",
            background: "#28a745",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          💳 Proceed to Payment
        </button>
      </div>

      {/* Empty Cart */}
      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px" }}>
          Your cart is empty! 🛍️
        </p>
      ) : (
        <div>
          {/* Cart Items */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {cartItems.map((item) => (
              <div
                key={item._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "15px",
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  background: "white",
                }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  style={{ width: "70px", borderRadius: "8px" }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: "0 0 8px" }}>{item.name}</h4>
                  <p style={{ margin: "0 0 8px", color: "#666" }}>
                    Price: ₹{item.price}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <button
                      onClick={() => removeFromCart(item)}
                      style={{
                        padding: "5px 10px",
                        border: "none",
                        borderRadius: "6px",
                        background: "#ff4d4f",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      –
                    </button>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                      {item.count}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      style={{
                        padding: "5px 10px",
                        border: "none",
                        borderRadius: "6px",
                        background: "#4caf50",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <strong>₹{item.price * item.count}</strong>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              background: "#f8f9fa",
              textAlign: "center",
            }}
          >
            <h3>Total Items: {totalItems}</h3>
            <h2>Total Amount: ₹{totalAmount}</h2>
            <div style={styles.container}>
      <h1>Checkout Page</h1>
      <button style={styles.button} onClick={handleCheckout}>
        Checkout
      </button>

      {allocatedDriver ? (
        <div style={styles.card}>
          <h2>✅ Driver Allocated</h2>
          <p style={styles.driverName}>{allocatedDriver.name}</p>
          <p style={styles.info}>Vehicle: {allocatedDriver.vehicle}</p>
          <p style={styles.info}>⭐ Rating: {allocatedDriver.rating}</p>
        </div>
      ) : (
        showDrivers &&
        !finished && (
          <div style={styles.card}>
            <h3>Available Driver</h3>
            <p style={styles.driverName}>
              {drivers[currentDriverIndex].name}
            </p>
            <p style={styles.info}>
              Vehicle: {drivers[currentDriverIndex].vehicle}
            </p>
            <p style={styles.info}>
              ⭐ Rating: {drivers[currentDriverIndex].rating}
            </p>
            <p style={styles.countdown}>
              Auto-switching in {countdown}s...
            </p>
            <button
              style={styles.button}
              onClick={() => allocateDriver(drivers[currentDriverIndex])}
            >
              Select This Driver
            </button>
          </div>
        )
      )}

      {finished && !allocatedDriver && (
        <p style={styles.fail}>❌ No driver was selected. Please try again.</p>
      )}
    </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
