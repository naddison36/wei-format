## Installation

1. Clone or download this repository
2. Install dependencies: `npm install`
3. Build the extension: `npm run build`
4. Open Chrome and navigate to `chrome://extensions`
5. Enable "Developer mode" (toggle in the top-right corner)
6. Click "Load unpacked" and select the `dist/` folder

The Chain-Converters extension will now appear in your Chrome toolbar — look for this icon:

![Chain-Converters icon](src/Logo256.png)

## Running Tests

```bash
npm test
```

## How to Use

Wei to Eth

- Select a number on a web page
- Right-click and hover over "Chain-Converters" then select "Wei to Eth"
- Click the Chrome plug-in icon to view the result

- Changing the settings:
- Decimals: "18" will divide the number by 10^18 (one quintillion)
- Display Decimals: How many decimal places are shown (truncated, not rounded)

- For example,
- 123423400000000000000000 wei with decimals 18 and display decimals 18 is converted to 123,423.400,000,000,000,000,000

Hexadecimal converter

- Select a hex number on a web page
- Right-click and hover over "Chain-Converters" then select "Hex Converter"
- Click the Chrome plug-in icon to view the result
- The Hex converter converts the hexadecimal number to decimal then converts wei to eth like above

- For example,
- 1A22CBC176CD03440000 converts to 123423400000000000000000 then with 18 in both settings converts to 123,423.400,000,000,000,000,000

Unix Time Converter

- Select a unix timestamp in seconds on a web page
- Right-click and hover over "Chain-Converters" then select "Unix Timestamp Converter"
- Click the Chrome plug-in icon to view the result
- The top time is the time in your timezone and the bottom is in GMT

- For example,
- 1705320000 converts to Mon, 15 Jan 2024 12:00:00 GMT
