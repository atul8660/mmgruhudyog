import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./buyNow.css";

const BuyNow = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [form, setForm] = useState({
    name: "",
    address: "",
    quantity: 1,
    payment: "Cash on Delivery",
  });

  // ✅ Load selected product from localStorage
  useEffect(() => {
    const selectedProduct = localStorage.getItem("selectedProduct");
    const selectedPrice = localStorage.getItem("selectedPrice");
    const selectedImage = localStorage.getItem("selectedImage");

    if (selectedProduct && selectedPrice) {
      setProduct({
        name: selectedProduct,
        price: selectedPrice,
        img: selectedImage,
      });
    } else {
      alert("❌ No product selected. Please select a product first.");
      navigate("/products");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ✅ Send order to backend
// ✅ Send order to backend
  const handleConfirm = async (e) => {
    e.preventDefault();

    if (!product.name) {
      alert("❌ No product selected.");
      return;
    }

    const orderData = {
      name: form.name,
      address: form.address,
      quantity: Number(form.quantity),
      payment: form.payment,
      productTitle: product.name,
    };

    // --- CHANGE 1: Get the API URL from environment variables ---
    const API_URL = import.meta.env.VITE_API_URL;

    console.log("Order Data:", orderData);

    try {
      // --- CHANGE 2: Use the API_URL variable in the fetch call ---
      const response = await fetch(`${API_URL}/api/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(
          `✅ ${data.message}\n\nProduct: ${product.name}\nQuantity: ${form.quantity} kg`
        );
        navigate("/products");
      } else {
        alert(`❌ ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Unable to connect to server.");
    }
  };

  const handleCancel = () => {
    navigate("/products");
  };

  return (
    <div>
      <Header />
      <div className="buy-container">
        <h2>Confirm Your Order</h2>
        <div className="buy-details">
          <img src={product.img} alt={product.name} className="buy-img" />
          <div>
            <h3>{product.name}</h3>
            <p className="price">{product.price}</p>
          </div>
        </div>

        <form className="buy-form" onSubmit={handleConfirm}>
          <label>Your Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Delivery Address:</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          ></textarea>

          <label>Quantity (in kg):</label>
          <input
            type="number"
            name="quantity"
            min="1"
            value={form.quantity}
            onChange={handleChange}
            required
          />

          <label>Payment Method:</label>
          <select name="payment" value={form.payment} onChange={handleChange}>
            <option>Cash on Delivery</option>
            <option>Online Payment</option>
          </select>

          <div className="btn-group">
            <button type="submit" className="confirm-btn">
              Confirm Order
            </button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyNow;
