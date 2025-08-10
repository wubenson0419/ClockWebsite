# [ClockWebsite]()
[English Version](README_EN.md)　[繁體中文版](README.md)
---
## Introduction

The ClockWebsite is a simple yet elegant web application that displays the current time in real-time. It allows users to customize the clock's color and font, making it suitable for learning, demonstrations, and personalized time-display needs.

## Features

  - **Real-Time Display**: Shows the current time with support for local time synchronization.
  - **Customization**: Users can customize the clock's display color and font. Preferences are saved locally in the browser.
  - **Full-Screen Mode**: Supports entering and exiting full-screen mode to enhance the user experience.
  - **PWA Support**: Can be installed as a Progressive Web App, supporting offline use (requires an internet connection for the initial load).
  - **Responsive Design**: Adapts to various devices, providing an optimal user experience on any screen.

## Instructions

1.  Open `index.html` to start the application.
2.  Use the customization panel in the top-right corner to adjust the display color and font.
3.  Click the full-screen button to enter full-screen mode, and click it again to exit.
4.  Click the reset button to restore the color and font to their default values.

## Project Structure

  - `index.html`: The main page, containing the basic structure and referenced resources.
  - `styles.css`: The stylesheet, defining the page's appearance and layout.
  - `scripts.js`: The JavaScript file, containing the logic for time updates, customization features, and full-screen functionality.
  - `manifest.json`: The PWA configuration file, which defines basic information about the application.
  - `sw.js`: The Service Worker, which implements the offline caching feature.
  - `ClockWebsite_04_19.png`: The application icon.
  - `ClockWebsite_icon.png`: The favicon.

## Installation and Deployment

1.  Download or clone the project files to your local machine.
2.  Open `index.html` in a web browser to use the application.
3.  To deploy to a server, upload all files to the server's root directory.

## Developer

  - **Author**: BensonWu

## License

This project is licensed under the [MIT License](./LICENSE). You are free to use, modify, and distribute this code, provided that you retain the original copyright notice and license terms.

## Font Sources

This project uses the following fonts:
- [Major Mono Display](https://fonts.google.com/specimen/Major+Mono+Display)
- [Arial](https://docs.microsoft.com/en-us/typography/font-list/arial)
- [Courier New](https://docs.microsoft.com/en-us/typography/font-list/courier-new)
- [Libertinus Mono](https://github.com/alerque/libertinus)
- [B612 Mono](https://github.com/polarsys/b612)
- [Xanh Mono](https://fonts.google.com/specimen/Xanh+Mono)
- [Sixtyfour](https://example.com/sixtyfour)