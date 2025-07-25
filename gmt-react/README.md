# Vigovia Travel Portal

A project as part of the intern selection process for the company **Vigovia**.

## Project Overview

This is a modern React-based travel portal for Vigovia, featuring:
- Destination itineraries for Malaysia, Srilanka, Paris, Barcelona, and Rome
- Full-width destination videos
- Interactive seasonal info and visa details
- Blogs section, FAQ, and Explore More
- Responsive design with dark/light theme toggle
- Login/Signup modal and page
- Static footer and header with country/language selection

## Features
- **Dynamic Destination Pages:**
  - Each destination (Malaysia, Srilanka, Paris, Barcelona, Rome) has its own page with a full-width video and a detailed multi-day itinerary.
- **Seasonal Info:**
  - Special modal popups for seasonal travel essentials and visa information.
- **Blogs Section:**
  - Card-style blog previews for travel inspiration.
- **Explore More:**
  - Clickable destinations with circular images.
- **FAQ Section:**
  - Frequently asked questions in a modern layout.
- **Dark/Light Theme:**
  - Toggle between dark and light modes with custom icons.
- **Login/Signup:**
  - Modal and page for user authentication.
- **Footer:**
  - Static, styled footer with company/contact info and quick links.

## Getting Started

### Prerequisites
- Node.js (v16 or above recommended)
- npm (v8 or above)

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd gmt-react
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
   The app will run at [http://localhost:3000](http://localhost:3000).

### Project Structure
- `src/components/` — All React components (Hero, Footer, Header, Modals, etc.)
- `src/assets/` — Images and videos for destinations
- `src/App.tsx` — Main app with routing

### Adding/Editing Destinations
- To add a new destination, update `ComingSoon.tsx` with the video and itinerary for the new place.
- Place the video file in `src/assets/` and reference it in the `videoMap`.

## Scripts
- `npm start` — Start the development server
- `npm run build` — Build for production
- `npm test` — Run tests

## Notes
- This project is for demonstration and evaluation purposes as part of the Vigovia intern selection process.
- All assets (videos/images) are for sample/demo use only.

## License
This project is proprietary and for Vigovia's internal use only.