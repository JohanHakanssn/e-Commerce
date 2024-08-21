import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "services/firebase";
import ProductCard from "../../components/productcard/ProductCard";
import styles from "./products.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1 className={styles.HiddenLogo}>SKJN Store</h1>
      <div className={styles.wraper}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Products;
