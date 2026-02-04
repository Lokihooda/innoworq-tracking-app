# Backend - Innoworq Tracking App

## Setup Instructions

### 1. Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Setup Database
```bash
# Create PostgreSQL database
createdb innoworq_tracking

# Run migrations
python manage.py makemigrations
python manage.py migrate
```

### 4. Create Superuser
```bash
python manage.py createsuperuser
```

### 5. Run Development Server
```bash
python manage.py runserver
```

### 6. Run with Channels (WebSocket Support)
```bash
daphne -b 0.0.0.0 -p 8000 core.asgi:application
```

## Project Structure
```
backend/
├── core/              # Project settings
│   ├── settings.py    # Main settings
│   ├── urls.py        # URL routing
│   ├── asgi.py        # ASGI config for WebSocket
│   └── wsgi.py        # WSGI config
├── tracking/         # Main app
│   ├── models.py     # Database models
│   ├── views.py      # API views
│   ├── serializers.py # DRF serializers
│   ├── consumers.py  # WebSocket consumers
│   ├── routing.py    # WebSocket routing
│   └── urls.py       # App URLs
├── requirements.txt  # Dependencies
└── manage.py
```

## Environment Variables
Create a `.env` file:
```
DEBUG=True
SECRET_KEY=your-secret-key-here
DB_NAME=innoworq_tracking
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432
REDIS_URL=redis://localhost:6379
```

## API Endpoints

### Authentication
- `POST /api/auth/login/` - Login
- `POST /api/auth/register/` - Register engineer

### Engineers
- `GET /api/engineers/` - List engineers
- `GET /api/engineers/{id}/` - Get engineer details
- `PATCH /api/engineers/{id}/` - Update engineer

### Tickets
- `GET /api/tickets/` - List tickets
- `POST /api/tickets/` - Create ticket
- `PATCH /api/tickets/{id}/` - Update ticket
- `GET /api/tickets/{id}/` - Get ticket details

### Locations
- `POST /api/locations/` - Submit location
- `GET /api/locations/engineer/{id}/` - Get engineer location history

### WebSocket
- `WS /ws/location/` - Real-time location updates
