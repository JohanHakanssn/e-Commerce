import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface UserState {
	username: string;
	userId: string;
	isLoggedIn: boolean;
}

const initialState: UserState = {
	username: "",
	userId: "",
	isLoggedIn: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUsername: (state, action: PayloadAction<string>) => {
			state.username = action.payload;
		},
		setUserId: (state, action: PayloadAction<string>) => {
			state.userId = action.payload;
		},
		setIsLoggdeIn: (state) => {
			state.isLoggedIn = !state.isLoggedIn;
		},
	},
});

export const { setUsername, setUserId, setIsLoggdeIn } =
	userSlice.actions;


export default userSlice.reducer;
