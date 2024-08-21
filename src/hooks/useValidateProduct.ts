import { useState, useEffect } from "react";
import { Errors, NewProductState, StockSizeState } from "types/productTypes";


// RegExp, validerar pris, godkänt format är 0 men ej t.ex. 01, heltal eller 2 decimaler.
const priceReg = new RegExp("^[1-9][0-9]*(?:[.][0-9][0-9]|$)$");
// RegExp, validerar antal, godkänt format är 0 men ej 01, annars tal som börjar på 1-9, endast heltal.
const quantityReg = new RegExp("^([1-9][0-9]*)|([0])$");

export const useValidateProduct = (product: NewProductState, stockSizes: StockSizeState, categories: string[], genders: string[]) => {
	const [errors, setErrors] = useState<Errors>({});
	const [isValid, setIsValid] = useState<boolean>(false);
	useEffect(() => {
		const validate = (product: NewProductState, stockSizes: StockSizeState): {[key: string]: string} => {
			if (!product) {
				return {};
			}
			const newErrors: {[key:string]: string} = {};
				
			if (product.name.length < 3) {
				newErrors.name = "Please enter a longer product name";
			}
			if (product.description.length < 10) {
				newErrors.description =
					"Please enter a longer product description";
			}
			if (product.brand.length < 1) {
				newErrors.brand = "Please enter a product brand";
			}
			if (!priceReg.test(product.price)) {
				newErrors.price =
					"Please enter a valid price, 1, 1.11, 0,11 are acceptable formats";
			}
			if (!genders.includes(product.gender)) {
				newErrors.gender = "Please enter valid gender category";
			}
			if (!categories.includes(product.category)) {
				newErrors.category = "Please enter a valid product category";
			}
			stockSizes.forEach((item) => {
				if (!quantityReg.test(item.stock)) {
					newErrors[item.size] = "Please enter a valid quantity";
					newErrors.sizes = "Please enter a valid quantity";
				}
			})
			if (
				Object.keys(newErrors).length === 0) {
				setIsValid(true);
			} else {
				setIsValid(false);
			}
			return newErrors;
		};
	
		setErrors(validate(product, stockSizes));
	}, [product, stockSizes]);
	return { errors, isValid };
};
