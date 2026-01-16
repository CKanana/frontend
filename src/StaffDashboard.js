
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StaffDashboard.css';
import ReplyModal from './ReplyModal';
import SuccessToast from './SuccessToast';



 const StaffDashboard = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const staffName = "Crystal";
  const pendingCount = 3;
  const gotoProfile = () => { navigate ('/profile')}
  const gotoStaffDashboard = () => { navigate ('/dashboard')}

  const initialFeedItems = [
    { id: 1, title: "Q3 Employee Satisfaction Survey", type: "Survey", status: "Pending", date: "2 hours ago" },
    { id: 2, title: "New IT Security Policy", type: "Policy", status: "Read Required", date: "1 day ago" },
    { id: 3, title: "Holiday Party Poll", type: "Poll", status: "Completed", date: "3 days ago" },
  ];
   
 const getUrgencyColor = (type) => {
  switch (type) {
    case 'Survey':
      return '#FF4B4B'; 
    case 'Policy':
      return '#FFB347';
    default:
      return '#4BCB6B'; 
  }
};
  const [items, setItems] = useState(initialFeedItems);
  const [replyingItem, setReplyingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  // Search and filter state
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterUrgency, setFilterUrgency] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const handleDelete = (id) => {
    setItemToDelete(id);
  };

  // confirmDelete function removed as it was unused

  const handleReplySubmit = (replyText, file) => {
    console.log('Submitting reply:', {
      itemId: replyingItem.id,
      replyText,
      file,
    });
    // Here you would typically send the data to a backend API
    setReplyingItem(null); // Close the modal on submit
    setShowSuccessToast(true); // Show success message
  };

  return (
    <div className="staff-dashboard">
      <aside className="sidebar-nav">
        <div className="sidebar-logo">
          <img src={process.env.PUBLIC_URL + '/vp-pic.png'} onClick={gotoStaffDashboard} alt="Virtual Pay Logo" className="dashboard-logo" />
        </div>
        <nav>
          <ul>
            <li tabIndex="0 "role="button">All Messages</li>
            <li tabIndex="0" role="button">My Responses</li>
            <li tabIndex="0" role="button" onClick={gotoProfile}>Profile</li>
            <li tabIndex="0" role="button" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Log Out</li>
        
          </ul>
        </nav>
      </aside>
      {/* Hamburger for mobile */}
      <button className="hamburger-menu" aria-label="Open navigation" onClick={() => setShowProfileMenu(v => !v)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      {/* Dropdown sidebar for mobile */}
      {showProfileMenu && (
        <div className="mobile-sidebar-dropdown">
          <div className="sidebar-logo">
            <img src={process.env.PUBLIC_URL + '/vp-pic.png'} alt="Virtual Pay Logo" className="dashboard-logo" />
          </div>
          <nav>
            <ul>
              <li tabIndex="0" role="button">Profile</li>
              <li tabIndex="0" role="button">My Responses</li>
              <li tabIndex="0" role="button">Groups</li>
              <li tabIndex="0" role="button" onClick={() => navigate('/settings')}>Settings</li>
              <li tabIndex="0" role="button" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Log Out</li>
            </ul>
          </nav>
        </div>
      )}
            {/* Bottom nav for mobile */}
            <nav className="bottom-nav" style={{ display: 'none' }}>
              <button className="bottom-nav-btn" onClick={() => {}}>
                <svg width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                <span>Profile</span>
              </button>
              <button className="bottom-nav-btn" onClick={() => {}}>
                <svg width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                <span>Responses</span>
              </button>
              <button className="bottom-nav-btn" onClick={() => {}}>
                <svg width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                <span>Groups</span>
              </button>
              <button className="bottom-nav-btn" onClick={() => {}}>
                <svg width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                <span>Settings</span>
              </button>
              <button className="bottom-nav-btn" onClick={() => navigate('/')}>
                <svg width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 16l4-4-4-4"/><path d="M21 12H3"/></svg>
                <span>Log Out</span>
              </button>
            </nav>
      <div className="dashboard-topbar">
        <div className="dashboard-icons">
          {/* Notification Icon */}
          <span className="dashboard-icon notification-icon" title="Notifications">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B24592" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </span>
          {/* Profile Icon */}
          <span className="dashboard-icon profile-icon" title="Profile" tabIndex={0} onClick={() => setShowProfileMenu(v => !v)}>
            <img src={process.env.PUBLIC_URL + '/profile-photo.png'} alt="Profile" className="profile-photo-thumb" />
          </span>
        </div>
        {showProfileMenu && (
          <div className="profile-menu">
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
        )}
      </div>
      <main className="dashboard-content with-sidebar">
        <section className="welcome-section">
          <h1>Welcome, {staffName}</h1>
          <p className="summary-text">You have <span className="highlight">{pendingCount} new surveys</span> to complete.</p>
          <div className="dashboard-search-bar" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search messages..."
              className="dashboard-search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: 2, minWidth: 180 }}
            />
            <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ flex: 1, minWidth: 110 }}>
              <option value="">All Types</option>
              <option value="Survey">Survey</option>
              <option value="Policy">Policy</option>
              <option value="Poll">Poll</option>
              <option value="Personal">Personal</option>
            </select>
            <select value={filterUrgency} onChange={e => setFilterUrgency(e.target.value)} style={{ flex: 1, minWidth: 110 }}>
              <option value="">All Urgency</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select value={filterDate} onChange={e => setFilterDate(e.target.value)} style={{ flex: 1, minWidth: 110 }}>
              <option value="">Any Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="older">Older</option>
            </select>
          </div>
        </section>

        <section className="feed-section">
          {items
 .filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
 .filter(item => filterType ? item.type === filterType : true)
 // Note: Urgency and Date filters are not implemented in this logic yet
 .map((item) => (
              <div key={item.id} className="feed-card">
                <div className="card-top">
                  <span className="urgency-dot" style={{ backgroundColor: getUrgencyColor(item.type) }}></span>
  <span className={`badge ${item.type.toLowerCase()}`}>{item.type}</span>
                  <span className="date">{item.date}</span>
                </div>
                <h3>{item.title}</h3>
                <div className="feed-actions">
                  <div className="feed-action-btns">
                    <button className="feed-action-btn reply" type="button" onClick={() => setReplyingItem(item)}>Reply</button>
                    <button className="feed-action-btn delete" type="button" onClick={() => handleDelete(item.id)}>Delete</button>
                    <button className="feed-action-btn archive" type="button">Archive</button>
                  </div>
                </div>
              </div>
            )
          )}
        </section>

      </main>
      {replyingItem && (
        <ReplyModal
          item={replyingItem}
          onClose={() => setReplyingItem(null)}
          onSubmit={handleReplySubmit}
        />
      )}


      {showSuccessToast && (
        <SuccessToast
          message="Your reply has been sent successfully!"
          onClose={() => setShowSuccessToast(false)}
        />
      )}
    </div>
  );
};
export default StaffDashboard;
