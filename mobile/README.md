# Mobile App - Innoworq Tracking App

## Flutter Mobile App for Field Engineers

### Setup Instructions

#### 1. Install Flutter SDK
Follow official guide: https://flutter.dev/docs/get-started/install

#### 2. Install Dependencies
```bash
flutter pub get
```

#### 3. Configure API Endpoint
Edit `lib/config/api_config.dart`:
```dart
const String API_URL = 'http://your-server:8000/api';
const String WS_URL = 'ws://your-server:8000/ws';
```

#### 4. Run on Device/Emulator
```bash
flutter run
```

#### 5. Build APK
```bash
flutter build apk --release
```

### Features
- Engineer login/authentication
- Clock in/out for shifts
- Real-time GPS tracking
- Background location updates
- View assigned tickets
- Update ticket status
- Offline support with sync
- Push notifications

### Permissions Required
- Location (GPS)
- Background location
- Internet
- Notification

### Tech Stack
- Flutter 3.x
- Dart
- Google Maps Flutter
- Geolocator
- WorkManager (background tasks)
- Dio (HTTP client)
- WebSocket
- Sqflite (local database)

### Project Structure
```
mobile/
├── lib/
│   ├── config/
│   │   └── api_config.dart
│   ├── models/
│   │   ├── engineer.dart
│   │   ├── ticket.dart
│   │   └── location.dart
│   ├── services/
│   │   ├── api_service.dart
│   │   ├── location_service.dart
│   │   ├── auth_service.dart
│   │   └── websocket_service.dart
│   ├── screens/
│   │   ├── login_screen.dart
│   │   ├── dashboard_screen.dart
│   │   └── ticket_detail_screen.dart
│   ├── widgets/
│   └── main.dart
├── android/
├── ios/
├── pubspec.yaml
└── README.md
```

### Background Location
The app uses WorkManager to track location even when app is closed:
- Updates every 5 minutes
- Batches updates when offline
- Syncs when connectivity restored
