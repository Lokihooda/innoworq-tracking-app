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

## Deployment

### GitHub Pages Deployment

To deploy the dashboard on GitHub Pages:

1. **For Public Repositories:**
   - Go to Repository Settings > Pages
   - Select `main` branch as the source
   - GitHub will automatically deploy from the `dashboard/` directory
   - Access your dashboard at: `https://yourusername.github.io/innoworq-tracking-app/dashboard/`

2. **For Private Repositories:**
   - Option 1: Upgrade to GitHub Enterprise for private Pages
   - Option 2: Use GitHub Actions to deploy to a hosting service
   - Option 3: Deploy manually to services like Netlify, Vercel, or AWS S3

### Local Development & Testing

1. **Using Python:**
   ```bash
   cd dashboard
   python -m http.server 8000
   # Open http://localhost:8000 in your browser
   ```

2. **Using Node.js:**
   ```bash
   npm install -g http-server
   cd dashboard
   http-server
   ```

3. **Using Live Server (VS Code Extension):**
   - Install the Live Server extension
   - Right-click on `index.html` and select "Open with Live Server"

### Production Deployment Options

#### Netlify
1. Connect your GitHub repository
2. Set build command to: `# (leave empty for static site)`
3. Set publish directory to: `dashboard/`
4. Deploy with automatic previews on pull requests

#### Vercel
1. Import your GitHub repository
2. Set the root directory to `dashboard/`
3. Deploy with automatic deployments on every push

#### AWS S3 + CloudFront
1. Upload `dashboard/` files to S3 bucket
2. Configure CloudFront distribution
3. Point custom domain to CloudFront

## Features

### Dashboard Components
- **Sidebar Navigation:** Easy navigation between different sections
- **Stats Cards:** Display key metrics (Active Engineers, Completed Tickets, Pending Tickets, Total Distance)
- **Activity Chart:** Visual representation of engineer activity trends using Chart.js
- **Recent Activity Feed:** Real-time updates on dashboard activities
- **Engineer Table:** Comprehensive list of all active engineers with status and details
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile devices

### Functionality
- Search functionality for filtering engineers
- Filter options for charts (Last 7 Days, Last 30 Days, This Year)
- Notification system
- Engineer status indicators (Active, On Break, Offline)
- Interactive elements with hover effects
- Real-time location tracking integration ready

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Lightweight HTML (< 50KB)
- Optimized CSS with minimal dependencies
- Vanilla JavaScript (no jQuery required)
- Chart.js for efficient data visualization
- Font Awesome icons for consistent UI

## Future Enhancements

- Integration with backend API for real-time data
- WebSocket support for live location updates
- Advanced analytics and reporting
- Mobile app companion
- Dark mode toggle
- User authentication and role-based access
- Export functionality (PDF, CSV)

## Contributing

To contribute to this dashboard:

1. Create a feature branch: `git checkout -b feature/new-feature`
2. Make your changes and commit: `git commit -am 'Add new feature'`
3. Push to the branch: `git push origin feature/new-feature`
4. Submit a pull request

## Support

For issues or questions, please:
- Create an issue in the repository
- 
## Deployment

### Netlify

This dashboard is configured for automatic deployment to Netlify. The repository includes a `netlify.toml` configuration file that specifies the build and publish settings.

**To deploy to Netlify:**

1. Ensure the Netlify GitHub app is installed on your account
2. The app will automatically detect this repository and create a site
3. Each push to the main branch will trigger an automatic deployment

**Live Dashboard URL:** (Will be available once deployed to Netlify)

- Contact the development team
- Check the main README.md for general project information
