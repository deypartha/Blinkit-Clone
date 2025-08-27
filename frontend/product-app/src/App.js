import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navber from './Components/Navber';
import Home from './Components/Home'
import CartPage from './Components/CartPage';
import { CartProvider } from "./Components/CartContext"; 

function App() {
  return (
    <CartProvider>
      <Router>
          <Navber />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage cart={CartPage} />} />
          </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
