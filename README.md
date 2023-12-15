# Weather Application

Welcome to our weather application! This application offers a user-friendly platform to keep track of the weather conditions in your favorite cities.

## Features

- Search for cities using an autocomplete search bar
- View current weather data including temperature, weather condition, humidity, wind speed etc.
- 5 day forecast for easier planning
- Add cities to your favorites for quick access
- Remove cities from your favorites list
- Responsive design for mobile and desktop
- Clean and intuitive UI

## How it Works

1. **City Search:** Begin by typing the name of the city you're interested in into the search bar. Our application will provide a list of matching results.

2. **Weather Overview:** Click on your desired city from the search results. This will redirect you to a detailed page showing the current weather conditions of the selected city.

3. **City Tracking:** To keep an eye on the weather of a particular city, click on the plus icon located at the top right corner of the current weather card. This action will add the city to your favorites on the home page, allowing you to access its weather information anytime.

4. **Removing a City:** If you decide to stop tracking a city, you can do it from either the home page or while looking at a specific city.

   - **From the Home Page:** Look for the city card of the city you want to remove. In the top right corner of the city card, you'll see a minus icon. Simply click on this icon to stop tracking the city.
   - **From a Specific City's Page:** If you're currently viewing a specific city's weather, you can also remove the city from there. Look for the minus icon, located near the city's name in the top right corner of the city card. Clicking on this icon will stop tracking the city.

5. **Navigating Back to the Home Page:** To go back to the home page at any time, simply click on the "Weather Application" logo, located in the top left corner of the page. This will take you back to the home page where you can see all your tracked cities.

This application is designed to provide you with real-time weather updates and allows for easy navigation between your tracked cities. Enjoy staying ahead of the weather!

## Built With

- [Vue.js](https://vuejs.org/) - The web framework used
- [TypeScript](https://www.typescriptlang.org/) - For static type checking
- [Tailwind CSS](https://tailwindcss.com/) - For styles
- [Vue Router](https://router.vuejs.org/) - For routing
- [Pinia](https://pinia.esm.dev/) - State management
- [Axios](https://axios-http.com/) - Promise based HTTP client
- [VueUse](https://vueuse.org/) - Collection of useful composition APIs

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## APIs

This app uses two external APIs:

### [OpenWeather API](https://openweathermap.org/api)

Used to fetch weather data. Requires an API key.

Base URL: `https://api.openweathermap.org/data/2.5`

Some endpoints used:

- `/weather` - Current weather by city name
- `/forecast` - 5 day forecast by city name

### [LocationIQ API](https://locationiq.com/docs)

Used for city search. Requires an API key.

Base URL: `https://us1.locationiq.com/v1`

Some endpoints used:

- `/autocomplete` - Autocomplete for cities by name

## Environment Variables

This app uses environment variables to manage sensitive data. You need to create a `.env` file in the root of your project and add the following variables:

```properties
VITE_LOCATIONIQ_API_KEY= your_locationiq_api_key
VITE_OPENWEATHER_API_KEY= your_openweather_api_key
VITE_BASE_LOCATION_URL= https://us1.locationiq.com/v1
VITE_BASE_WEATHER_URL= https://api.openweathermap.org/data/2.5
```

## Deployment

The app is deployed on [Netlify](https://www.netlify.com/).

You can view the live site here: [https://voluble-palmier-d3f2d0.netlify.app](https://voluble-palmier-d3f2d0.netlify.app)

It automatically deploys from the main branch on GitHub.
