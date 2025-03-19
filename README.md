# Cricket Live Scores Browser Extension

A lightweight browser extension that provides real-time cricket scores directly in your browser.

![Cricket Live Scores Extension](https://via.placeholder.com/800x400?text=Cricket+Live+Scores+Extension)

## Features
- Live cricket match updates
- One-click refresh
- Match status indicators (live, upcoming, completed)
- Detailed match info (scores, overs, wickets)
- Error handling for network issues
- Clean and responsive UI

## Installation
Since the extension is not yet published, install it manually in developer mode.

### Chrome / Edge / Brave
1. Download or clone the repository:
   ```bash
   git clone https://github.com/adithya-naik/cric-live-score.crx
   ```
2. Open your browser and go to the extensions page:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension folder

### Firefox
1. Download or clone the repository:
   ```bash
   git clone https://github.com/adithya-naik/cric-live-score.crx
   ```
2. Open Firefox and go to `about:debugging`
3. Click "This Firefox" > "Load Temporary Add-on"
4. Select `manifest.json` from the extension folder

## Usage
1. Click the extension icon to open the popup
2. View the latest cricket matches
3. Click refresh to update scores
4. Match details include type, date, teams, scores, status, and venue

## API Setup
1. Get a free API key from [Cricket API](https://cricapi.com/)
2. Replace the placeholder key in `popup.js`:
   ```javascript
   const apiKey = "YOUR_API_KEY_HERE";
   ```

## Project Structure
```
cricket-live-scores/
├── manifest.json       # Extension config
├── popup.html          # Popup UI
├── popup.js            # API calls & UI logic
├── styles.css          # Styling
```

## Development
1. Make changes to files as needed
2. Reload the extension in your browser
   - Chrome/Edge/Brave: Click refresh on the extensions page
   - Firefox: Click "Reload" in about:debugging

## Limitations
- Free API accounts have request limits
- Requires an internet connection
- Match data updates depend on the API

## Contributing
1. Fork the repo
2. Create a branch (`git checkout -b feature-name`)
3. Make changes and commit (`git commit -m 'Added feature'`)
4. Push and open a Pull Request

## Acknowledgements
- [Cricket API](https://cricapi.com/) for match data
- [Lucide Icons](https://lucide.dev/) for UI icons

---
Made with ❤️ for cricket fans!

