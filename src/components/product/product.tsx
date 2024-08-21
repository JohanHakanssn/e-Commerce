import React, { useEffect, useState } from 'react';
import { db } from 'services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from '../productcard/ProductCard';
import styles from './Productt.module.css';

const Products = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const querySnapshot = await getDocs(collection(db, 'products'));
			const productsList = querySnapshot.docs.map((doc) => doc.data());
			setProducts(productsList);
		};

		fetchProducts();
	}, []);

	return (
		<div className={styles.wraper}>
			{products.map((product, index) => (
				<ProductCard key={index} product={product} />
			))}
		</div>
	);
};

export default Products;
