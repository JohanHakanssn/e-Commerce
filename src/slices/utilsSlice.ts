import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UtilsState {
	genders: string[];
	categories: string[];
	sizes: UtilSizes;
}

interface UtilSizes {
	Accessories: {
		Bags: string[];
		Hats: string[];
		[key: string]: string[];
	};
	Clothes: {
		Hoodies: string[];
		Pants: string[];
		Shirts: string[];
		Shorts: string[];
		Skirts: string[];
		Sweatshirts: string[];
		"T-Shirts": string[];
		[key: string]: string[];
	};
	Shoes: {
		Mens: string[];
		Womens: string[];
		Unisex: string[];
		[key: string]: string[];
	};
}

interface SetSize {
	size: string;
	values: string[];
}
interface SetCategory {
	category: string;
	values: string[];
}
interface SetShoeSize {
	gender: string;
	values: string[];
}



const initialState: UtilsState = {
	genders: ["Mens", "Womens", "Unisex"],
	categories: [
		"Bags",
		"Dresses",
		"Hats",
		"Hoodies",
		"Jackets",
		"Pants",
		"Shirts",
		"Shoes",
		"Shorts",
		"Skirts",
		"Sweaters",
		"Sweatshirts",
		"T-Shirts",
	],
	sizes: {
		Accessories: {
			Bags: ["oneSize"],
			Hats: ["oneSize"],
		},
		Clothes: {
			Dresses: ["xs", "s", "m", "l", "xl", "xxl"],
			Hoodies: ["xs", "s", "m", "l", "xl", "xxl"],
			Jackets: ["xs", "s", "m", "l", "xl", "xxl"],
			Pants: ["xs", "s", "m", "l", "xl", "xxl"],
			Shirts: ["xs", "s", "m", "l", "xl", "xxl"],
			Shorts: ["xs", "s", "m", "l", "xl", "xxl"],
			Skirts: ["xs", "s", "m", "l", "xl", "xxl"],
			Sweaters: ["xs", "s", "m", "l", "xl", "xxl"],
			Sweatshirts: ["xs", "s", "m", "l", "xl", "xxl"],
			"T-Shirts": ["xs", "s", "m", "l", "xl", "xxl"],
		},
		Shoes: {
			Mens: ["39", "40", "41", "42", "43", "44", "45", "46"],
			Womens: ["35", "36", "37", "38", "39", "40", "41", "42"],
			Unisex: [
				"35",
				"36",
				"37",
				"38",
				"39",
				"40",
				"41",
				"42",
				"43",
				"44",
				"45",
				"46",
			],
		},
	},
};


export const utilsSlice = createSlice({
	name: "utils",
	initialState,
	reducers: {
		setGenders: (state, action: PayloadAction<Array<string>>) => {
			state.genders = [...action.payload];
		},
		setCategories: (state, action: PayloadAction<Array<string>>) => {
			state.categories = [...action.payload];
		},
		setAccessories: (state, action: PayloadAction<SetCategory>) => {
			const { category, values } = action.payload;
			state.sizes.Accessories[category] = [...values];
		},
		setClothingSize: (state, action: PayloadAction<SetSize>) => {
			const { size, values } = action.payload;
			state.sizes.Clothes[size] = [...values];
		},
		setShoeSize: (state, action: PayloadAction<SetShoeSize>) => {
			const { gender, values } = action.payload;
			state.sizes.Shoes[gender] = [...values];
		},
		setAllSizes: (state, action: PayloadAction<UtilSizes>) => {
			state.sizes = action.payload;
		},
		setUtilState: (state, action: PayloadAction<UtilsState>) => {
			const { genders, categories, sizes } = action.payload;
			state.categories = [...categories];
			state.genders = [...genders];
			state.sizes = { ...sizes };
		}
	},
});

export const { setGenders, setCategories, setClothingSize, setShoeSize, setAllSizes, setUtilState } = utilsSlice.actions;

export default utilsSlice.reducer;
