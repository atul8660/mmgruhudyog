import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "./Header"; // ✅ Import Header component
import "./style.css";
import "./home.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Home = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const searchResultsRef = useRef(null);
  const searchInputRef = useRef(null);

  const products = [
    "Bundi Ladoo",
    "Gulab Jamun",
    "Chivda",
    "Kaju Katli",
    "Rasgulla",
    "Peda",
    "Namkeen Mixture",
  ];

  // Filter products on search input
  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery]);

  // Hide search results on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(e.target) &&
        e.target !== searchInputRef.current
      ) {
        setFilteredProducts([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const mobileNumber = "+919876543210";

  return (
    <div>
      {/* ===== REUSABLE HEADER ===== */}
      <Header 
        popupVisible={popupVisible} 
        setPopupVisible={setPopupVisible} 
      />

      {/* ===== HERO SECTION ===== */}
      <section className="hero">
        <div className="hero-content">
          <h2>
            Welcome to <span>महाद्वार महिला गृहउद्योग</span>
          </h2>
          <p>
            Authentic homemade sweets & namkeens crafted with love and tradition.
          </p>
          <Link to="/products" className="btn-primary">
            Explore Our Products
          </Link>
        </div>
      </section>

      {/* ===== SPECIAL PRODUCTS SECTION ===== */}
      <section className="special-products">
        <h2>Special Products</h2>
        <div className="products-container">
          <div className="product-card">
            <img src="./images/sweets/bundi ladu.jpg" alt="Bundiladoo" />
            <h3>Bundi Ladoo</h3>
            <p>Authentic homemade ladoos crafted with pure ghee and tradition.</p>
          </div>

          <div className="product-card">
            <img src="./images/sweets/gulabjam.jpg" alt="Gulabjam" />
            <h3>Gulab Jamun</h3>
            <p>Classic syrupy sweet dessert made with love.</p>
          </div>

          <div className="product-card">
            <img src="./images/namkeens/spicy chivda.jpg" alt="Spicychivda" />
            <h3>Chivda</h3>
            <p>Light, crunchy, and healthy snack – ideal for every occasion.</p>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer>
        <p>&copy; 2025 Mahadwar Mahila Gruhudyog. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
