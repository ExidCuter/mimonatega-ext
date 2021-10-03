# Mimonatega Extension

This Firefox/Chrome extension allows users to compare prices of items on web shop [https://www.mimovrste.com](https://www.mimovrste.com)

## How to build and run

This extension is written with help of React and is build with `npm`.

To build and run the extension run the following commands in the terminal:
1. `npm install -g web-ext` installs web-ext (CLI tool for extension development)
2. `npm install` downloads all the projects dependencies
3. `npm run build-chrome` OR `npm run build-friefox` compiles React source to plain HTML, CSS and JS for Chrome or Firefox
4. `npm run run-firefox` runs the extension in dev version of Firefox (For Chrome manually add it to `chrome://extensions/`)

