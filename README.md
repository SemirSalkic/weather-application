# Weather Application

Welcome to our weather application! This application is built with Vue 3, TypeScript, and Tailwind CSS, and offers a user-friendly platform to keep track of the weather conditions in your favorite cities.

## How it Works

1. **City Search:** Begin by typing the name of the city you're interested in into the search bar. Our application will provide a list of matching results.

2. **Weather Overview:** Click on your desired city from the search results. This will redirect you to a detailed page showing the current weather conditions of the selected city.

3. **City Tracking:** To keep an eye on the weather of a particular city, click on the plus icon located at the top right corner of the current weather card. This action will add the city to your favorites on the home page, allowing you to access its weather information anytime.

4. **Removing a City:** If you decide to stop tracking a city, you can do it from either the home page or while looking at a specific city.
    - **From the Home Page:** Look for the city card of the city you want to remove. In the top right corner of the city card, you'll see a minus icon. Simply click on this icon to stop tracking the city.
    - **From a Specific City's Page:** If you're currently viewing a specific city's weather, you can also remove the city from there. Look for the minus icon, located near the city's name in the top right corner of the city card. Clicking on this icon will stop tracking the city.

5. **Navigating Back to the Home Page:** To go back to the home page at any time, simply click on the "Weather Application" logo, located in the top left corner of the page. This will take you back to the home page where you can see all your tracked cities.

This application is designed to provide you with real-time weather updates and allows for easy navigation between your tracked cities. Enjoy staying ahead of the weather!

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
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
