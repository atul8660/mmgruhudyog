import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Products from "./components/Products";
import About from "./components/About";
import Contact from "./components/Contact";
import BuyNow from "./components/BuyNow";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/buynow" element={<BuyNow />} />
      
    </Routes>
  );
};

export default App;
