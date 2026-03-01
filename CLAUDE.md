# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run build      # Build extension with Parcel (outputs to dist/)
npm run clean      # Remove all files in dist/
npm run prettier   # Format all files with Prettier
npm test           # Run Jest tests
```

## Architecture

This is a **Chrome Manifest V3 extension** ("Chain-Converters") built with Parcel bundler. It has three components:

- **`src/background.js`** — Service worker that registers three context menu items (`weiConverter`, `hexConverter`, `timeConverter`). When a user right-clicks selected text and picks a menu item, the raw selected text and conversion type are stored in `chrome.storage.local`.

- **`src/popup.html` / `src/popup.js`** — The extension popup UI. On load, `popup.js` reads `selectedStr` and `conversionType` from `chrome.storage.local`, calls the appropriate converter from `converters.js`, and renders the result. For wei/hex conversions, a settings form allows adjusting `decimals` and `displayDecimals` (persisted to storage). For unix time, the decimals form is hidden and two timestamps are shown (local timezone + UTC).

- **`src/converters.js`** — Pure conversion logic (no Chrome APIs), exported via `module.exports` for testability:
  - `convertWei(num, decimals, displayDecimals)` — Divides a large integer by 10^decimals using `BigInt`, formats whole and decimal parts with comma grouping every 3 digits.
  - `convertHex(preConverted)` — Converts a hex string to `BigInt` (prepends `0` if odd-length).
  - `convertUnix(preConverted)` — Converts a Unix timestamp (seconds) to local timezone and UTC strings.

- **`test/format.test.js`** — Jest tests for `converters.js`. Note: tests import `converter` (a unified function) but `src/converters.js` currently exports `convertWei`, `convertHex`, `convertUnix` separately — the tests reference a refactored API signature `converter(str, decimals, displayDecimals, type)` that may not yet be fully implemented.

## Code Style

Prettier config (`.prettierrc.yaml`): single quotes, no semicolons, 4-space tabs for `.js` files, 100-char print width, trailing commas in ES5 positions.
