# Weather App

An intuitive Weather App that provides accurate and up-to-date weather forecasts for any chosen region, ensuring you stay informed and prepared.

## Features

- Real-time weather updates.
- Location-based search for weather forecasts.
- Displays temperature, humidity, wind speed, and more.
- User-friendly interface built with React.

## Technologies Used

- **React**: Frontend library for building a responsive user interface.
- **Vite**: Lightning-fast development environment and build tool.
- **Tailwind CSS**: Styling with utility-first CSS classes.
- **Axios**: For handling API calls efficiently.
- **OpenWeatherMap API**: To fetch accurate weather data.

## Installation and Usage

1. Clone this repository:

   ```bash
   git clone https://github.com/Hirwa9/weather-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd weather-app/frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to [http://localhost:5173](http://localhost:5173).

## Project Structure

- `src/`: Contains React components and logic.
- `public/`: Static assets such as images and the `index.html` file.
- `vite.config.js`: Configuration for Vite.
- `.env`: Environment variables for API keys (e.g., OpenWeatherMap).

## Environment Variables

Create a `.env` file in the root directory and include your OpenWeatherMap API key:

```env
VITE_WEATHER_API_KEY=your_api_key_here
```

## Future Improvements

- Add hourly weather predictions.
- Include interactive charts for weather trends.
- Implement offline capabilities for saved weather data.

## Contributing

Contributions are welcome! Feel free to open a pull request or submit an issue for ideas or improvements.

---

Built with 💙 using React and Vite.
