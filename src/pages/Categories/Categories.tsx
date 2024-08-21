import { Link } from 'react-router-dom';
import styles from './categories.module.css';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from 'services/firebase';
import { useQuery } from '@tanstack/react-query';

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

// Hämta produkterna från db
export const GetProducts = async (): Promise<Product[]> => {
	const productQuery = query(collection(db, 'products'));
	const querySnapshot = await getDocs(productQuery);
	const products: Product[] = [];
	querySnapshot.forEach((doc) => {
		products.push({ id: doc.id, ...doc.data() } as Product);
	});
	return products;
};

const groupByCategory = (products: Product[]): { [key: string]: Product } => {
	return products.reduce((acc, product) => {
		if (!acc[product.category]) {
			acc[product.category] = product;
		}
		return acc;
	}, {} as { [key: string]: Product });
};

const Categories = () => {
	// Hämta produkterna
	const fetchProduct = async (): Promise<Product[]> => {
		const product = await GetProducts();
		return product;
	};

	const { data, error, isLoading } = useQuery<Product[]>({
		queryKey: ['product'],
		queryFn: fetchProduct,
	});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {(error as Error).message}</div>;

	const productsByCategory = data ? groupByCategory(data) : {};
	const productsToDisplay = Object.values(productsByCategory);

	return (
		<div>
			<h1 className={styles.HiddenLogo}>SKJN Store</h1>
			<div className={styles.wraper}>
				{productsToDisplay.map((product) => (
					<div className={styles.imageCard} key={product.id}>
						<Link to={`/${product.category}`}>
							<img
								className={styles.images}
								src={product.images[1]}
								alt={product.name}
								style={{ maxWidth: '200px' }}
							/>
						</Link>
						<p>{product.category}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Categories;
