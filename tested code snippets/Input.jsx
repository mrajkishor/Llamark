import React from 'react';
import UserCard from './UserCard';
import NotificationBanner from './NotificationBanner';
import ReportTable from './ReportTable';
import SettingsModal from './SettingsModal';

function EnterpriseDashboard({ user, notifications, reports }) {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome back, {user.name}</h1>
                <button onClick={() => console.log('Settings clicked')}>Settings</button>
            </header>

            <NotificationBanner items={notifications} />

            <section className="user-section">
                <h2>User Overview</h2>
                <UserCard user={user} />
            </section>

            <section className="report-section">
                <h2>Latest Reports</h2>
                <ReportTable reports={reports} />
            </section>

            <section className="quick-actions">
                <h3>Quick Actions</h3>
                <button>Generate Report</button>
                <button onClick={() => alert('Sync started')}>Sync Data</button>
                <button disabled>Archive All</button>
            </section>

            <footer className="footer">
                <span>© 2025 Enterprise Inc.</span>
            </footer>

            <SettingsModal open={false} />
        </div>
    );
}

export default EnterpriseDashboard;
