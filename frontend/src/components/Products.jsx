import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "./Header";
import "./products.css";
import "./style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Products = () => {
  const location = useLocation();

  // ✅ Save selected product details
  const handleBuyClick = (productName, price, img) => {
    localStorage.setItem("selectedProduct", productName);
    localStorage.setItem("selectedPrice", price);
    localStorage.setItem("selectedImage", img);
  };

  // ✅ Scroll to product if hash is present
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.classList.add("highlight");
          setTimeout(() => element.classList.remove("highlight"), 2000);
        }, 300);
      }
    }
  }, [location]);

  const productsData = [
    {
      category: "Sweets",
      items: [
        { id: "delicious-ladoo", title: "Delicious Ladoo", desc: "Soft & fresh laddoos made with ghee & dry fruits.", img: "./images/sweets/bundi ladu.jpg", price: "₹250/kg" },
        { id: "kaju-katli", title: "Kaju Katli", desc: "Rich cashew sweet for special occasions.", img: "./images/sweets/kajukatli.jpg", price: "₹600/kg" },
        { id: "sonpapdi", title: "Sonpapdi", desc: "Traditional besan sonpapdi.", img: "./images/sweets/sonpapdi.jpg", price: "₹300/kg" },
        { id: "jalebi", title: "Jalebi", desc: "Delicate orange-hued Jalebi.", img: "./images/sweets/galebi.jpg", price: "₹200/kg" },
        { id: "mahisurpak", title: "Mahisurpak", desc: "Flaky, sweet, and melt-in-mouth mahisurpak.", img: "./images/sweets/mahisurpak.jpg", price: "₹350/kg" },
        { id: "karanji", title: "Karanji", desc: "Assorted Karanji.", img: "./images/sweets/karanji.jpg", price: "₹400/kg" },
        { id: "barfi", title: "Barfi", desc: "Traditional milk-based barfi, creamy and soft.", img: "./images/sweets/barfi.jpg", price: "₹320/kg" },
        { id: "gulab-jamun", title: "Gulab Jamun", desc: "Classic syrupy sweet dessert made with love.", img: "./images/sweets/gulabjam.jpg", price: "₹280/kg" },
        { id: "rasgulla", title: "Rasgulla", desc: "Soft and spongy cheese-based sweet in syrup.", img: "./images/sweets/rasgulla.jpg", price: "₹300/kg" },
        { id: "sweets-combo", title: "Sweets Combo", desc: "Sweets combo every type of sweet.", img: "./images/sweets/sweets combo.jpg", price: "₹900/box" },
      ],
    },
    {
      category: "Namkeen",
      items: [
        { id: "spicy-chivda", title: "Spicy Chivda", desc: "Perfectly spiced for tea-time snacking.", img: "./images/namkeens/spicy chivda.jpg", price: "₹180/kg" },
        { id: "farsan", title: "Farsan", desc: "Mixed farsan with balanced spices.", img: "./images/namkeens/farsan.jpg", price: "₹200/kg" },
        { id: "spiced-peanuts", title: "Spiced Peanuts", desc: "Crispy peanuts with mild spices.", img: "./images/namkeens/spicy pinutes.jpg", price: "₹220/kg" },
        { id: "kharibundi", title: "Kharibundi", desc: "Classic kharibundi crunchy snack.", img: "./images/namkeens/kharibundi.jpg", price: "₹150/kg" },
        { id: "papdi", title: "Papdi", desc: "Traditional South Indian papdi.", img: "./images/namkeens/papdi.jpg", price: "₹170/kg" },
        { id: "white-chivda", title: "White Chivda", desc: "Crunchy fried mixture for snack lovers.", img: "./images/namkeens/white chivda.jpg", price: "₹160/kg" },
        { id: "normal-shev", title: "Normal Shev", desc: "Small crunchy normal shev.", img: "./images/namkeens/normal shev.jpg", price: "₹150/kg" },
        { id: "shev", title: "Shev", desc: "Thick crispy, crunchy shev.", img: "./images/namkeens/shev.jpg", price: "₹180/kg" },
        { id: "salty-peanuts", title: "Salty Peanuts", desc: "Crispy salty peanuts.", img: "./images/namkeens/salty pinutes.jpg", price: "₹200/kg" },
        { id: "snack-combo", title: "Snack Combo", desc: "Snacks combo variety of namkeens.", img: "./images/namkeens/snacks combo.jpg", price: "₹700/box" },
      ],
    },
  ];

  return (
    <div>
      <Header />

      <section className="products-preview" id="products">

        {/* SWEETS */}
        <h3 className="category-title">Sweets</h3>
        <div className="product-grid">
          {productsData[0].items.map((item) => (
            <div className="product-card" key={item.id}>
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <p className="price">{item.price}</p>

              {/* ✅ Correct Buy Now Link */}
              <Link
                to="/buynow"
                onClick={() => handleBuyClick(item.title, item.price, item.img)}
                className="buy-now-btn"
              >
                Buy Now
              </Link>
            </div>
          ))}
        </div>

        {/* NAMKEEN */}
        <h3 className="category-title">Namkeen</h3>
        <div className="product-grid">
          {productsData[1].items.map((item) => (
            <div className="product-card" key={item.id}>
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <p className="price">{item.price}</p>

              {/* ✅ Correct Buy Now Link */}
              <Link
                to="/buynow"
                onClick={() => handleBuyClick(item.title, item.price, item.img)}
                className="buy-now-btn"
              >
                Buy Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>&copy; 2025 Mahadwar Mahila Gruhudyog. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Products;
