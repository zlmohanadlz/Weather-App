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

// External Libraries
import axios from "axios";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";
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

let cancelAxios = null;
function App() {
	const { t, i18n } = useTranslation();
	const [date, setDate] = useState(moment().format("MMMM Do YYYY, h:mm:ss a"));
	const [weather, setWeather] = useState({
		temp: null,
		description: "",
		min: null,
		max: null,
		icon: null,
	});
	const [locale, setLocale] = useState("ar");
	useEffect(() => {
		i18n.changeLanguage("ar");
		axios
			.get(
				"https://api.openweathermap.org/data/2.5/weather?lat=13.56966000&lon=44.01462900&appid=cc2822f1201cefb6866b9c101b67f04e",
				{
					cancelToken: new axios.CancelToken((c) => {
						cancelAxios = c;
					}),
				}
			)
			.then(function (response) {
				// temp in is kelvin so convert it to c
				console.log(response.data);
				const temp = Math.round(response.data.main.temp - 272.15);
				const description = response.data.weather[0].description;
				const min = (response.data.main.temp_min - 272.15).toFixed(1);
				const max = (response.data.main.temp_max - 272.15).toFixed(1);
				const iconCode = response.data.weather[0].icon;

				console.log(temp, description, min, max);
				setWeather({
					temp,
					description,
					min,
					max,
					icon: `https://openweathermap.org/img/wn/${iconCode}@2x.png`,
				});
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});

		// cleanUp function return (it will execute when the component unmount)
		return () => {
			console.log("Cancel ");
			cancelAxios();
		};
	}, [i18n]);

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
									<div className="temp">
										<Typography
											variant="h3"
											gutterBottom
											sx={{ fontSize: "5rem", marginBottom: "0.5rem" }}
										>
											{weather.temp}
										</Typography>
										{/* TEMP Image */}
										<img src={weather.icon} alt="Weather Condition" />
									</div>
									<Typography
										sx={{
											margin: "10px",
											fontSize: "1.5rem",
											fontWeight: "200",
										}}
									>
										{weather.description}
									</Typography>
									{/* MIN & MAX */}
									<div>
										<span>
											{t("الصغرى")}: {weather.min}
										</span>
										<span>|</span>
										<span>
											{t("الكبرى")}: {weather.max}
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
