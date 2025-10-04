import "./App.css";
// import BasicButtons from "./components/Button.js";

// React
import { useEffect, useState } from "react";

// Material UI Components
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

// External Libraries
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";

// Redux imports
import { useSelector, useDispatch } from "react-redux";
import {
	fetchWeather,
	cancelWeatherRequest,
} from "./features/weather/weatherSlice";

moment.locale("ar");

const theme = createTheme({
	typography: {
		fontFamily: "arabic, sans-serif",
	},
});

// const data = fetch(
// 	"https://api.openweathermap.org/data/2.5/weather?lat=13.56966000&lon=44.01462900&appid=cc2822f1201cefb6866b9c101b67f04e"
// )
// 	.then((resolve) => {
// 		let data = resolve.json();
// 		console.log(data);
// 		return data;
// 	})
// 	.then((resolve) => {
// 		console.log(resolve);
// 	});

function App() {
	const { t, i18n } = useTranslation();
	const [date, setDate] = useState(moment().format("MMMM Do YYYY, h:mm:ss a"));

	const [locale, setLocale] = useState("ar");

	const dispatch = useDispatch();
	const weather = useSelector((state) => state.weather.weather);
	const isLoading = useSelector((state) => {
		console.log(state.weather.isLoading);
		return state.weather.isLoading;
	});
	console.log(isLoading);
	useEffect(() => {
		dispatch(fetchWeather(locale));
		// cleanUp function return (it will execute when the component unmount)
		return () => {
			cancelWeatherRequest();
		};
	}, [i18n, dispatch, locale]);

	function handleChangeLang() {
		if (locale === "ar") {
			i18n.changeLanguage("en");
			setLocale("en");
			moment.locale("en");
		} else if (locale === "en") {
			i18n.changeLanguage("ar");
			setLocale("ar");
			moment.locale("ar");
		}
		setDate(moment().format("MMMM Do YYYY, h:mm:ss a"));
	}
	return (
		<>
			<ThemeProvider theme={theme}>
				<Container maxWidth="sm" sx={{ padding: "0px" }}>
					<main dir={locale === "ar" ? "rtl" : "ltr"}>
						{/* Card */}
						<div className="card">
							{/* City and time */}
							<div className="card-header">
								<Typography
									variant="h1"
									gutterBottom
									sx={{
										fontWeight: 600,
										margin: locale === "ar" ? "0 0 0 2rem" : "0 2rem 0 0",
										position: "relative",
										top: locale === "ar" ? "0" : "15px",
									}}
								>
									{t("تعز")}
								</Typography>
								<Typography variant="h2" gutterBottom>
									{date}
								</Typography>
							</div>
							<hr />
							{/* Degree and description */}
							<div className="card-content">
								{/* Temp */}
								<div>
									{isLoading ? (
										<CircularProgress
											sx={{
												color: "white",
												position: "relative",
												bottom: "30px",
											}}
										/>
									) : weather ? (
										<div className="temp">
											<Typography
												variant="h3"
												gutterBottom
												sx={{ fontSize: "5rem", marginBottom: "0.5rem" }}
											>
												{weather.temp}
											</Typography>
											<img src={weather.icon} alt="" />
										</div>
									) : null}
									<Typography
										sx={{
											margin: "10px",
											fontSize: "1.5rem",
											fontWeight: "200",
										}}
									>
										{weather?.description}
									</Typography>
									<div>
										<span>
											{t("الصغرى")}: {weather?.min}
										</span>
										<span>|</span>
										<span>
											{t("الكبرى")}: {weather?.max}
										</span>
									</div>
								</div>
								{/* Cloud */}
								<CloudIcon sx={{ fontSize: "200px", color: "white" }} />
							</div>
						</div>
						<Button
							variant="text"
							sx={{ color: "white", alignSelf: "flex-start", marginTop: "5px" }}
							onClick={handleChangeLang}
						>
							{locale === "ar" ? "انجليزي" : "ARABIC"}
						</Button>
					</main>
				</Container>
			</ThemeProvider>
		</>
	);
}

export default App;
