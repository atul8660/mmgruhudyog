import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css";

const Header = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1); // for keyboard nav
  const searchBoxRef = useRef(null); // moved ref to search-box
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Product list (should match your Products.jsx items or IDs)
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

  // Call supplier
  const handleCall = () => {
    window.location.href = "tel:+919699769021";
    setShowPopup(false);
  };

  // Debounced filtering to avoid updates on every keystroke (100ms)
  const debounceFilter = useCallback(
    (() => {
      let timer = null;
      return (value) =>
        new Promise((resolve) => {
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            const q = (value || "").trim().toLowerCase();
            if (!q) {
              resolve([]);
              return;
            }
            const res = products.filter((p) =>
              p.name.toLowerCase().includes(q)
            );
            resolve(res);
          }, 100);
        });
    })(),
    []
  );

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!searchQuery.trim()) {
        if (mounted) {
          setFilteredProducts([]);
          setActiveIndex(-1);
        }
        return;
      }
      const res = await debounceFilter(searchQuery);
      if (mounted) {
        setFilteredProducts(res);
        setActiveIndex(res.length ? 0 : -1);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [searchQuery, debounceFilter]);

  // Navigate to product (click or keyboard)
  const handleSelectProduct = (productId) => {
    setSearchQuery("");
    setFilteredProducts([]);
    setActiveIndex(-1);
    // navigate to /products and scroll to anchor (Products.jsx must have matching id)
    navigate(`/products#${productId}`);
  };

  // Close dropdown on outside click (attached to document)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setFilteredProducts([]);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Keyboard handling: ArrowUp / ArrowDown / Enter / Escape
  const handleKeyDown = (e) => {
    if (!filteredProducts.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredProducts.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev <= 0 ? filteredProducts.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const chosen = filteredProducts[activeIndex] || filteredProducts[0];
      if (chosen) handleSelectProduct(chosen.id);
    } else if (e.key === "Escape") {
      setFilteredProducts([]);
      setActiveIndex(-1);
    }
  };

  // If user focuses the input and there is a query, ensure suggestions show
  const handleFocus = () => {
    if (searchQuery.trim()) {
      // triggers the effect to show suggestions (they're already set)
      setActiveIndex((prev) => (filteredProducts.length ? Math.max(prev, 0) : -1));
    }
  };

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
            <NavLink to="/" id="home" className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
              Contact
            </NavLink>
          </li>
        </ul>

        {/* ===== Search Box + Contact Supplier ===== */}
        <div className="nav-right">
          <div className="search-box" ref={searchBoxRef}>
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search Products/Services"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              aria-label="Search products"
              autoComplete="off"
            />

            {/* Search suggestions */}
            {filteredProducts.length > 0 && (
              <ul className="search-suggestions" role="listbox" aria-activedescendant={activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined}>
                {filteredProducts.map((p, idx) => (
                  <li
                    id={`suggestion-${idx}`}
                    key={p.id}
                    onMouseDown={(ev) => {
                      // use onMouseDown instead of onClick so it fires before blur/outside events
                      ev.preventDefault();
                      handleSelectProduct(p.id);
                    }}
                    className={idx === activeIndex ? "active-suggestion" : ""}
                    role="option"
                    aria-selected={idx === activeIndex}
                  >
                    {p.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Contact Supplier navigates to Contact.jsx */}
          <div className="contact-supplier">
            <button className="contact-button" onClick={() => navigate("/contact")}>
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
