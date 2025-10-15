import React, { useState } from "react";
import Header from "./Header";
import "./style.css";
import "./about.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const AboutUs = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const mobileNumber = "+919876543210";

  return (
    <div>
      {/* ===== HEADER & NAVBAR ===== */}
      <Header popupVisible={popupVisible} setPopupVisible={setPopupVisible} />

      {/* ===== ABOUT US SECTION ===== */}
      <section className="about-premium" id="about">
        <div className="about-overlay"></div>
        <div className="about-inner">
          {/* Heading */}
          <div className="about-header">
            <h2>About Us</h2>
            <p>Crafting Authentic Taste with Love & Tradition</p>
          </div>

          {/* Content */}
          <div className="about-body">
            <div className="about-left">
              <h3>Who We Are</h3>
              <p>
                <strong>Mahadwar Mahila Gruh Udyog</strong> is more than just a brand – 
                it’s a movement driven by women entrepreneurs of Maharashtra. 
                We bring you <em>homemade sweets & snacks</em> that carry the warmth of tradition, 
                the assurance of purity, and the flavor of love. 
              </p>

              <h3>Our Promise</h3>
              <ul className="about-list">
                <li><i className="fa-solid fa-check"></i> 100% Authentic & Hygienic Products</li>
                <li><i className="fa-solid fa-check"></i> Empowering Women Entrepreneurs</li>
                <li><i className="fa-solid fa-check"></i> Preserving Traditional Taste</li>
              </ul>
            </div>

            {/* Image / Illustration */}
            <div className="about-right">
              <div className="about-card">
                <img src="./images/about-us.jpg" alt="Mahadwar Mahila Gruh Udyog" />
                <div className="about-card-text">
                  <h4>15+ Years of Trust</h4>
                  <p>Delivering sweetness & smiles across India.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="about-stats">
            <div className="stat-box">
              <i className="fa-solid fa-user-group"></i>
              <h3>5000+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-box">
              <i className="fa-solid fa-box"></i>
              <h3>50+</h3>
              <p>Authentic Products</p>
            </div>
            <div className="stat-box">
              <i className="fa-solid fa-hand-holding-heart"></i>
              <h3>100%</h3>
              <p>Homemade & Pure</p>
            </div>
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

export default AboutUs;
