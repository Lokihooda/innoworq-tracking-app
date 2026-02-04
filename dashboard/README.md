# Dashboard - Innoworq Tracking App

## React Web Dashboard for Engineer Tracking

### Setup Instructions

#### 1. Install Dependencies
```bash
npm install
# or
yarn install
```

#### 2. Configure Environment
Create `.env` file:
```
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_WS_URL=ws://localhost:8000/ws
```

#### 3. Run Development Server
```bash
npm start
# or
yarn start
```

#### 4. Build for Production
```bash
npm run build
# or
yarn build
```

### Features
- Real-time engineer location tracking on map
- Ticket management interface
- Engineer status monitoring
- Shift tracking
- Interactive map with Leaflet
- WebSocket live updates

### Tech Stack
- React 18
- React Router v6
- Leaflet Maps
- Axios for REST API
- WebSocket client for live updates
- Material-UI / Tailwind CSS

### Project Structure
```
dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── Map.jsx
│   │   ├── EngineerList.jsx
│   │   ├── TicketList.jsx
│   │   └── Navbar.jsx
│   ├── services/
│   │   ├── api.js
│   │   └── websocket.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   └── Login.jsx
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md
```
