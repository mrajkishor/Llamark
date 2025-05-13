import React from 'react';
import UserCard from './UserCard';
import NotificationBanner from './NotificationBanner';
import ReportTable from './ReportTable';
import SettingsModal from './SettingsModal';

// change something here, stage and run git commit to see the change (test)
function EnterpriseDashboard({ user, notifications, reports }) {
    return (
        <div className="dashboard-container" data-trackid="dashboardContainer">
            <header className="dashboard-header" data-trackid="autoTrack-s9vg04">
                <h1 data-trackid="welcomeBackID">Welcome back, {user.name}</h1>
                <button
                    onClick={() => console.log('Settings clicked')}
                    data-trackid="settingsTrackId">Settings</button>
            </header>
            <NotificationBanner items={notifications} data-trackid="autoTrack-sr3j33" />
            <section className="user-section" data-trackid="userSection">
                <h2 data-trackid="userOverviewId">User Overview</h2>
                <UserCard user={user} data-trackid="autoTrack-322j3t" />
            </section>
            <section className="report-section" data-trackid="reportSection">
                <h2 data-trackid="latestReports">Latest Reports</h2>
                <ReportTable reports={reports} data-trackid="reportId" />
            </section>
            <section className="quick-actions" data-trackid="quickActions">
                <h3 data-trackid="quickActionsId">Quick Actions</h3>
                <button data-trackid="generateReport">Generate Report</button>
                <button onClick={() => alert('Sync started')} data-trackid="syncDataId">Sync Data</button>
                <button disabled data-trackid="archiveAll">Archive All</button>
            </section>
            <footer className="footer" data-trackid="footer-copyright">
                <span data-trackid="e25ei">© 2025 Enterprise Inc.</span>
            </footer>
            <SettingsModal open={false} data-trackid="settingsModalOpenFalse" />
        </div>
    );
}

export default EnterpriseDashboard;