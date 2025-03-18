// import { useState } from 'react';
import { useState } from 'react';
import './App.css';
import { WEATHER_API_KEY } from './api/api';
import axios from 'axios';
import { DotOutline, Drop, DropHalf, Eye, Quotes, RainbowCloud, Spinner, Thermometer } from '@phosphor-icons/react';
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

	// let data = JSON.parse(JSON.stringify(weather));
	// console.log(weather?.timelines?.minutely[0]?.values?.temperature);
	// console.log(
	// 	JSON.parse(JSON.stringify(weather))
	// 	// JSON.parse(JSON.parse(JSON.stringify(weather)))
	// );
	// console.log(typeof weather);

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

				<div className='max-w-6xl mx-auto flex flex-col md:flex-row gap-4 p-3 md:p-4 lg:p-6 image-bg rounded-3xl'>
					{/* First */}
					<div className="flex flex-col md:flex-1">
						<SearchBar search={fetchWeather} className="mb-4" />

						<div className="flex-1 p-4 rounded-xl bg-linear-to-b from-black/35 to-white/30">
							<div className='text-gray-200 mb-15'>
								<h2 className='text-center text-blue-300'>Weather in {weather?.location?.name}</h2>
								<div className="mx-auto mb-3 mt-15 w-fit text-center relative text-6xl">
									{weather?.timelines?.minutely[0]?.values?.temperature} <DotOutline size={40} className='absolute top-0 end-0 translate-x-7' />
								</div>
								<div className="text-center text-3xl font-semibold mb-4">Rainy Day</div>
								<p className='text-xs text-center'>
									Today, expect a rainy day with occasional showers throughout the afternoon. The temperature will remain cool, so make sure to carry an umbrella and wear a waterproof jacket.
								</p>
							</div>
							<div className='flex flex-wrap text-gray-200'>
								{/*  */}
								<div className="w-[50%] shrink-0 p-1 sm:p-2 ps-0">
									<div className='h-full p-2 md:p-3 rounded-md bg-black/40 backdrop-blur-md'>
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
									<div className='h-full p-2 md:p-3 rounded-md bg-black/40 backdrop-blur-md'>
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
									<div className='h-full p-2 md:p-3 rounded-md bg-black/40 backdrop-blur-md'>
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
									<div className='h-full p-2 md:p-3 rounded-md bg-black/40 backdrop-blur-md'>
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
					<div className="md:flex-1 bg-white/10">
						<code className='text-gray-200' style={{ whiteSpace: 'pre-wrap' }}>
							{JSON.stringify((weather?.timelines?.minutely[0].values), null, 2)}
						</code>
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
