import React, { useState } from "react";
import Header from "./Header";
import "./style.css";
import "./contact.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Contact = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!fullname.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: "error", text: "Please fill all fields." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, message }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus({ type: "success", text: "Message sent. Thank you!" });
        setFullname("");
        setEmail("");
        setMessage("");
      } else {
        setStatus({ type: "error", text: data.error || "Failed to send message." });
      }
    } catch (err) {
      setStatus({ type: "error", text: "Network error. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <section className="contact-section">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>We would love to hear from you! Reach out to us anytime.</p>
          <div className="info-box">
            <h4>📍 Address</h4>
            <p>Ichalkaranji, <br /> Hathkaanangle, Kolhapur, 416109</p>
          </div>
          <div className="info-box">
            <h4>📞 Phone</h4>
            <p>+91 9699769021</p>
          </div>
          <div className="info-box">
            <h4>📧 Email</h4>
            <p>mmgruhudyog1@gmail.com</p>
          </div>
        </div>

        <div className="contact-form">
          <h3>Send Message</h3>
          {status && <div className={`form-status ${status.type}`}>{status.text}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              disabled={loading}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
            <textarea
              name="message"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </section>

      <section className="map-section">
        <h3>Find Us on Map</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.1862364382816!2d74.45612131527495!3d16.68862108806154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc0e265ba450af7%3A0x671b0ba88c556c2!2sIchalkaranji%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1705965712345!5m2!1sen!2sin"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Company Location"
        />
      </section>

      <footer>
        <p>&copy; 2025 Mahadwar Mahila Gruhudyog. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;
