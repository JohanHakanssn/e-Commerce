import styles from './GetAllProducts.module.css';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'services/firebase';
import { useQuery } from '@tanstack/react-query';
import ProductCard from 'components/productcard/ProductCard';

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

// Hämta produkterna från db baserat på kategori
export const GetProducts = async (category?: string): Promise<Product[]> => {
	let productQuery;
	if (category) {
		productQuery = query(
			collection(db, 'products'),
			where('category', '==', category)
		);
	} else {
		productQuery = query(collection(db, 'products'));
	}
	const querySnapshot = await getDocs(productQuery);
	const products: Product[] = [];
	querySnapshot.forEach((doc) => {
		products.push({ id: doc.id, ...doc.data() } as Product);
	});
	return products;
};

const Page = (props: string) => {
	const category = `${props}`; // Specificera kategorin här
	const { data, error, isLoading } = useQuery<Product[]>({
		queryKey: ['products', category],
		queryFn: () => GetProducts(category),
	});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {(error as Error).message}</div>;

	return (
		<div>
			<div className={styles.wraper}>
				{data.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default Page;
