const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Resend } = require('resend'); // Import Resend
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ================= MIDDLEWARES =================
app.use(cors());
app.use(express.json());

// ================= MONGODB CONNECTION =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected (Atlas)"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ================= ORDER MODEL =================
const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  quantity: { type: Number, required: true },
  payment: { type: String, required: true },
  productTitle: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

// ================= ORDER ROUTE (WITH EMAIL NOTIFICATION) =================
app.post("/api/order", async (req, res) => {
  try {
    console.log("Order Data Received:", req.body);
    const { name, address, quantity, payment, productTitle } = req.body;

    if (!name || !address || !quantity || !payment || !productTitle) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const qty = Number(quantity);
    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ error: "Quantity must be a positive number" });
    }

    const newOrder = new Order({ name, address, quantity: qty, payment, productTitle });
    const savedOrder = await newOrder.save();
    console.log("Order Saved:", savedOrder);

    // --- START: SEND EMAIL NOTIFICATION TO OWNER ---
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'mmgruhudyog1@gmail.com', // Your email address to receive order notifications
        subject: `New Order Received: ${productTitle}`,
        html: `<h1>You have a new order!</h1>
               <p><strong>Product:</strong> ${productTitle}</p>
               <p><strong>Quantity:</strong> ${quantity} kg</p>
               <p><strong>Customer Name:</strong> ${name}</p>
               <p><strong>Delivery Address:</strong> ${address}</p>
               <p><strong>Payment Method:</strong> ${payment}</p>`
    });
    // --- END: SEND EMAIL NOTIFICATION TO OWNER ---

    res.status(200).json({ message: "✅ Order saved successfully!", order: savedOrder });
  } catch (err) {
    console.error("Order Route Error:", err);
    res.status(500).json({ error: "❌ Failed to process order" });
  }
});

// ================= CONTACT ROUTE (Updated for Resend) =================
app.post("/api/contact", async (req, res) => {
  const { fullname, email, message } = req.body;
  const resend = new Resend(process.env.RESEND_API_KEY);

  if (!fullname || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'mmgruhudyog1@gmail.com',
      subject: `Contact Form Message from ${fullname}`,
      html: `<p>Name: ${fullname}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
      reply_to: email,
    });
    res.status(200).json({ message: "Message sent successfully ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send message ❌" });
  }
});


// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});