import { db } from "services/firebase";
import { collection, query, onSnapshot} from "firebase/firestore";
import { useState, useEffect, useMemo } from "react";
import { ProductType, DocumentData, StockSizeState, ProductImages, NewProduct } from "src/types/productTypes";
import { useAppSelector } from "hooks/reduxHooks";
import { RootState } from "store/store";
import EditProduct from "pages/Admin/components/EditProduct/EditProduct";
import styles from "./update-product.module.css";


function UpdateProduct() {
	const memoCategories = useMemo(
		() => (state: RootState) => state.utils.categories,
		[]
	);
	const categories = useAppSelector(memoCategories);
	const [allProducts, setAllProducts] = useState<ProductType[]>([]);
	const [productsList, setProductsList] = useState<React.ReactNode[]>([]);
	const [selectedProduct, setSelectedProduct] = useState<number | string>("Select Product");
	const [productState, setProductState] = useState<NewProduct>();
	const [documentData, setDocumentData] = useState<DocumentData>();
	const [images, setImages] = useState<ProductImages>();
	const [stockSizeState, setStockSizeState] = useState<StockSizeState>();
	const resetUpdateState = () => {
		setProductState(undefined);
		setDocumentData(undefined);
		setImages(undefined);
		setStockSizeState(undefined);
		setSelectedProduct("Select product");
	}
	// Hanterar val av produkt
	const handleSelectedProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedProduct(e.target.value);
		// Kontrollerar att valt värde är en produkt
		if (e.target.value === "" || e.target.value === "Select Product") {
			return;
		}
		// Vald produkts index
		const index: number = Number(e.target.value);
		// Definierar ett objekt med vald produkt
		const doc = allProducts[index];
		// Skapar ett produktobjekt med den valda produktens värden
		const productState: NewProduct = {
			name: doc.name,
			description: doc.description,
			brand: doc.brand,
			price: doc.price,
			gender: doc.gender,
			category: doc.category,
		}
		// Skapar ett objekt med id och productAdded
		const documentData: DocumentData = {
			id: doc.id,
			productAdded: doc.productAdded
		}
		// Skapar en array med produktbilder
		const images: ProductImages = doc.images;
		// Skapar en array med produktens storlekar och lagersaldo
		const stock: StockSizeState = doc.stock;
		setProductState(productState);
		setDocumentData(documentData);
		setImages(images);
		setStockSizeState(stock);
	}

	useEffect(() => {
		// Skapar lista med alla produkter.
		const sortedProductsList: React.ReactNode[] = [];
		// Itererar igenom listan med kategorier
		categories.forEach((cat) => {
			sortedProductsList.push(<option key={cat} value="">---&nbsp;{cat}&nbsp;---</option>);
			// För varje kategori, lägg in alla produkter som matchar kategorin
			const catItems = allProducts.map((item, index) => {
				if (item.category == cat) {
					return (<option key={item.name} value={index}>{item.name}</option>);
				}
			})
			sortedProductsList.push(catItems);
		})
		setProductsList(sortedProductsList)
	}, [allProducts, categories])
	useEffect(() => {
		const q = query(collection(db, "products"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const products: ProductType[] = [];
			querySnapshot.forEach((doc) => {
				const productItem = doc.data() as ProductType
				products.push(productItem);
			})
			setAllProducts(() => products);
		});
		return () => unsubscribe();
	}, [])
	return (
		<section>
			<h4 className={styles.h4}>Update Product</h4>
			{productsList.length > 0 && (
				<select
					value={selectedProduct}
					onChange={(e) => handleSelectedProduct(e)}
					className={styles.selectProduct}
				>
					<option value="Select Product">Select Product</option>
					{productsList.length > 0 && productsList}
				</select>
			)}
			{productState && productState.name && (
				<p className={styles.selectedProductName}>
					{productState.name}
				</p>
			)}
			{productState && documentData && images && stockSizeState && (
				<EditProduct
					productState={productState}
					documentDataState={documentData}
					imagesState={images}
					stockSizeState={stockSizeState}
					setSelectedProduct={setSelectedProduct}
					resetUpdateState={resetUpdateState}
				/>
			)}
		</section>
	);
}

export default UpdateProduct;
