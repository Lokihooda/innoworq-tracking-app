// Dashboard JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeChart();
    setupEventListeners();
    loadDashboardData();
});

// Initialize Chart.js for activity chart
function initializeChart() {
    const ctx = document.getElementById('myChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: 'Completed Tickets',
                        data: [12, 19, 15, 25, 22, 30, 28],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Active Engineers',
                        data: [8, 15, 12, 20, 18, 25, 22],
                        borderColor: '#667eea',
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Setup event listeners
function setupEventListeners() {
    const searchBox = document.querySelector('.search-box input');
    if (searchBox) {
        searchBox.addEventListener('input', function(e) {
            handleSearch(e.target.value);
        });
    }
    
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', showNotifications);
    }
    
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    const addEngineerBtn = document.querySelector('.btn-primary');
    if (addEngineerBtn) {
        addEngineerBtn.addEventListener('click', showAddEngineerModal);
    }
    
    const filterDropdown = document.querySelector('.filter-dropdown');
    if (filterDropdown) {
        filterDropdown.addEventListener('change', function(e) {
            updateChartData(e.target.value);
        });
    }
}

// Handle search functionality
function handleSearch(query) {
    const table = document.querySelector('.data-table tbody');
    if (!table) return;
    
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
    });
}

// Show notifications
function showNotifications() {
    const notifications = [
        'Ticket #1024 has been completed',
        'New engineer Rajesh Kumar assigned to Sector 62',
        'System maintenance scheduled for tonight'
    ];
    
    alert('Notifications:\n' + notifications.join('\n'));
}

// Show add engineer modal
function showAddEngineerModal() {
    alert('Add Engineer Modal - Feature to be implemented');
}

// Update chart data based on selected time period
function updateChartData(period) {
    console.log('Updating chart for period: ' + period);
    // Chart update logic would go here
}

// Load dashboard data
function loadDashboardData() {
    console.log('Loading dashboard data...');
    // In a real application, this would fetch data from an API
    console.log('Dashboard data loaded successfully');
}

// Format date helper
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Export functions for testing
window.DashboardUtils = {
    handleSearch,
    formatDate,
    showNotifications
};
