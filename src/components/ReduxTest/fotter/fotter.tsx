import React, { useState } from "react";
import styles from "./fotter.module.css";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    openModal();
  };

  return (
    <footer className={styles.footer}>
      <div className={styles["footer-links"]}>
        <a href="/about">About Us</a>
        <a href="/contact">Contact Us</a>
        <a href="/shipping">Shipping Information</a>
        <a href="/returns">Return Policy</a>
        <a href="/faq">FAQs</a>
        <a href="/privacy">Privacy Policy</a>
        <Link className={styles.link} to="/admin">
          Admin
        </Link>
      </div>
      <div className={styles["contact-info"]}>
        <p>123 Main Street, City, Country</p>
        <p>Phone: 123-456-7890</p>
        <p>Email: info@SKJN_Store.com</p>
      </div>
      <div className={styles["social-media"]}>
        <a href="https://www.facebook.com/SKJN Store">Facebook</a>
        <a href="https://twitter.com/SKJN Store">Twitter</a>
        <a href="https://www.instagram.com/SKJN Store">Instagram</a>
      </div>
      <div className={styles.newsletter}>
        <h3>Subscribe to our Newsletter</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <div className={styles.copyright}>
        <p>&copy; 2024 E-commerce Website SKJN Store. All rights reserved.</p>
      </div>

      {modalIsOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Subscription Successful</h2>
            <p>You have successfully subscribed to our newsletter!</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
