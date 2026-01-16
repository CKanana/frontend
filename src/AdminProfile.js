import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [admin, setAdmin] = useState({
    name: 'Admin User',
    email: 'admin@company.com',
    role: 'Administrator',
    phone: '',
    organization: 'Virtual Pay',
  });

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

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save admin profile logic here
    alert('Profile updated!');
  };

  return (
    <div className="admin-profile-bg">
      <aside className="sidebar-nav">
        <div className="sidebar-logo">
          <img src={process.env.PUBLIC_URL + '/vp-pic.png'} onClick={() => navigate('/admin')} alt="Virtual Pay Logo" className="dashboard-logo" />
        </div>
        <nav>
          <ul>
            <li tabIndex="0" role="button" onClick={() => navigate('/admin')}>Dashboard</li>
            <li tabIndex="0" role="button" style={{fontWeight: 'bold', color: '#B24592'}}>Profile</li>
            <li tabIndex="0" role="button" onClick={() => navigate('/')}>Log Out</li>
          </ul>
        </nav>
      </aside>
      <div className="admin-profile-card-center">
        <div className="admin-profile-card">
          <form className="admin-profile-form" onSubmit={handleSubmit}>
            <h1 className="admin-profile-title">Admin Profile</h1>
            <img
              src={photo || process.env.PUBLIC_URL + '/profile-photo.png'}
              alt="Admin Preview"
              className="admin-pfp-preview"
            />
            <input
              type="file"
              className="admin-pfp-input"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            <input
              type="text"
              name="name"
              className="admin-name-input"
              placeholder="Name"
              value={admin.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              className="admin-email-input"
              placeholder="Email"
              value={admin.email}
              readOnly
              disabled
            />
            <input
              type="text"
              name="role"
              className="admin-role-input"
              placeholder="Role"
              value={admin.role}
              readOnly
              disabled
            />
            <button type="submit" className="admin-save-button">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
