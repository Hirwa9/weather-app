// import { useState } from 'react';
import { useState } from 'react';
import './App.css';
import { WEATHER_API_KEY } from './api/api';
import axios from 'axios';
import { CalendarBlank, Clock, Cloud, DotOutline, Drop, DropHalf, Eye, Quotes, RainbowCloud, Spinner, Thermometer } from '@phosphor-icons/react';
import weatherSample from './data/staticData.json';
import SearchBar from './components/searchBar/SearchBar';
import toast, { Toaster } from 'react-hot-toast';


function App() {

	const notify = (txt) => {
		return toast(txt, {
			position: 'top-center',
			style: {
				backgroundColor: "var(--color-gray-600)",
				color: "var(--color-gray-200)",
				border: "1.5px dashed var(--color-gray-500)",
			}
		})
	}

	// const apiUrl = `https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=${WEATHER_API_KEY}`

	// const [weather, setWeather] = useState(null);
	const [weather, setWeather] = useState(weatherSample);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// console.log(typeof weather);
	// console.log(weather?.timelines?.hourly.slice(1)[1]);

	const fetchWeather = async (str) => {
		if (!str || str.trim() === '' || str.trim().length < 2) {
			return notify('Enter a location to continue');
		}

		const apiUrl = `https://api.tomorrow.io/v4/weather/forecast?location=${str}&apikey=${WEATHER_API_KEY}`
		// const apiUrl = `https://api.tomorrow.io/v4/weather/realtime?location=${str}&apikey=${WEATHER_API_KEY}`

		try {
			setLoading(true);
			setError(null);
			const response = await axios.get(apiUrl);
			setWeather(response?.data);
		} catch (err) {
			console.error(err);
			setError('Failed to fetch weather data');
		} finally {
			setLoading(false);
		}
	};

	// useEffect(() => {
	// 	if (!city || city.trim() === '') {
	// 		fetchWeather();
	// 	}
	// }, [city])

	// console.log(weather);

	// Weather related information
	const temperature = weather?.timelines?.minutely[0]?.values?.temperature;

	let weatherSubtitle = "Mild and Comfortable";
	let weatherSummary =
		"Today, expect comfortable temperatures throughout the day. A perfect time to enjoy outdoor activities.";

	if (temperature <= 5) {
		weatherSubtitle = "Freezing Cold";
		weatherSummary =
			"Bundle up! It's a freezing day outside. Wear heavy layers, gloves, and a warm hat to stay cozy.";
	} else if (temperature > 5 && temperature <= 15) {
		weatherSubtitle = "Chilly and Crisp";
		weatherSummary =
			"A cool and refreshing day! You might want a light jacket or a sweater for warmth.";
	} else if (temperature > 25 && temperature <= 32) {
		weatherSubtitle = "Warm and Pleasant";
		weatherSummary =
			"A warm day ahead! Stay hydrated and wear light, breathable clothing.";
	} else if (temperature > 32) {
		weatherSubtitle = "Hot and Sunny";
		weatherSummary =
			"It's a hot day! Avoid direct sunlight for long periods and drink plenty of water.";
	}

	return (
		<>
			<Toaster />
			<div className='min-h-screen flex flex-col'
				style={{
					backgroundImage: "linear-gradient(rgba(255, 255, 255, .3), rgba(255, 255, 255, .3)), url('/images/rain-photos.webp')",
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
				}}
			>
				{/* <div className="w-full mb-4 p-5 sm:p-8 bg-linear-to-b from-black/90 to-black/15 text-gray-200 rounded-b-3xl"> */}
				<div className="w-full mb-4 p-5 sm:p-8 bg-linear-to-b from-black/90 to-black/15 text-gray-200 rounded-b-3xl">
					<h1 className='mb-4 text-3xl font-bold text-center'>Weather app</h1>
					<RainbowCloud size={40} className='mx-auto mb-3' />
					<p className='mb-7 text-center'>
						Get real time and forecast weather information for any location
					</p>
				</div>
				{/* Design */}

				<div className='w-6xl max-w-full mx-auto flex flex-col md:flex-row gap-4 p-3 md:p-4 lg:p-6 image-bg rounded-3xl'>
					{/* First */}
					<div className="flex flex-col w-[50%]">
						<SearchBar search={fetchWeather} className="mb-4" />

						<div className="flex-1 p-4 rounded-xl bg-linear-to-b from-black/35 to-white/30">
							<div className='text-gray-200 mb-15'>
								<h2 className='text-center text-blue-300'>Weather in {weather?.location?.name}</h2>
								<div className="mx-auto mb-3 mt-15 w-fit text-center relative text-6xl">
									{temperature} <DotOutline size={40} className='absolute top-0 end-0 translate-x-7' />
								</div>
								<div className="text-center text-3xl font-semibold mb-4">{weatherSubtitle}</div>
								<p className='text-xs text-center'>
									{weatherSummary}
								</p>
							</div>
							<div className='flex flex-wrap text-gray-200'>
								{/*  */}
								<div className="w-[50%] shrink-0 p-1 sm:p-2 ps-0">
									<div className='h-full p-2 md:p-3 rounded-xl bg-black/40 backdrop-blur-md'>
										<div className="flex items-center gap-2 mb-1 uppercase opacity-50 overflow-hidden">
											<Thermometer className='shrink-0' /> Feels like
										</div>
										<div className="mb-6 w-fit text-center relative text-xl">
											{weather?.timelines?.minutely[0]?.values?.temperatureApparent} <DotOutline size={20} className='absolute top-0 end-0 translate-x-4' />
										</div>
										<div className='text-xs'>
											Humidity is making it feel warmer
										</div>
									</div>
								</div>
								{/*  */}
								<div className="w-[50%] shrink-0 p-1 sm:p-2 pe-0">
									<div className='h-full p-2 md:p-3 rounded-xl bg-black/40 backdrop-blur-md'>
										<div className="flex items-center gap-2 mb-1 uppercase opacity-50 overflow-hidden">
											<Drop className='shrink-0' /> Precipitation
										</div>
										<div className="mb-6 w-fit text-center relative text-xl">
											{weather?.timelines?.minutely[0]?.values?.precipitationProbability} <Quotes size={8} weight="fill" className='absolute top-0 end-0 translate-x-3 translate-y-2' /> <span className="text-sm">in last 24h</span>
										</div>
										<div className='text-xs'>
											{Math.round(weather.timelines.daily[1]?.values?.precipitationProbabilityAvg)} expected in next 24h
										</div>
									</div>
								</div>
								{/*  */}
								<div className="w-[50%] shrink-0 p-1 sm:p-2 ps-0">
									<div className='h-full p-2 md:p-3 rounded-xl bg-black/40 backdrop-blur-md'>
										<div className="flex items-center gap-2 mb-1 uppercase opacity-50 overflow-hidden">
											<Eye className='shrink-0' /> Visibility
										</div>
										<div className="mb-6 w-fit text-center relative text-xl">
											{weather?.timelines?.minutely[0]?.values?.visibility} mi
										</div>
									</div>
								</div>
								{/*  */}
								<div className="w-[50%] shrink-0 p-1 sm:p-2 pe-0">
									<div className='h-full p-2 md:p-3 rounded-xl bg-black/40 backdrop-blur-md'>
										<div className="flex items-center gap-2 mb-1 uppercase opacity-50 overflow-hidden">
											<DropHalf className='shrink-0' /> Humidity
										</div>
										<div className="mb-6 w-fit text-center relative text-xl">
											{weather?.timelines?.minutely[0]?.values?.humidity}%
										</div>
										<div className='text-xs'>
											The dew point is <span className="relative me-1">{weather?.timelines?.minutely[0]?.values?.dewPoint} <DotOutline size={10} className='absolute top-0 end-0 translate-x-1' /></span> right now
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Second */}
					{/* <div className="w-[50%] bg-white/10"> */}
					<div className="w-[50%]">
						{/* Hourly */}
						<div className='mb-4 p-2 md:p-3 rounded-xl bg-black/30 text-gray-200 backdrop-blur-sm overflow-hidden'>
							<div className="flex items-center gap-2 mb-4 uppercase opacity-50 overflow-hidden pb-1 border-b-2 border-b-gray-600">
								<Clock /> Hourly forecast
							</div>
							<div className="max-w-full flex gap-3 overflow-auto">
								<div className="flex flex-col items-center gap-1 w-fit mb-3 p-2 rounded-xl bg-gray-600">
									<div className='text-xs'>Now</div>
									<div className="w-fit text-center flex text-md translate-x-1">
										<span className='drop-shadow-lg'>{weather?.timelines?.hourly[0]?.values?.temperatureApparent}</span> <DotOutline size={13} className='' />
									</div>
									<Cloud size={20} weight='fill' />
								</div>
								{weather?.timelines?.hourly
									.slice(1)
									.map((item, index) => (
										<div key={index} className="flex flex-col items-center gap-1 w-fit mb-3 p-2 rounded-xl">
											<div className='text-xs'>
												{new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
											</div>
											<div className="w-fit text-center flex text-md translate-x-1">
												<span className='drop-shadow-lg'>{item.values?.temperatureApparent}</span> <DotOutline size={13} className='' />
											</div>
											<Cloud size={20} weight='fill' />
										</div>
									))
								}
							</div>
						</div>
						{/* Daily */}
						<div className='mb-4 p-2 md:p-3 rounded-xl bg-black/30 text-gray-200 backdrop-blur-sm overflow-hidden'>
							<div className="flex items-center gap-2 mb-4 uppercase opacity-50 overflow-hidden pb-1 border-b-2 border-b-gray-600">
								<CalendarBlank /> Weekly forecast
							</div>
							<div className="max-w-full flex gap-3 overflow-auto">
								<div className="flex flex-col items-center gap-1 w-fit mb-3 p-2 rounded-xl bg-gray-600">
									<div className='text-xs'>Today</div>
									<div className="w-fit text-center flex text-md translate-x-1">
										<span className='drop-shadow-lg'>{weather?.timelines?.daily[0]?.values?.temperatureApparentAvg}</span> <DotOutline size={13} className='' />
									</div>
									<Cloud size={20} weight='fill' />
								</div>
								{weather?.timelines?.daily
									.slice(1)
									.map((item, index) => (
										<div key={index} className="flex flex-col items-center gap-1 w-fit mb-3 p-2 rounded-xl">
											<div className='text-xs'>
												{new Date(item.time).toLocaleString([], { weekday: 'short' })}
											</div>
											<div className="w-fit text-center flex text-md translate-x-1">
												<span className='drop-shadow-lg'>{item.values?.temperatureApparentAvg}</span> <DotOutline size={13} className='' />
											</div>
											<Cloud size={20} weight='fill' />
										</div>
									))
								}
							</div>
						</div>
					</div>
				</div>

				{/* After query */}
				<div className='p-3'>
					{loading && (
						<div>
							<h3 className='text-blue-600 text-2xl'>Loading</h3>
							<Spinner />
						</div>
					)}
					{!loading && error && (
						<div>
							<h3 className='text-yellow-500 text-2xl'>Error</h3>
							<p>{error}</p>
						</div>
					)}
					{!loading && !error && weather && (
						<div>
							<h3>Weather in {weather?.location?.name}</h3>
							<code style={{ whiteSpace: 'pre-wrap' }}>
								{JSON.stringify((weather), null, 2)}
							</code>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default App;
