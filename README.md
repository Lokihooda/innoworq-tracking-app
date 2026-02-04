# Innoworq Tracking App

Real-time field service tracking system with WebSocket live location updates, ticket management, and mobile GPS integration for field engineers.

## 🚀 Features

- **Live Location Tracking**: Real-time GPS tracking via WebSocket
- **Shift Management**: Clock in/out with automatic shift tracking
- **Ticket Management**: Create, assign, and manage field service tickets
- **Engineer Dashboard**: Track multiple engineers on an interactive map
- **Background GPS**: Continuous location updates even when app is minimized
- **Offline Support**: Queue operations and sync when connectivity is restored

## 📁 Project Structure

```
innoworq-tracking-app/
├── backend/              # Django REST API + WebSocket server
│   ├── core/            # Project settings
│   ├── tracking/        # Main app (models, APIs, consumers)
│   ├── requirements.txt  # Python dependencies
│   └── manage.py
├── mobile/              # React Native / Flutter app
│   ├── lib/            # Flutter source
│   └── android/        # Android native config
├── dashboard/           # React web dashboard
│   ├── src/
│   └── package.json
├── docs/                # Documentation
└── .github/             # GitHub workflows
```

## 🛠 Tech Stack

**Backend**:
- Django 4.x + DRF
- Django Channels (WebSocket)
- PostgreSQL
- Redis (for Channels)

**Mobile**:
- Flutter / React Native
- Google Maps
- WorkManager / Background Services
- SQLite (local cache)

**Dashboard**:
- React 18
- Leaflet Maps
- Socket.IO / WebSocket client

## 📦 Getting Started

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Dashboard Setup

```bash
cd dashboard
npm install
npm start
```

### Mobile Setup

```bash
cd mobile
flutter pub get
flutter run
```

## 📝 API Endpoints

- `POST /api/auth/login/` - Engineer login
- `POST /api/engineers/` - Register engineer
- `GET /api/tickets/` - List tickets
- `POST /api/tickets/` - Create ticket
- `PATCH /api/tickets/{id}/` - Update ticket
- `WS /ws/location/` - WebSocket for live locations

## 🔐 Authentication

Token-based authentication with JWT.

## 📄 License

MIT License - see LICENSE file

## 👨‍💻 Contributors

Lokihooda (Project Lead)

## 📧 Contact

For issues and suggestions, please open a GitHub issue.
