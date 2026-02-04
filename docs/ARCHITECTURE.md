# System Architecture - Innoworq Tracking App

## Overview
Real-time field service tracking system with GPS location monitoring, ticket management, and engineer coordination.

## High-Level Architecture

```
┌─────────────────┐         ┌─────────────────┐
│  Mobile App     │◄────────►│   Backend API   │
│  (Flutter)      │  REST/WS │  (Django)       │
└─────────────────┘         └─────────────────┘
                                    │
                                    │
                                    ▼
┌─────────────────┐         ┌─────────────────┐
│  Dashboard      │◄────────►│   PostgreSQL    │
│  (React)        │  REST/WS │   Database      │
└─────────────────┘         └─────────────────┘
                                    │
                                    ▼
                            ┌─────────────────┐
                            │   Redis Cache   │
                            │   & Channels    │
                            └─────────────────┘
```

## Components

### 1. Mobile App (Flutter)
**Purpose**: Field engineer interface

**Features**:
- Login/Authentication
- Shift clock in/out
- Background GPS tracking
- Ticket viewing and updates
- Offline mode with sync

**Tech Stack**:
- Flutter 3.x
- Google Maps
- WorkManager (background)
- Sqflite (local DB)

### 2. Backend (Django)
**Purpose**: API server and business logic

**Features**:
- RESTful API (Django REST Framework)
- WebSocket support (Django Channels)
- Real-time location broadcasting
- Authentication (JWT)
- Database ORM

**Tech Stack**:
- Django 4.x
- DRF (REST API)
- Channels (WebSocket)
- PostgreSQL
- Redis

### 3. Dashboard (React)
**Purpose**: Admin/manager interface

**Features**:
- Real-time map view
- Engineer tracking
- Ticket management
- Shift monitoring
- Analytics

**Tech Stack**:
- React 18
- Leaflet Maps
- WebSocket client
- Material-UI/Tailwind

### 4. Database (PostgreSQL)
**Purpose**: Persistent data storage

**Tables**:
- Engineers
- Tickets
- Locations
- Shifts
- Users

### 5. Cache/Message Broker (Redis)
**Purpose**: WebSocket channels and caching

**Usage**:
- Django Channels layer
- Session storage
- Rate limiting

## Data Flow

### Location Tracking Flow
```
1. Mobile App (GPS) → Background Service
2. Background Service → REST API (POST /api/locations/)
3. Django View → Save to PostgreSQL
4. Django View → Broadcast via WebSocket
5. Redis Channels → All connected dashboard clients
6. Dashboard receives → Updates map marker
```

### Ticket Creation Flow
```
1. Dashboard → POST /api/tickets/
2. Django creates ticket → Assigns to engineer
3. Notification sent → Mobile app via push/WebSocket
4. Engineer receives → Views ticket details
5. Engineer updates status → PATCH /api/tickets/{id}/
6. Dashboard receives update → UI refreshes
```

## API Endpoints

### Authentication
- `POST /api/auth/login/` - JWT token generation
- `POST /api/auth/refresh/` - Token refresh

### Engineers
- `GET /api/engineers/` - List all
- `POST /api/engineers/` - Create
- `GET /api/engineers/{id}/` - Detail
- `PATCH /api/engineers/{id}/` - Update

### Tickets
- `GET /api/tickets/` - List (with filters)
- `POST /api/tickets/` - Create
- `GET /api/tickets/{id}/` - Detail
- `PATCH /api/tickets/{id}/` - Update status

### Locations
- `POST /api/locations/` - Submit location
- `GET /api/locations/engineer/{id}/` - History

### Shifts
- `POST /api/shifts/start/` - Clock in
- `POST /api/shifts/end/` - Clock out
- `GET /api/shifts/` - List shifts

### WebSocket
- `WS /ws/location/` - Real-time location updates
- `WS /ws/tickets/` - Real-time ticket updates

## Security

### Authentication
- JWT tokens (access + refresh)
- Token expiry: 1 hour access, 7 days refresh

### API Security
- HTTPS only in production
- CORS configured
- Rate limiting (Redis)
- SQL injection protection (ORM)

### Data Privacy
- Location data encrypted in transit
- PII anonymized in logs
- GDPR compliant data retention

## Deployment

### Backend
- Docker container
- Daphne ASGI server
- PostgreSQL (managed)
- Redis (managed)

### Dashboard
- Static build (npm run build)
- Served via Nginx/CDN

### Mobile
- APK build
- Google Play Store deployment

## Monitoring
- Backend: Django logging + Sentry
- Database: PostgreSQL logs
- Mobile: Firebase Crashlytics

## Scalability
- Horizontal scaling: Multiple Django instances behind load balancer
- Redis cluster for Channels
- Database read replicas
- CDN for dashboard assets
