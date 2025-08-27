import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navber.css";

export default function Navber({ cartItems = [] }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);
  const navigate = useNavigate();

  // Close menu on outside click
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

  // Close menu on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <h1 className="logo" onClick={() => navigate("/")}>
          <span className="blink">PBSHOP</span>
        </h1>

        {/* Search bar in center */}
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search products..."
            className="search-bar"
          />
        </div>

        {/* Cart button only */}
        <div className="nav-buttons">
          <button
            className="cta"
            onClick={() => navigate("/cart")}
          >
            🛒 Cart
            {cartItems.length > 0 && (
              <span className="cart-badge">
                {cartItems.reduce((sum, item) => sum + item.count, 0)}
              </span>
            )}
          </button>
        </div>

        {/* Hamburger for mobile */}
        <button
          ref={btnRef}
          className="hamburger"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Mobile dropdown menu */}
        {/* <nav ref={menuRef} className={`nav-menu ${open ? "active" : ""}`}>
          <select className="location-select">
            <option value="en">Rajpura, Punjab</option>
            <option value="es">Patiala, Punjab</option>
            <option value="fr">Fatehgarh Sahib, Punjab</option>
            <option value="de">Mandi Gobindgarh, Punjab</option>
          </select>
        </nav> */}
      </div>
    </header>
  );
}
