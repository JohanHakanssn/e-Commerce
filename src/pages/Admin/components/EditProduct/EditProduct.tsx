import { useState, useMemo, useEffect } from "react";
import ProductForm from "../ProductForm/ProductForm";
import ImageUpload from "../ImageUpload/ImageUpload";
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { db, storage } from "services/firebase";
import { collection, doc, setDoc, serverTimestamp, updateDoc, deleteDoc} from "firebase/firestore";
import styles from "./product.module.css"
import { useValidateProduct } from "hooks/useValidateProduct";
import { Touched, GendersType, GenderType, CategoriesType, CategoryType, SizesType, StockSizeType, NewProduct,  NewProductState, StockSizeState, DocumentData, ProductImages, SaveProduct } from "types/productTypes";
import { toast } from "react-toastify";
import { useAppSelector } from "hooks/reduxHooks";
import { RootState } from "store/store";
import Modal from "../Modal/Modal";

type EditProductProps = {
	productState?: NewProduct;
	documentDataState?: DocumentData;
	imagesState?: ProductImages;
	stockSizeState?: StockSizeState;
	setSelectedProduct?: React.Dispatch<React.SetStateAction<string | number>>;
	resetUpdateState: () => void;
};
interface IsModalsOpen {
	deleteProduct: boolean;
	resetProduct: boolean;
	saveProduct: boolean;
}

function EditProduct({productState, documentDataState, imagesState, stockSizeState, setSelectedProduct, resetUpdateState}: EditProductProps) {
	const memoCategories = useMemo(
		() => (state: RootState) => state.utils.categories,
		[]
	);
	const memoGenders = useMemo(
		() => (state: RootState) => state.utils.genders,
		[]
	);
	const memoSizes = useMemo(
		() => (state: RootState) => state.utils.sizes,
		[]
	);
	const categories = useAppSelector(memoCategories) as CategoriesType;
	const genders = useAppSelector(memoGenders) as GendersType;
	const allSizes = useAppSelector(memoSizes);
	const getSizes = (category: CategoryType, gender: GenderType): SizesType => {
		// Returnerar rätt storlekar beroende på kategori och kön
		if (category === "Hats" || category === "Bags") {
			return allSizes.Accessories[category];
		} else if (category === "Shoes") {
			return allSizes.Shoes[gender];
		}
		return allSizes.Clothes[category];
	};
	const createInitialState = () => {
		const newState: NewProductState = {
			name: "",
			description: "",
			brand: "",
			price: "",
			gender: genders[0],
			category: categories[0],
		};
		return newState;
	};
	const createStockState = () => {
		const sizes: SizesType = getSizes(categories[0], genders[0]);
		const stock: StockSizeState = sizes.map(
			(size): StockSizeType => {
				return { size: size, stock: "0" };
			}
		);
		return [...stock];
	};
	const [product, setProduct] = useState<NewProduct>(productState || createInitialState()); // All produktdata som matas in
	const [documentData, setDocumentData] = useState<DocumentData | undefined>(documentDataState || undefined);	// document id, datum för skapande
	const [stockSizes, setStockSizes] = useState<StockSizeState>(stockSizeState || [...createStockState()]); // Storlekar med lagersaldo
	const [images, setImages] = useState<ProductImages | []>(imagesState || []); // Lista med bilder
	const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);	// Eventuella bildre som ska raderas från storage när dokumentet sparas
	const [fileLimit, setFileLimit] = useState<boolean>(false);
	const [touched, setTouched] = useState<Touched>({}); // Följer vilka fält som användare interagerat med
	const [modalOpen, setModalOpen] = useState<IsModalsOpen>({ deleteProduct: false, saveProduct: false, resetProduct: false }); // Modaler
	// Hanterar visandet av modaler
	const handleShowModals = (modal: string) => {
		setModalOpen((modals) => { return { ...modals, [modal]: true } });
	}
	// Hanterar stängandet av modaler
	const handleCloseModals = (modal: string) => {
		setModalOpen((modals) => { return { ...modals, [modal]: false } });
	}
	// Validerar produktdatan
	const { errors, isValid } = useValidateProduct(
		product,
		stockSizes,
		categories,
		genders
	);
	// Kategorialternativ
	const categoriesOptions: React.ReactNode[] = categories.map(
		(cat: CategoryType) => {
			return (
				<option key={cat} value={cat}>
					{cat}
				</option>
			);
		}
	);
	// Könsalternativ
	const genderOptions: React.ReactNode[] = genders.map((gen: GenderType) => {
		return (
			<option value={gen} key={gen}>
				{gen}
			</option>
		);
	});
	// Laddar upp bilder till storage
	async function uploadToStorage() {
		const newImagesUrls: string[] = []
		try {
			for (const img of images) {
				if (img instanceof File) {
					// Skapar en referens för fil
					const fileRef = ref(storage, `productImgs/${img.name}`);
					// Sparar fil till storage
					await uploadBytes(fileRef, img);
					// Hämtar url till den sparade filen
					const downloadURL = await getDownloadURL(fileRef);
					// pushar url till array
					newImagesUrls.push(downloadURL);
				} else {
					// Om det inte är en fil är bilder redan sparad i storage, lägger till urlen.
					newImagesUrls.push(img);
				}
			}
			// Om det finns bilder i listan
			if (imagesToDelete.length > 0) {
				for (const url of imagesToDelete) {
					// Skapar en referens från bildens url
					const storageRef = ref(storage, url);
					// Tar bort bilden från storage
					await deleteObject(storageRef);
				}
			}
			// Returnerar lista aktuella urler till bilderna
			return newImagesUrls;
		} catch (error) {
			console.log("error, saving to storage")
			return null;
		}
	}
	async function deleteProduct() {
		handleCloseModals("deleteProduct");
		// Finns inget id, är det inte en sparad produkt
		if (!documentData) {
			return;
		}
		try {
			// Finns imagestate är det ett existerande dokument
			if (imagesState) {
				// Går igenom listan med bilder
				for (const url of images) {
					// Är det en fil, return
					if (url instanceof File){
						return null
					} else {
						// Annars skapa en referens från bild url:en
						const storageRef = ref(storage, url);
						// Ta bort bild från storage
						await deleteObject(storageRef);
					}
				}
			}
			// Efter att bilderna är raderade från storage, ta bort dokumentet från firestore
			await toast.promise(deleteDoc(doc(db, "products", documentData.id)), { pending: "Deleting product from database", success: "Product successfully deleted", error: "An error occurred when trying to delete product" });
			// Återställ state
			resetUpdateState();
		} catch (error) {
			console.error("Error deleting images", error);
		}
	}
	async function handleSubmit() {
		// Stänger modal
		handleCloseModals("saveProduct");
		// Sparar bilder till storage och returnerar lista med url:er
		const imageUrls = await uploadToStorage();
		// Kontrollerar att bilderna sparats
		if (!imageUrls) {
			return;
		}
		// Skapar ett nytt objekt för produktdatan
		const newProduct: SaveProduct = {
			name: product.name,
			description: product.description,
			brand: product.brand,
			price: product.price,
			gender: product.gender,
			category: product.category,
			stock: [...stockSizes],
			images: [...imageUrls],
		};
		// Om documentDataState finns, då är det en befintlig produkt som ska uppdateras
		if (documentDataState && setSelectedProduct) {
			try {
				// Skapar en referens till dokumentet i firestore
				const docRef = doc(db, "products", documentDataState.id);
				// Uppdaterar dokument
				await toast.promise(updateDoc(docRef, { ...newProduct, updatedAt: serverTimestamp() }), { pending: "Updating product in database", success: "Product successfully updated", error: "An error occurred when updating product."});
				// Återställer state för produktdata
				resetUpdateState();
			} catch (error) {
				console.error("Error updating product, ", error);
			}
		} else {
			// Om documentDataState inte finns, då är det en ny produkt som ska sparas
			try {
				// Skapar en referens till ett nytt dokument, detta ger också ett genererat unikt id
				const docRef = doc(collection(db, "products"));
				// Spara dokumentet till firestore med produktdata, genererat id och tid för skapande
				await toast.promise(setDoc(docRef, { ...newProduct, id: docRef.id, productAdded: serverTimestamp() }), { pending: "Adding new product to database", success: "Product successfully saved", error: "An error occurred when saving product" });
				// Återställer state för produktdata
				resetProduct();
			} catch (error) {
				console.error("Error saving product", error);
			}
		}		
	}
	const resetProduct = () => {
		handleCloseModals("resetProduct");
		setTouched({});
		setImages([]);
		setImagesToDelete([]);
		setProduct(createInitialState());
		setStockSizes(createStockState());
		setFileLimit(false);
	}
	useEffect(() => {
		// Om dessa variabler finns då är det data för ett existerande dokument som ska uppdateras
		if (documentDataState) {
			setDocumentData(documentDataState);
		}
		if (productState) {
			setProduct(productState);
		}
		if (imagesState) {
			setImages(imagesState);
		}
		if (stockSizeState) {
			setStockSizes(stockSizeState);
		}
	}, [documentDataState, productState, imagesState, stockSizeState])
	return (
		<section className={styles.productSection}>
			<section className={styles.inputSection}>
				{product && stockSizes && categories && genders && (
					<ProductForm
						product={product}
						setProduct={setProduct}
						touched={touched}
						setTouched={setTouched}
						errors={errors}
						categories={categoriesOptions}
						genders={genderOptions}
						getSizes={getSizes}
						stockSizes={stockSizes}
						setStockSizes={setStockSizes}
					/>
				)}
				{images && (
					<ImageUpload
						fileLimit={fileLimit}
						setFileLimit={setFileLimit}
						images={images}
						setImages={setImages}
						imagesToDelete={imagesToDelete}
						setImagesToDelete={setImagesToDelete}
					/>
				)}
			</section>
			<button
				type="button"
				disabled={!isValid || images.length === 0}
				onClick={() => handleShowModals("saveProduct")}
				className={styles.submitButton}
			>
				{productState ? "Update product" : "Add new product"}
			</button>
			{!productState && (
				<button
					type="button"
					className={styles.submitButton}
					onClick={() => handleShowModals("resetProduct")}
				>
					Reset
				</button>
			)}
			{productState && (
				<button
					type="button"
					className={styles.deleteButton}
					onClick={() => handleShowModals("deleteProduct")}
				>
					Delete product
				</button>
			)}
			<Modal
				isOpen={modalOpen["saveProduct"]}
				onConfirm={() => handleSubmit()}
				onCancel={() => handleCloseModals("saveProduct")}
				question={productState ? "Update product?" : "Save product?"}
			/>
			<Modal
				isOpen={modalOpen["deleteProduct"]}
				onConfirm={() => deleteProduct()}
				onCancel={() => handleCloseModals("deleteProduct")}
				question="Delete product?"
			/>
			<Modal
				isOpen={modalOpen["resetProduct"]}
				onConfirm={resetProduct}
				onCancel={() => handleCloseModals("resetProduct")}
				question="Reset product?"
			/>
		</section>
	);
}

export default EditProduct