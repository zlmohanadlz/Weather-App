import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let cancelAxios = null;
export const fetchWeather = createAsyncThunk(
	"weatherApi/fetchWeather",
	async (locale) => {
		try {
			const weatherData = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?lat=13.56966000&lon=44.01462900&appid=cc2822f1201cefb6866b9c101b67f04e&lang=${locale}`,
				{
					cancelToken: new axios.CancelToken((c) => {
						cancelAxios = c;
					}),
				}
			);
			console.log(weatherData.data);
			const temp = Math.round(weatherData.data.main.temp - 272.15);
			const description = weatherData.data.weather[0].description;
			const min = (weatherData.data.main.temp_min - 272.15).toFixed(1);
			const max = (weatherData.data.main.temp_max - 272.15).toFixed(1);
			const iconCode = weatherData.data.weather[0].icon;

			console.log(temp, description, min, max);
			return {
				temp,
				description,
				min,
				max,
				icon: `https://openweathermap.org/img/wn/${iconCode}@2x.png`,
			};
		} catch (error) {
			console.log(error);
		}

		// temp in is kelvin so convert it to c

		// handle error
	}
);

// function to cancel manually
export const cancelWeatherRequest = () => {
	if (cancelAxios) cancelAxios("Weather request canceled by user/component.");
};

export const weatherApiSlice = createSlice({
	name: "weatherApi",
	initialState: {
		result: "",
		weather: null,
		isLoading: false,
	},
	reducers: {
		changeResult: (state, action) => {
			state.result = "Changed";
		},
	},

	extraReducers(builder) {
		builder
			.addCase(fetchWeather.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(fetchWeather.fulfilled, (state, action) => {
				console.log(state, action);
				state.isLoading = false;
				state.weather = action.payload;
			})
			.addCase(fetchWeather.rejected, (state, action) => {
				state.isLoading = false;
			});
	},
});

export const { changeResult } = weatherApiSlice.actions;

export default weatherApiSlice.reducer;
