const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ================= MIDDLEWARES =================
app.use(cors());
app.use(express.json());

// ================= MONGODB CONNECTION =================
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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

// ================= ORDER ROUTE =================
app.post("/api/order", async (req, res) => {
  try {
    console.log("Order Data Received:", req.body);

    const { name, address, quantity, payment, productTitle } = req.body;

    // Validate all fields
    if (!name || !address || !quantity || !payment || !productTitle) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const qty = Number(quantity);
    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ error: "Quantity must be a positive number" });
    }

    const newOrder = new Order({
      name,
      address,
      quantity: qty,
      payment,
      productTitle,
    });

    const savedOrder = await newOrder.save();
    console.log("Order Saved:", savedOrder);

    res.status(200).json({ message: "✅ Order saved successfully!", order: savedOrder });
  } catch (err) {
    console.error("MongoDB Save Error:", err);
    res.status(500).json({ error: "❌ Failed to save order" });
  }
});

// ================= CONTACT ROUTE =================
app.post("/api/contact", async (req, res) => {
  const { fullname, email, message } = req.body;

  if (!fullname || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "mmgruhudyog1@gmail.com",
    subject: `Contact Form Message from ${fullname}`,
    text: `Name: ${fullname}\nEmail: ${email}\nMessage: ${message}`,
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
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
