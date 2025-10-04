import { configureStore } from "@reduxjs/toolkit";
import weatherAPiReducer from "../features/weather/weatherSlice";

export const store = configureStore({
	reducer: {
		weather: weatherAPiReducer,
	},
});
