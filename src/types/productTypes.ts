import { Timestamp } from "@firebase/firestore-types";



export type IDType = string;
export type NameType = string;
export type DscType = string;
export type BrandType = string;
export type PriceType = string;
export type GenderType = string;
export type GendersType = GenderType[];
export type CategoryType = string;
export type CategoriesType = CategoryType[];
export type SizeType = string;
export type SizesType = SizeType[];
export type ImageType = string;
export type ImagesType = ImageType[];
export type ProductAddedType = Timestamp;
export type Size = { [key: string]: string };
export type Stock = { [key: string]: string };
export type StockSizeType = {
	size: string;
	stock: string;
	[key: string]: string;
};
export type StockSizesType = StockSizeType[];
export type StockSizeNumberType = { [key: string]: number };
export type StockSizesNumberType = StockSizeNumberType[];
export type StockSizeStringType = { [key: string]: string };
export type StockSizesStringType = StockSizeStringType[];
export type StockSizeState = StockSizesType;

export interface NewProduct {
	name: NameType;
	description: DscType;
	brand: BrandType;
	price: PriceType;
	gender: GenderType;
	category: CategoryType;
}
export type NewProductState = NewProduct | undefined;

export interface ProductType {
	id: IDType;
	name: NameType;
	description: DscType;
	brand: BrandType;
	price: PriceType;
	gender: GenderType;
	category: CategoryType;
	stock: StockSizesType;
	images: ProductImages;
	productAdded: ProductAddedType;
	[key: string]: IDType | NameType | DscType | BrandType | PriceType | GenderType | CategoryType | StockSizesType | ProductImages | ProductAddedType;
}

export interface UpdateState {
	productState: NewProductState;
	documentData: DocumentData;
	images: ProductImages;
	stock: StockSizeState;
}

export interface ProductUpdate {
	id: IDType;
	name: NameType;
	description: DscType;
	brand: BrandType;
	price: PriceType;
	gender: GenderType;
	category: CategoryType;
	stock: StockSizesType;
	images: ImagesType;
	productAdded: ProductAddedType;

}

export type DocumentDataState = DocumentData | undefined;
export interface DocumentData {
	id: IDType;
	productAdded: ProductAddedType;
}
export type DocumentId = IDType;

export interface InitialProductState {
	name: NameType;
	description: DscType;
	brand: BrandType;
	price: PriceType;
	gender: GenderType;
	category: CategoryType;
	sizes: SizesType;
	stock: StockSizesType;
}
export interface SaveProduct {
	name: string;
	description: string;
	brand: string;
	price: string;
	category: string;
	gender: string;
	stock: StockSizesType;
	images: ImagesType;
}




export type Errors = { [key: string]: string };
export type Touched = { [key: string]: boolean };
export type SelectedFiles = Array<File>;
export type ProductImages = Array<File | string>;













