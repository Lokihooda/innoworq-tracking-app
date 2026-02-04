# Complete Setup Instructions - Innoworq Tracking App

## 📋 Prerequisites

Before starting, ensure you have the following installed:

- **Python 3.10+** - [Download](https://www.python.org/downloads/)
- **PostgreSQL 14+** - [Download](https://www.postgresql.org/download/)
- **Redis** - [Download](https://redis.io/download)
- **Node.js 18+ & npm** - [Download](https://nodejs.org/)
- **Flutter SDK 3.x** - [Download](https://flutter.dev/docs/get-started/install)
- **Git** - [Download](https://git-scm.com/downloads)
- **VS Code / Android Studio** - Code editor

---

## 🚀 Step-by-Step Execution Guide

### **STEP 1: Clone the Repository**

```bash
# Clone from GitHub
git clone https://github.com/Lokihooda/innoworq-tracking-app.git

# Navigate to project directory
cd innoworq-tracking-app
```

---

## 🔧 **BACKEND SETUP**

### **STEP 2: Create Python Virtual Environment**

```bash
# Navigate to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate

# On Mac/Linux:
source venv/bin/activate
```

### **STEP 3: Install Backend Dependencies**

```bash
# Install all Python packages
pip install -r requirements.txt
```

### **STEP 4: Initialize Django Project**

```bash
# Create Django project
django-admin startproject core .

# Create tracking app
python manage.py startapp tracking
```

### **STEP 5: Configure Database**

**Create PostgreSQL Database:**
```bash
# Open PostgreSQL shell
psql -U postgres

# Create database
CREATE DATABASE innoworq_tracking;

# Create user
CREATE USER innoworq_user WITH PASSWORD 'your_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE innoworq_tracking TO innoworq_user;

# Exit
\q
```

**Create `.env` file in backend folder:**
```bash
# Create .env file
touch .env
```

**Add to `.env`:**
```env
DEBUG=True
SECRET_KEY=your-secret-key-here-generate-using-django
DB_NAME=innoworq_tracking
DB_USER=innoworq_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
REDIS_URL=redis://localhost:6379
ALLOWED_HOSTS=localhost,127.0.0.1
```

### **STEP 6: Configure Django Settings**

Edit `core/settings.py` and add:

```python
import os
from decouple import config

# Add to INSTALLED_APPS
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third party
    'rest_framework',
    'rest_framework_simplejwt',
    'channels',
    'corsheaders',
    
    # Local apps
    'tracking',
]

# Add CORS middleware
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    # ... rest of middleware
]

# Database configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST'),
        'PORT': config('DB_PORT'),
    }
}

# CORS settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# Channels configuration
ASGI_APPLICATION = 'core.asgi.application'
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [(config('REDIS_URL'))],
        },
    },
}

# REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}
```

### **STEP 7: Create Django Models**

Edit `tracking/models.py`:

```python
from django.db import models
from django.contrib.auth.models import AbstractUser

class Engineer(AbstractUser):
    phone = models.CharField(max_length=15)
    employee_id = models.CharField(max_length=50, unique=True)
    is_on_shift = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'engineers'

class Ticket(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('assigned', 'Assigned'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    assigned_to = models.ForeignKey(Engineer, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'tickets'

class Location(models.Model):
    engineer = models.ForeignKey(Engineer, on_delete=models.CASCADE)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'locations'
        ordering = ['-timestamp']

class Shift(models.Model):
    engineer = models.ForeignKey(Engineer, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'shifts'
```

### **STEP 8: Update Django Settings for Custom User**

Add to `core/settings.py`:
```python
AUTH_USER_MODEL = 'tracking.Engineer'
```

### **STEP 9: Run Migrations**

```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

### **STEP 10: Start Redis Server**

```bash
# In a new terminal window
redis-server
```

### **STEP 11: Run Backend Server**

```bash
# Development server (REST API only)
python manage.py runserver

# OR with WebSocket support (recommended)
daphne -b 0.0.0.0 -p 8000 core.asgi:application
```

**Backend should now be running at:** `http://localhost:8000`

---

## 🌐 **DASHBOARD SETUP**

### **STEP 12: Navigate to Dashboard Folder**

```bash
# Open a new terminal
cd innoworq-tracking-app/dashboard
```

### **STEP 13: Initialize React App**

```bash
# Create React app
npx create-react-app .

# Install dependencies
npm install axios react-router-dom leaflet react-leaflet
```

### **STEP 14: Create Environment File**

```bash
# Create .env file
touch .env
```

**Add to `.env`:**
```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_WS_URL=ws://localhost:8000/ws
```

### **STEP 15: Run Dashboard**

```bash
npm start
```

**Dashboard should now be running at:** `http://localhost:3000`

---

## 📱 **MOBILE APP SETUP**

### **STEP 16: Navigate to Mobile Folder**

```bash
# Open a new terminal
cd innoworq-tracking-app/mobile
```

### **STEP 17: Create Flutter Project**

```bash
# Create Flutter project
flutter create .

# Get dependencies
flutter pub get
```

### **STEP 18: Add Flutter Dependencies**

Edit `pubspec.yaml` and add:

```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # HTTP & API
  dio: ^5.4.0
  
  # Location
  geolocator: ^10.1.0
  google_maps_flutter: ^2.5.0
  
  # Background tasks
  workmanager: ^0.5.2
  
  # Local database
  sqflite: ^2.3.0
  
  # WebSocket
  web_socket_channel: ^2.4.0
  
  # State management
  provider: ^6.1.1
```

Then run:
```bash
flutter pub get
```

### **STEP 19: Configure Android Permissions**

Edit `android/app/src/main/AndroidManifest.xml`:

```xml
<manifest>
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    
    <application>
        <!-- ... -->
    </application>
</manifest>
```

### **STEP 20: Run Mobile App**

```bash
# List available devices
flutter devices

# Run on connected device or emulator
flutter run

# OR build APK
flutter build apk --release
```

---

## ✅ **VERIFICATION STEPS**

### Check Backend:
```bash
# Test API
curl http://localhost:8000/api/

# Check admin panel
# Visit: http://localhost:8000/admin
```

### Check Dashboard:
```
# Visit: http://localhost:3000
```

### Check Mobile:
```bash
# Verify app is running on device/emulator
flutter doctor
```

---

## 🐛 **Troubleshooting**

### Issue: PostgreSQL connection error
**Solution:** Ensure PostgreSQL is running and credentials are correct in `.env`

### Issue: Redis connection error
**Solution:** Start Redis server: `redis-server`

### Issue: Port already in use
**Solution:** 
```bash
# Backend - use different port
python manage.py runserver 8001

# Dashboard - use different port
PORT=3001 npm start
```

### Issue: Flutter build errors
**Solution:**
```bash
flutter clean
flutter pub get
flutter doctor
```

---

## 📚 **Next Steps After Setup**

1. ✅ Create API views in `tracking/views.py`
2. ✅ Create serializers in `tracking/serializers.py`
3. ✅ Configure URLs in `tracking/urls.py`
4. ✅ Create WebSocket consumers in `tracking/consumers.py`
5. ✅ Build React components in `dashboard/src/components/`
6. ✅ Create Flutter screens in `mobile/lib/screens/`
7. ✅ Test end-to-end flow
8. ✅ Deploy to production

---

## 📧 **Support**

For issues or questions:
- Open a GitHub issue
- Check documentation in `/docs` folder
- Review architecture: `docs/ARCHITECTURE.md`

---

## 🎉 **Success!**

Your Innoworq Tracking App development environment is now ready!

All three components should be running:
- 🔧 Backend: http://localhost:8000
- 🌐 Dashboard: http://localhost:3000
- 📱 Mobile: On your device/emulator
