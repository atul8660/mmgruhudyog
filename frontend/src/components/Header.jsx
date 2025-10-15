import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css";

const Header = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Product list (should match your Products.jsx items or IDs)
  const products = [
    { name: "Delicious Ladoo", id: "delicious-ladoo" },
    { name: "Kaju Katli", id: "kaju-katli" },
    { name: "Sonpapdi", id: "sonpapdi" },
    { name: "Jalebi", id: "jalebi" },
    { name: "Mahisurpak", id: "mahisurpak" },
    { name: "Karanji", id: "karanji" },
    { name: "Barfi", id: "barfi" },
    { name: "Gulab Jamun", id: "gulab-jamun" },
    { name: "Rasgulla", id: "rasgulla" },
    { name: "Sweets Combo", id: "sweets-combo" },
    { name: "Spicy Chivda", id: "spicy-chivda" },
    { name: "Farsan", id: "farsan" },
    { name: "Spiced Peanuts", id: "spiced-peanuts" },
    { name: "Kharibundi", id: "kharibundi" },
    { name: "Papdi", id: "papdi" },
    { name: "White Chivda", id: "white-chivda" },
    { name: "Normal Shev", id: "normal-shev" },
    { name: "Shev", id: "shev" },
    { name: "Salty Peanuts", id: "salty-peanuts" },
    { name: "Snack Combo", id: "snack-combo" },
  ];

  // ✅ Function to handle direct call
  const handleCall = () => {
    window.location.href = "tel:+919699769021";
    setShowPopup(false);
  };

  // ✅ Search filtering
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery]);

  // ✅ When user clicks a product suggestion
  const handleSelectProduct = (productId) => {
    setSearchQuery("");
    setFilteredProducts([]);
    navigate(`/products#${productId}`);
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setFilteredProducts([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {/* ===== HEADER ===== */}
      <div className="header-container">
        <div className="header-left">
          <img src="/images/logo.jpg" alt="Company Logo" />
          <div className="company-info">
            <h1>महाद्वार महिला गृहउद्योग</h1>
            <div className="details">
              <i className="fa-solid fa-location-dot"></i>
              <span>Ichalkaranji, Maharashtra</span>
            </div>
          </div>
        </div>
        <div className="header-right">
          <button className="view-button" onClick={() => setShowPopup(true)}>
            <i className="fa-solid fa-phone"></i> Mobile Number
          </button>
        </div>
      </div>

      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              id="home"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* ===== Search Box + Contact Supplier ===== */}
        <div className="nav-right" ref={searchRef}>
          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input
              type="text"
              placeholder="Search Products/Services"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* ✅ Search suggestions */}
            {filteredProducts.length > 0 && (
              <ul className="search-suggestions">
                {filteredProducts.map((p) => (
                  <li key={p.id} onClick={() => handleSelectProduct(p.id)}>
                    {p.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ✅ Contact Supplier navigates to Contact.jsx */}
          <div className="contact-supplier">
            <button
              className="contact-button"
              onClick={() => navigate("/contact")}
            >
              <i className="fa-solid fa-paper-plane"></i> Contact Supplier
            </button>
          </div>
        </div>
      </nav>

      {/* ===== POPUP ===== */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Call Supplier</h3>
            <p>📞 +91 9699769021</p>
            <div className="popup-buttons">
              <button className="call-btn" onClick={handleCall}>
                Call
              </button>
              <button className="cancel-btn" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
