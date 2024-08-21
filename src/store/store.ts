import { configureStore } from "@reduxjs/toolkit";
import userReducer from "slices/userSlice";
import cartReducer from "slices/cartSlice";
import utilsReducer from "slices/utilsSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		cart: cartReducer,
		utils: utilsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
