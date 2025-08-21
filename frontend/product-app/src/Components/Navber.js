import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navber.css"; // Assuming you have some styles for the navbar

export default function Navber({ cartItems = [] }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);
  const navigate = useNavigate(); // <-- navigation hook

  useEffect(() => {
    function onDocClick(e) {
      if (!open) return;
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [open]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="navbar">
      <div className="container">
        <h1>
          <span className="blink">blink</span>
          <span className="it">it</span>
        </h1>

        <select>
          <option value="en">Rajpura, Punjab</option>
          <option value="es">Patiala, Punjab</option>
          <option value="fr">Fatehgarh Sahib, Punjab</option>
          <option value="de">Mandi Gobindgarh, Punjab</option>
        </select>

        <input type="text" placeholder="Search products..." />

        {/* ... your menu toggle and search bar here ... */}

        <div className="right">
          <button className="cta" onClick={() => alert("Get Started clicked")}>
            Get Started
          </button>

          {/* 🛒 Cart Button */}
          <button className="cta" onClick={() => navigate("/cart")}>
            🛒 Cart
            {cartItems && cartItems.length > 0 && (
              <span
                style={{
                  marginLeft: 6,
                  background: "#06b123ff",
                  color: "#fff",
                  borderRadius: "50%",
                  padding: "2px 8px",
                  fontSize: "12px",
                }}
              >
                {cartItems.reduce((sum, item) => sum + item.count, 0)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
