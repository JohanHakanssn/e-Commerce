// src/components/productcard/ProductCard.tsx
import React, { useState } from "react";
import { useAppDispatch } from "hooks/reduxHooks";
import { addItem } from "slices/cartSlice";
import styles from "./ProductCard.module.css";

interface Product {
  brand: string;
  category: string;
  description: string;
  gender: string;
  id: string;
  images: string[];
  name: string;
  price: number;
}

const ProductCard = ({ product }: { product: Product }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const dispatch = useAppDispatch();

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity: 1,
    };

    dispatch(addItem(cartItem));
    alert(`${product.name} (Size: ${selectedSize}) added to cart`);
  };

  return (
    <div className={styles["product-card"]}>
      <img src={product.images[0]} alt={product.name} />
      <div className={styles["product-info"]}>
        <h1>{product.name}</h1>
        <p>{product.price}$</p>
      </div>
      <div className={styles["product-description"]}>
        <p>{product.description}</p>
        <div className={styles["CardButtonWrapper"]}>
          <button
            className={styles["add-to-cart-button"]}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <div className={styles["size-selector"]}>
            <select value={selectedSize} onChange={handleSizeChange}>
              <option value="" disabled>
                Select size
              </option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
