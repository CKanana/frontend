import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import './StaffDashboard.css';

const Profile = () => {
    // Hardcoded user info for demo
    const user = {
        name: 'Crystal',
        email: 'crystal@example.com',
        department: 'HR'
    };
    const [photo, setPhoto] = useState(null);
    const navigate = useNavigate();
    const gotoStaffDashboard = () => {navigate ('/dashboard')}

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setPhoto(ev.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const [showProfileMenu, setShowProfileMenu] = useState(false);
    return (
        <div className="profile-page-bg" style={{ position: 'relative' }}>
            {/* Sidebar from StaffDashboard */}
            <aside className="sidebar-nav">
                <div className="sidebar-logo">
                    <img src={process.env.PUBLIC_URL + '/vp-pic.png'} onClick={gotoStaffDashboard} alt="Virtual Pay Logo" className="dashboard-logo" />
                </div>
                <nav>
                    <ul>
                        <li tabIndex="0 "role="button">All Messages</li>
                        <li tabIndex="0" role="button">My Responses</li>
                        <li tabIndex="0" role="button" style={{fontWeight: 'bold', color: '#B24592'}}>Profile</li>
                        <li tabIndex="0" role="button" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Log Out</li>
                    </ul>
                </nav>
            </aside>
            <div className="dashboard-topbar" style={{ position: 'relative' }}>
                <div className="dashboard-icons">
                    <span className="dashboard-icon notification-icon" title="Notifications">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B24592" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                    </span>
                    <span className="dashboard-icon profile-icon" title="Profile" tabIndex={0} onClick={() => setShowProfileMenu(v => !v)}>
                        <img src={process.env.PUBLIC_URL + '/profile-photo.png'} alt="Profile" className="profile-photo-thumb" />
                    </span>
                </div>
                {showProfileMenu && (
                    <div className="profile-menu-overlay" onClick={() => setShowProfileMenu(false)}>
                        <div className="profile-menu" onClick={e => e.stopPropagation()}>
                            <div className="profile-menu-header">
                                <img src={process.env.PUBLIC_URL + '/profile-photo.png'} alt="Profile" className="profile-photo-large" />
                                <div className="profile-menu-name">Crystal</div>
                                <div className="profile-menu-role">Staff Member</div>
                            </div>
                            <ul className="profile-menu-list">
                                <li>Email: crystal@example.com</li>
                                <li>Department: HR</li>
                                <li>Location: Nairobi</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
            <div className="profile-card-center">
                <div className="profile-card">
                    <form className="profile-form">
                        <h1 className="profile-title">Edit Profile</h1>
                        <img
                            src={photo || process.env.PUBLIC_URL + "/profile-photo.png"}
                            alt="Profile Preview"
                            className="pfp-preview"
                        />
                        <input
                            type="file"
                            className="pfp-input"
                            accept="image/*"
                            onChange={handlePhotoChange}
                        />
                        <input type="text" className="name-input" placeholder={user.name} />
                        <input type="email" className="email-input" placeholder={user.email} />
                        <input type="text" className="department-input" placeholder={user.department} />
                        <button type="submit" className="save-button">Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

    export default Profile;