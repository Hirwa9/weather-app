// import { useState } from 'react';
import { useState } from 'react';
import './App.css';
import { WEATHER_API_KEY } from './api/api';
import axios from 'axios';
import { CalendarBlank, Clock, Cloud, DotOutline, Drop, DropHalf, Eye, Quotes, RainbowCloud, Spinner, Sun, Thermometer, Wind } from '@phosphor-icons/react';
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

	const uvLevels = [
		{ level: 0, label: "Low", color: "bg-green-400" },
		{ level: 3, label: "Moderate", color: "bg-yellow-400" },
		{ level: 6, label: "High", color: "bg-orange-400" },
		{ level: 8, label: "Very High", color: "bg-red-500" },
		{ level: 11, label: "Extreme", color: "bg-purple-700" }
	];

	// Function to get the UV description based on the index
	const getUVDescription = (uvIndex) => {
		return uvLevels.reduce((acc, curr) => (Number(uvIndex) >= curr.level ? curr : acc), uvLevels[0]);
	};

	const uvIndex = weather?.timelines?.hourly[0]?.values?.uvIndex || 0;
	const windSpeed = weather?.timelines?.hourly[0]?.values?.windSpeed || 0;
	const windGust = weather?.timelines?.hourly[0]?.values?.windGust || 0;
	const windDirection = weather?.timelines?.hourly[0]?.values?.windDirection || 0;
	const { label: uvLabel, color: uvColor } = getUVDescription(uvIndex);

	return (
		<>
			<Toaster />
			<div className='min-h-screen flex flex-col'
				style={{
					backgroundImage: "linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url('/images/rain-photos.webp')",
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<div className="w-full sm:mb-4 p-5 sm:p-8 text-blue-300 sm:rounded-b-3xl">
					<h1 className='mb-4 text-3xl font-bold text-center'>Weather app</h1>
					<RainbowCloud size={40} className='mx-auto mb-3' />
					<p className='text-center'>
						Get real time and forecast weather information for any location
					</p>
				</div>

				{/* Design */}
				<div className='sm:w-xl md:w-3xl lg:w-6xl xl:w-9xl max-w-full mx-auto flex flex-col md:flex-row gap-4 pt-10 p-3 md:p-4 lg:p-6 image-bg sm:rounded-3xl'>
					{/* First */}
					<div className="flex flex-col md:w-[50%]">
						<SearchBar search={fetchWeather} className="mb-4" />

						<div className="flex-1 p-4 rounded-xl bg-linear-to-b from-black/35 to-white/30">
							<div className='text-gray-200 mb-14'>
								<h2 className='text-center text-blue-300'>Weather in {weather?.location?.name}</h2>
								<div className="mx-auto mb-3 mt-14 w-fit text-center relative text-6xl">
									{temperature}
									<span className='absolute top-2 right-0 translate-x-7 flex border-amber-100'>
										<DotOutline size={30} className='absolute -top-2 left-0 -translate-x-5' /> <small style={{ fontSize: '50%' }}>C</small>
									</span>
								</div>
								<div className="text-center text-3xl font-semibold mb-4">{weatherSubtitle}</div>
								<p className='text-xs text-center'>
									{weatherSummary}
								</p>
							</div>
							<div className='flex flex-wrap text-gray-200'>
								{/*  */}
								<div className="w-[50%] shrink-0 p-2 sm:p-2 ps-0">
									<div className='h-full p-3 rounded-xl bg-black/40 backdrop-blur-md'>
										<div className="flex items-center gap-2 mb-1 uppercase opacity-50 overflow-hidden">
											<Thermometer className='shrink-0' /> <span className="text-xs">Feels like</span>
										</div>
										{/* <div className="mb-6 w-fit text-center relative text-xl">
											{weather?.timelines?.minutely[0]?.values?.temperatureApparent} <DotOutline size={20} className='absolute top-0 right-0 translate-x-4' />
										</div> */}
										<div className="mb-6 w-fit text-center relative text-xl">
											{weather?.timelines?.minutely[0]?.values?.temperatureApparent} <span className='absolute top-1 -right-1 translate-x-3 flex border-amber-100'>
												<DotOutline size={20} className='absolute -top-1 -left-4' /> <small style={{ fontSize: '50%' }}>C</small>
											</span>
										</div>
										<div className='text-xs'>
											Humidity is making it feel like
										</div>
									</div>
								</div>
								{/*  */}
								<div className="w-[50%] shrink-0 p-2 sm:p-2 pe-0">
									<div className='h-full p-3 rounded-xl bg-black/40 backdrop-blur-md'>
										<div className="flex items-center gap-2 mb-1 uppercase opacity-50 overflow-hidden">
											<Drop className='shrink-0' /> <span className="text-xs">Precipitation</span>
										</div>
										<div className="mb-6 w-fit text-center relative text-xl">
											{weather?.timelines?.minutely[0]?.values?.precipitationProbability} <Quotes size={8} weight="fill" className='absolute top-0 right-0 translate-x-3 translate-y-2' /> <span className="text-sm">in last 24h</span>
										</div>
										<div className='text-xs'>
											{Math.round(weather.timelines.daily[1]?.values?.precipitationProbabilityAvg)} expected in next 24h
										</div>
									</div>
								</div>
								{/*  */}
								<div className="w-[50%] shrink-0 p-2 sm:p-2 ps-0">
									<div className='h-full p-3 rounded-xl bg-black/40 backdrop-blur-md'>
										<div className="flex items-center gap-2 mb-1 uppercase opacity-50 overflow-hidden">
											<Eye className='shrink-0' /> <span className="text-xs">Visibility</span>
										</div>
										<div className="mb-6 w-fit text-center relative text-xl">
											{weather?.timelines?.minutely[0]?.values?.visibility} mi
										</div>
									</div>
								</div>
								{/*  */}
								<div className="w-[50%] shrink-0 p-2 sm:p-2 pe-0">
									<div className='h-full p-3 rounded-xl bg-black/40 backdrop-blur-md'>
										<div className="flex items-center gap-2 mb-1 uppercase opacity-50 overflow-hidden">
											<DropHalf className='shrink-0' /> <span className="text-xs">Humidity</span>
										</div>
										<div className="mb-6 w-fit text-center relative text-xl">
											{weather?.timelines?.minutely[0]?.values?.humidity}%
										</div>
										<div className='text-xs'>
											The dew point is <span className="relative me-1">{weather?.timelines?.minutely[0]?.values?.dewPoint} <DotOutline size={10} className='absolute top-0 right-0 translate-x-1' /></span> right now
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Second */}
					{/* <div className="w-[50%] bg-white/10"> */}
					<div className="md:w-[50%]">
						{/* Hourly Forecast */}
						<div className='mb-4 p-3 rounded-xl bg-black/30 text-gray-200 backdrop-blur-sm overflow-hidden'>
							<div className="flex items-center gap-2 mb-4 uppercase opacity-50 overflow-hidden pb-1 border-b-2 border-b-gray-600">
								<Clock /> <span className="text-xs">Hourly forecast</span>
							</div>
							<div className="max-w-full flex gap-3 overflow-auto">
								<div className="flex flex-col items-center gap-1 w-fit mb-3 p-2 rounded-xl bg-gray-600">
									<div className='text-xs'>Now</div>
									<div className="w-fit text-center flex text-lg translate-x-1">
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
											<div className="w-fit text-center flex text-lg translate-x-1">
												<span className='drop-shadow-lg'>{item.values?.temperatureApparent}</span> <DotOutline size={13} className='' />
											</div>
											<Cloud size={20} weight='fill' />
										</div>
									))
								}
							</div>
						</div>
						{/* Daily Forecast */}
						<div className='mb-4 p-3 rounded-xl bg-black/30 text-gray-200 backdrop-blur-sm overflow-hidden'>
							<div className="flex items-center gap-2 mb-4 uppercase opacity-50 overflow-hidden pb-1 border-b-2 border-b-gray-600">
								{/* <CalendarBlank /> <span className="text-xs">Weekly forecast</span> */}
								<CalendarBlank /> <span className="text-xs">{weather?.timelines?.daily.length}-Day forecast</span>
							</div>
							<div className="max-w-full flex gap-3 overflow-auto">
								<div className="flex flex-col items-center gap-1 w-fit mb-3 p-2 rounded-xl bg-gray-600">
									<div className='text-xs'>Today</div>
									<div className='text-xs text-gray-400' style={{ scale: .8 }}>
										{new Date(weather?.timelines?.daily[0]?.time).getDate()}/{new Date(weather?.timelines?.daily[0]?.time).getMonth()}
									</div>
									<div className="w-fit text-center flex text-lg translate-x-1">
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
											<div className='text-xs text-gray-400' style={{ scale: .8 }}>
												{new Date(item.time).getDate()}/{new Date(item.time).getMonth()}
											</div>
											<div className="w-fit text-center flex text-lg translate-x-1">
												<span className='drop-shadow-lg'>{item.values?.temperatureApparentAvg}</span> <DotOutline size={13} className='' />
											</div>
											<Cloud size={20} weight='fill' />
										</div>
									))
								}
							</div>
						</div>
						{/* UV and Wind */}
						<div className="sm:flex md:block lg:flex gap-3">
							{/* UV */}
							<div className='flex-1 mb-4 p-3 rounded-xl bg-black/30 text-gray-200 backdrop-blur-sm overflow-hidden'>
								<div className="flex items-center gap-2 mb-4 uppercase opacity-50 overflow-hidden">
									<Sun /> <span className="text-xs">UV index</span>
								</div>
								<div className="mb-3 relative text-xl">
									<div className='mb-2'>{uvIndex}</div>
									<p className={`ms-2 mb-1 text-xs`}>{uvLabel}</p>
									<div className="relative mx-2 border-amber-50">
										<img src="/images/uv_spectrum.png" className='w-full h-1 object-center rounded-full' alt="" />
										<span
											className="absolute left-0 top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 border-[1.5px] border-gray-800 bg-gray-200 rounded-full cursor-pointer"
											style={{ left: `${(uvIndex / 11) * 100}%` }}
										></span>
									</div>
								</div>
								<div className='text-xs'>
									{uvIndex <= 2 && "Low danger from the sun's UV rays for the average person."}
									{uvIndex > 2 && uvIndex <= 5 && "Moderate risk of harm from unprotected sun exposure."}
									{uvIndex > 5 && uvIndex <= 7 && "High risk of harm from unprotected sun exposure. Protection against skin and eye damage is needed."}
									{uvIndex > 7 && uvIndex <= 10 && "Very high risk of harm from unprotected sun exposure. Take extra precautions because unprotected skin and eyes will be damaged and can burn quickly."}
									{uvIndex > 10 && "Extreme risk of harm from unprotected sun exposure. Take all precautions because unprotected skin and eyes can burn in minutes."}
								</div>
							</div>
							{/* Wind */}
							<div className='flex-1 mb-4 p-3 rounded-xl bg-black/30 text-gray-200 backdrop-blur-sm overflow-hidden'>
								<div className="flex items-center gap-2 mb-4 uppercase opacity-50 overflow-hidden">
									<Wind /> <span className="text-xs">Wind</span>
								</div>
								<div className="flex gap-3 items-start">
									<div className="mb-3 flex-1">
										<div className="flex items-center gap-2">
											<div className='text-xl'>{windSpeed}</div>
											<div className='grid text-sm'>
												<span className='opacity-50 uppercase'>MPH</span>
												<span>Speed</span>
											</div>
										</div>
										<hr className='my-2 border-gray-500' />
										<div className="flex items-center gap-2">
											<div className='text-xl'>{windGust}</div>
											<div className='grid text-sm'>
												<span className='opacity-50 uppercase'>MPH</span>
												<span>Gust</span>
											</div>
										</div>
									</div>

									<div className="bg-gray-800 p-2 border-[1.5px] border-white/20 rounded-full">
										<div className="relative w-20 ms-auto aspect-square border border-gray-600 rounded-full">
											{/* Poles */}
											<span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center p-[1px] text-xs leading-none bg-gray-800">
												N
											</span>
											<span className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 flex justify-center items-center p-[1px] text-xs leading-none bg-gray-800">
												E
											</span>
											<span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex justify-center items-center p-[1px] text-xs leading-none bg-gray-800">
												S
											</span>
											<span className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 flex justify-center items-center p-[1px] text-xs leading-none bg-gray-800">
												W
											</span>
											{/* Needles */}
											<span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[0.70rem] aspect-square border-[1.5px] border-gray-800 bg-gray-200 rounded-full z-10'
												style={{ transform: `translateX(-50%) translateY(-50%) rotate(${windDirection}deg)` }}
											>
												{/* Top needle */}
												<span className='absolute top-1/2 left-1/2 h-[400%] max-h-8 w-2 bg-white/80 -z-1'
													style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%, 50% 0)", transform: "translateX(-50%) translateY(-50%) translateY(-50%)" }}
												></span>
												{/* Bottom needle */}
												<span className='absolute top-1/2 left-1/2 h-[400%] max-h-8 w-2 bg-white/30 -z-1'
													style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%, 0 0)", transform: "translateX(-50%) translateY(-50%) translateY(50%)" }}
												></span>
											</span>
										</div>
									</div>

								</div>
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
							{/* <h3>Weather in {weather?.location?.name}</h3>
							<code style={{ whiteSpace: 'pre-wrap' }}>
								{JSON.stringify((weather), null, 2)}
							</code> */}
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default App;
