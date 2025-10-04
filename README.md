# Weather App

A responsive and multilingual weather application built with **React**, **Redux Toolkit**, **Axios**, and **Material-UI**. This app fetches real-time weather data from the **OpenWeatherMap API**, dynamically displays weather information, and supports language switching between **Arabic** and **English**.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Key Concepts](#key-concepts)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Strengths & Highlights](#strengths--highlights)
- [Future Enhancements](#future-enhancements)

---

## Features

- **Real-time Weather Data**: Fetches current weather conditions for a specific location using the OpenWeatherMap API.
- **Multilingual Support**: Seamless language switching (Arabic ↔ English) powered by `react-i18next`.
- **Responsive UI**: Built with Material-UI for modern, responsive, and accessible design.
- **Dynamic Date & Time**: Displays the current date and time with locale-based formatting using Moment.js.
- **State Management**: Efficient global state handling with Redux Toolkit.
- **Async API Handling**: Fetches data asynchronously with Axios and gracefully handles loading states.
- **API Request Cancellation**: Supports aborting API requests when the component unmounts to prevent memory leaks.

---

## Tech Stack

- **React** – Frontend library for building user interfaces.
- **Redux Toolkit** – Efficient and scalable state management for global state handling.
- **Axios** – HTTP client for making API requests.
- **Material-UI (MUI)** – UI framework for responsive and accessible components.
- **React-i18next** – Internationalization and localization support.
- **Moment.js** – Date and time formatting.

---

## Project Structure

```
src/
│
├─ components/ # Reusable UI components
├─ features/
│ └─ weather/ # Redux slice for weather API
│ ├─ weatherSlice.js
│
├─ locales/ # i18n translation files
│ ├─ en/translation.js
│ └─ ar/translation.js
│
├─ App.js # Main component
├─ index.js # App entry
└─ store.js # Redux store configuration
```

---

## Key Concepts

### Redux Toolkit

- **Slices**: Used `createSlice` for weather state management including `weather`, `isLoading`, and `result`.
- **Async Thunks**: `createAsyncThunk` handles async API calls with automatic lifecycle actions (`pending`, `fulfilled`, `rejected`).
- **Request Cancellation**: Supports cancelling Axios requests to prevent updating unmounted components.

### Axios & API Handling

- Fetches weather data from OpenWeatherMap API using **Axios**.
- Dynamically passes the `lang` parameter based on selected language to localize weather descriptions.
- Converts API temperature from Kelvin to Celsius.
- Gracefully handles loading and error states.

### Internationalization

- Uses **i18next** for translation.
- Weather description is dynamically fetched in the selected language (`en` or `ar`).
- UI text such as city name, min/max labels, and buttons are translated using the same i18n setup.

### Material-UI

- **Typography** for consistent text styling.
- **Container** for layout and responsiveness.
- **CircularProgress** for loading state visualization.
- **Icons** such as `CloudIcon` for visual enhancement.

---

## Developer

**Mohanad Ayoub** [GitHub profile](https://github.com/zlmohanadlz) - [Linkedin Profile](https://www.linkedin.com/in/mohanad-ayoub-55bb29382)
