import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';


const cardStyle = {
  background: 'white',
  borderRadius: '12px',
  padding: '2rem',
  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
  border: '1px solid rgba(0,0,0,0.05)',
  marginBottom: '2rem'
};

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '8px',
  border: '1px solid #e1e1e1',
  marginTop: '8px',
  marginBottom: '20px',
  fontSize: '0.95rem',
  transition: 'border-color 0.2s'
};
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Analytics modal state
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analyticsType, setAnalyticsType] = useState(null); // 'poll' or 'survey'
  const [surveyDepartmentFilter, setSurveyDepartmentFilter] = useState('all');
  const [displayedSurvey, setDisplayedSurvey] = useState(null);
  const [selectedAnalyticsItem, setSelectedAnalyticsItem] = useState(null);

  // --- Survey Questions State and Handlers ---
  const [surveyQuestions, setSurveyQuestions] = useState([{ text: '', options: ['', ''], required: false }]);

  const handleSurveyQuestionChange = (qIdx, value) => {
    setSurveyQuestions(questions => questions.map((q, i) => i === qIdx ? { ...q, text: value } : q));
  };

  const addSurveyQuestion = () => {
    setSurveyQuestions(questions => [...questions, { text: '', options: ['', ''], required: false }]);
  };

  const removeSurveyQuestion = (qIdx) => {
    setSurveyQuestions(questions => questions.length > 1 ? questions.filter((_, i) => i !== qIdx) : questions);
  };

  const handleSurveyOptionChange = (qIdx, oIdx, value) => {
    setSurveyQuestions(questions => questions.map((q, i) => i === qIdx ? { ...q, options: q.options.map((opt, j) => j === oIdx ? value : opt) } : q));
  };
  const handleSurveyRequiredChange = (qIdx, value) => {
    setSurveyQuestions(questions => questions.map((q, i) => i === qIdx ? { ...q, required: value } : q));
  };

  const addSurveyOption = (qIdx) => {
    setSurveyQuestions(questions => questions.map((q, i) => i === qIdx ? { ...q, options: [...q.options, ''] } : q));
  };

  const removeSurveyOption = (qIdx, oIdx) => {
    setSurveyQuestions(questions => questions.map((q, i) => i === qIdx ? { ...q, options: q.options.length > 1 ? q.options.filter((_, j) => j !== oIdx) : q.options } : q));
  };

  // --- Poll Options State and Handlers ---
  const [pollOptions, setPollOptions] = useState(['', '']);

  const handlePollOptionChange = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const addPollOption = () => {
    setPollOptions([...pollOptions, '']);
  };

  const removePollOption = (index) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  // Data Lists State
  const [staffList, setStaffList] = useState([
    { id: 1, name: 'Crystal', role: 'Staff', department: 'HR', email: 'crystal@example.com' },
    { id: 2, name: 'John Doe', role: 'Staff', department: 'IT', email: 'john@example.com' },
    { id: 3, name: 'Jane Smith', role: 'Manager', department: 'Marketing', email: 'jane@example.com' },
    { id: 4, name: 'Alex Johnson', role: 'Staff', department: 'Engineering', email: 'alex@example.com' },
  ]);

  const [departmentList, setDepartmentList] = useState([
    { id: 1, name: 'Human Resources', head: 'Crystal', members: 5 },
    { id: 2, name: 'IT', head: 'John Doe', members: 8 },
    { id: 3, name: 'Marketing', head: 'Jane Smith', members: 6 },
    { id: 4, name: 'Engineering', head: 'Alex Johnson', members: 12 },
  ]);

  const [groupList, setGroupList] = useState([
    { id: 1, name: 'Project Alpha', members: 8 },
    { id: 2, name: 'Social Committee', members: 12 },
    { id: 3, name: 'Management', members: 4 },
  ]);

  const [surveyList, setSurveyList] = useState([
    { 
      id: 1, 
      title: 'Q1 Employee Satisfaction', 
      responses: 18, 
      status: 'Active', 
      created: '1 day ago', 
      summary: 'Most employees are satisfied with their work environment.',
      questions: [
        { text: "How would you rate your overall satisfaction?", options: [{ label: "Very Satisfied", count: 10 }, { label: "Satisfied", count: 5 }, { label: "Neutral", count: 2 }, { label: "Dissatisfied", count: 1 }] },
        { text: "Do you feel your feedback is valued?", options: [{ label: "Yes", count: 12 }, { label: "No", count: 6 }] },
        { text: "How likely are you to recommend us?", options: [{ label: "Likely", count: 15 }, { label: "Unlikely", count: 3 }] }
      ]
    },
    { id: 2, title: 'New IT Policy Feedback', responses: 5, status: 'Draft', created: '5 hours ago', summary: 'Pending more responses.', questions: [
        { text: "Is the new policy clear?", options: [{ label: "Yes", count: 3 }, { label: "No", count: 2 }] }
    ] },
  ]);

  const [activePollsList, setActivePollsList] = useState([
    { 
      id: 1, 
      question: 'Holiday Party Preferences', 
      votes: 25, 
      status: 'Active', 
      created: '2 days ago',
      options: [
        { text: "Bowling", votes: 12 },
        { text: "Karaoke", votes: 8 },
        { text: "Hiking", votes: 5 }
      ]
    },
    { 
      id: 2, 
      question: 'New Office Layout', 
      votes: 42, 
      status: 'Active', 
      created: '1 week ago',
      options: [
        { text: "Open Plan", votes: 20 },
        { text: "Cubicles", votes: 15 },
        { text: "Hybrid", votes: 7 }
      ]
    },
    { 
      id: 3, 
      question: 'Team Building Activity', 
      votes: 15, 
      status: 'Active', 
      created: '3 days ago',
      options: [
        { text: "Escape Room", votes: 8 },
        { text: "Dinner", votes: 7 }
      ]
    },
  ]);

  const admin = {
    name: 'Admin User',
    email: 'admin@virtual.com',
    role: 'Administrator',
    photo: process.env.PUBLIC_URL + '/profile-photo.png',
  };

  const stats = [
    { label: 'Total Staff', value: staffList.length, color: '#B24592', onClick: () => setActiveSection('view-staff') },
    { label: 'Active Polls', value: activePollsList.length, color: '#F7941E',  onClick: () => setActiveSection('view-polls') },
    { label: 'Departments', value: departmentList.length, color: '#7D1F4B',onClick: () => setActiveSection('view-departments') },
    { label: 'Groups', value: groupList.length, color: '#4BCB6B', onClick: () => setActiveSection('view-groups') },
  ];

  const gotoStaffDashboard = () => { navigate('/dashboard'); };

  const cardStyle = {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
    border: '1px solid rgba(0,0,0,0.05)',
    marginBottom: '2rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #e1e1e1',
    marginTop: '8px',
    marginBottom: '20px',
    fontSize: '0.95rem',
    transition: 'border-color 0.2s'
  };

  const getNavItemStyle = (section) => ({
    padding: '12px 20px',
    cursor: 'pointer',
    backgroundColor: activeSection === section ? '#fff0f7' : 'transparent',
    color: activeSection === section ? '#B24592' : '#fff0f7',
    fontWeight: activeSection === section ? '700' : '500',
    fontSize: '1.05rem',
    borderLeft: activeSection === section ? '4px solid #B24592' : '4px solid transparent',
    transition: 'all 0.2s ease'
  });

  useEffect(() => {
    if (activeSection === 'survey-details' && selectedAnalyticsItem) {
        if (surveyDepartmentFilter === 'all') {
            setDisplayedSurvey(selectedAnalyticsItem);
        } else {
            // Simulate filtering. In a real app, you'd fetch or calculate this data.
            const filteredSurvey = JSON.parse(JSON.stringify(selectedAnalyticsItem));
            const randomFactor = 0.5; // Let's just half everything for simplicity
            
            let totalResponses = 0;
            filteredSurvey.questions.forEach(q => {
                q.options.forEach(opt => {
                    opt.count = Math.floor(opt.count * randomFactor);
                });
            });
            filteredSurvey.responses = Math.floor(filteredSurvey.responses * randomFactor);
            setDisplayedSurvey(filteredSurvey);
        }
    }
}, [activeSection, selectedAnalyticsItem, surveyDepartmentFilter]);

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem'
  };
  const thStyle = {
    textAlign: 'left',
    padding: '12px',
    borderBottom: '2px solid #eee',
    color: '#444'
  };
  const tdStyle = {
    padding: '12px',
    borderBottom: '1px solid #eee',
    color: '#666'
  };

  return (
    <div className="admin-dashboard" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <aside className="sidebar-nav">
        <div className="sidebar-logo">
          <img src={process.env.PUBLIC_URL + '/vp-pic.png'} onClick={gotoStaffDashboard} alt="Virtual Pay Logo" className="dashboard-logo" />
        </div>
        <nav style={{ marginTop: '1rem' }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li tabIndex="0" role="button" style={getNavItemStyle('overview')} onClick={() => setActiveSection('overview')}>Overview</li>
            <li tabIndex="0" role="button" style={getNavItemStyle('create-poll')} onClick={() => setActiveSection('create-poll')}>Create Poll</li>
            <li tabIndex="0" role="button" style={getNavItemStyle('create-survey')} onClick={() => setActiveSection('create-survey')}>Create Survey</li>
            <li tabIndex="0" role="button" style={getNavItemStyle('create-department')} onClick={() => setActiveSection('create-department')}>Create Department</li>
            <li tabIndex="0" role="button" style={getNavItemStyle('view-surveys')} onClick={() => setActiveSection('view-surveys')}>All Surveys</li>
            <li tabIndex="0" role="button" style={getNavItemStyle('create-group')} onClick={() => setActiveSection('create-group')}>Create Group</li>
            <li tabIndex="0" role="button" style={getNavItemStyle('profile')} onClick={() => navigate('/admin-profile')}>My Profile</li>
            <li tabIndex="0" role="button" style={{ ...getNavItemStyle('logout'), color: '#333' }} onClick={() => navigate('/')}>Log Out</li>
          </ul>
        </nav>
      </aside>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: '250px' }}>
        <div className="dashboard-topbar" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '1rem 2.5rem', background: 'white', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
          <div className="dashboard-icons" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span className="dashboard-icon notification-icon" title="Notifications" style={{ cursor: 'pointer' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B24592" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </span>
            <span className="dashboard-icon profile-icon" title="Profile" tabIndex={0} onClick={() => setShowProfileMenu(v => !v)} style={{ cursor: 'pointer', position: 'relative' }}>
              <img src={admin.photo} alt="Profile" className="profile-photo-thumb" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #B24592', display: 'block' }} />
              {showProfileMenu && (
                <div className="profile-menu" style={{ position: 'absolute', top: '50px', right: 0, background: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', padding: '1.5rem', width: '260px', zIndex: 100, border: '1px solid #eee' }}>
                  <div className="profile-menu-header" style={{ textAlign: 'center', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                    <img src={admin.photo} alt="Profile" style={{ width: '70px', height: '70px', borderRadius: '50%', marginBottom: '0.5rem', objectFit: 'cover' }} />
                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}>{admin.name}</div>
                    <div style={{ color: '#B24592', fontSize: '0.9rem' }}>{admin.role}</div>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}>{admin.email}</li>
                    <li>{admin.organization}</li>
                  </ul>
                  <button onClick={() => navigate('/admin-profile')} style={{ width: '100%', padding: '8px', background: 'transparent', border: '1px solid #B24592', color: '#B24592', borderRadius: '20px', cursor: 'pointer', fontSize: '0.9rem' }}>Edit Profile</button>
                </div>
              )}
            </span>
          </div>
        </div>
        <main className="admin-main-content" style={{ flex: 1, padding: '2.5rem', overflowY: 'auto' }}>
          {activeSection === 'overview' && (
            <section className="admin-overview-section" style={{ animation: 'fadeIn 0.5s ease' }}>
              <h1 style={{ color: '#2c3e50', marginBottom: '1.5rem', fontSize: '1.8rem' }}>Dashboard Overview</h1>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {stats.map((stat, index) => (
                  <div key={index} style={{ ...cardStyle, padding: '1.5rem', marginBottom: 0, cursor: stat.onClick ? 'pointer' : 'default' }} onClick={stat.onClick}>
                    <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{stat.label}</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: stat.color }}>{stat.value}</div>
                  </div>
                ))}
              </div>

              <div style={cardStyle}>
                <h3 style={{ marginBottom: '1rem', color: '#7D1F4B' }}>Recent Activity</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div
                    style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #B24592', cursor: 'pointer' }}
                    title="View Poll Analytics"
                    onClick={() => { setSelectedAnalyticsItem(activePollsList[0]); setAnalyticsType('poll'); setShowAnalytics(true); }}
                  >
                    <strong>New Poll Created</strong> - "Holiday Party Preferences"
                    <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>2 hours ago by Admin</div>
                  </div>
                  <div
                    style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #F7941E', cursor: 'pointer' }}
                    title="View Survey Analytics"
                    onClick={() => { setSelectedAnalyticsItem(surveyList[0]); setActiveSection('survey-details'); setSurveyDepartmentFilter('all'); }}
                  >
                    <strong>New Survey Created</strong> - "Q1 Employee Satisfaction"
                    <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>1 day ago by Admin</div>
                  </div>
                </div>
              </div>
                  {/* Analytics Modal */}
                  {showAnalytics && (
                    <div style={{
                      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000,
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <div style={{ background: 'white', borderRadius: 12, padding: '2rem', minWidth: 340, minHeight: 200, boxShadow: '0 4px 24px rgba(0,0,0,0.12)', position: 'relative' }}>
                        <button onClick={() => setShowAnalytics(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', fontSize: 22, color: '#B24592', cursor: 'pointer' }}>&times;</button>
                        <h2 style={{ color: '#7D1F4B', marginBottom: 16 }}>{analyticsType === 'poll' ? 'Poll Analytics' : 'Survey Analytics'}</h2>
                        {analyticsType === 'poll' && selectedAnalyticsItem && (
                          <div>
                            <div style={{ fontWeight: 600, marginBottom: 12, fontSize: '1.1rem' }}>{selectedAnalyticsItem.question}</div>
                            <ul style={{ padding: 0, listStyle: 'none' }}>
                              {selectedAnalyticsItem.options.map((opt, i) => (
                                <li key={i} style={{ marginBottom: 12 }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <span>{opt.text}</span>
                                    <span style={{ fontWeight: 600, color: '#B24592' }}>{opt.votes} votes</span>
                                  </div>
                                  <div style={{ width: '100%', height: '8px', background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: `${(opt.votes / selectedAnalyticsItem.votes) * 100}%`, height: '100%', background: '#B24592' }}></div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                            <div style={{ marginTop: 16, color: '#666', borderTop: '1px solid #eee', paddingTop: 8 }}>Total responses: {selectedAnalyticsItem.votes}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
            </section>
          )}
          
          {activeSection === 'create-survey' && (
            <section style={{ animation: 'fadeIn 0.5s ease' }}>
              <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>Create a Survey</h2>
              <form style={cardStyle}>
                <label>
                  <span style={{ fontWeight: 600, color: '#444' }}>Survey Title</span>
                  <input type="text" style={inputStyle} placeholder="e.g., Q1 Employee Satisfaction" />
                </label>
                <label>
                  <span style={{ fontWeight: 600, color: '#444' }}>Description</span>
                  <textarea style={{ ...inputStyle, height: '100px', resize: 'vertical' }} placeholder="Briefly describe the purpose of this survey..." />
                </label>
                <label style={{ display: 'block', marginBottom: '1rem' }}>
                  <span style={{ fontWeight: 600, color: '#444' }}>Deadline</span>
                  <input type="date" style={inputStyle} />
                </label>
               
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontWeight: 600, color: '#444', marginBottom: 8 }}>Questions</div>
                  {surveyQuestions.map((q, qIdx) => (
                    <div key={qIdx} style={{ background: '#f8f9fa', borderRadius: 8, padding: 16, marginBottom: 16, border: '1px solid #eee' }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                        <input
                          type="text"
                          style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
                          placeholder={`Question ${qIdx + 1}`}
                          value={q.text}
                          onChange={e => handleSurveyQuestionChange(qIdx, e.target.value)}
                        />
                        <label style={{ marginLeft: 12, display: 'flex', alignItems: 'center', fontSize: '0.98rem', color: '#7D1F4B', fontWeight: 600 }}>
                          <input
                            type="checkbox"
                            checked={q.required}
                            onChange={e => handleSurveyRequiredChange(qIdx, e.target.checked)}
                            style={{ marginRight: 6 }}
                          />
                          Required
                        </label>
                        {surveyQuestions.length > 1 && (
                          <button type="button" onClick={() => removeSurveyQuestion(qIdx)} style={{ marginLeft: 8, background: 'transparent', border: 'none', color: '#B24592', fontWeight: 700, fontSize: 20, cursor: 'pointer' }} title="Remove Question">&times;</button>
                        )}
                      </div>
                      <div style={{ marginLeft: 8, marginBottom: 8, fontWeight: 500, color: '#888' }}>Answer Options</div>
                      {q.options.map((opt, oIdx) => (
                        <div key={oIdx} style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
                          <input
                            type="text"
                            style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
                            placeholder={`Option ${oIdx + 1}`}
                            value={opt}
                            onChange={e => handleSurveyOptionChange(qIdx, oIdx, e.target.value)}
                          />
                          {q.options.length > 1 && (
                            <button type="button" onClick={() => removeSurveyOption(qIdx, oIdx)} style={{ marginLeft: 8, background: 'transparent', border: 'none', color: '#B24592', fontWeight: 700, fontSize: 18, cursor: 'pointer' }} title="Remove Option">&times;</button>
                          )}
                        </div>
                      ))}
                      <button type="button" onClick={() => addSurveyOption(qIdx)} style={{ background: 'transparent', border: '1px dashed #B24592', color: '#B24592', padding: '6px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, marginTop: 6 }}>+ Add Option</button>
                    </div>
                  ))}
                  <button type="button" onClick={addSurveyQuestion} style={{ background: 'transparent', border: '2px dashed #B24592', color: '#B24592', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, width: '100%' }}>+ Add Question</button>
                </div>
                <button
                  type="submit"
                  className="create-survey-btn"
                  style={{
                    background: 'linear-gradient(90deg, #7D1F4B 0%, #B24592 100%)',
                    color: 'white',
                    padding: '14px 32px',
                    border: 'none',
                    borderRadius: '24px',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    marginTop: '1.5rem',
                    width: '100%'
                  }}
                >
                  Create Survey
                </button>
              </form>
            </section>
          )}
          {activeSection === 'create-poll' && (
            <section style={{ animation: 'fadeIn 0.5s ease' }}>
              <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>Create a Poll</h2>
              <form style={{ ...cardStyle, border: '1px solid #B24592', boxShadow: '0 4px 24px rgba(178,69,146,0.08)' }}>
                <label>
                  <span style={{ fontWeight: 600, color: '#444' }}>Poll Question</span>
                  <input type="text" style={inputStyle} placeholder="e.g., What should our next team activity be?" />
                </label>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontWeight: 600, color: '#444', marginBottom: 8 }}>Options</div>
                  {pollOptions.map((opt, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                      <input type="text" style={{ ...inputStyle, marginBottom: 0, flex: 1 }} placeholder={`Option ${idx + 1}`} value={opt} onChange={e => handlePollOptionChange(idx, e.target.value)} />
                      {pollOptions.length > 2 && (
                        <button type="button" onClick={() => removePollOption(idx)} style={{ marginLeft: 8, background: 'transparent', border: 'none', color: '#B24592', fontWeight: 700, fontSize: 18, cursor: 'pointer' }} title="Remove Option">&times;</button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={addPollOption} style={{ background: 'transparent', border: '1px dashed #B24592', color: '#B24592', padding: '6px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, marginTop: 6 }}>+ Add Option</button>
                </div>
                <button
                  type="submit"
                  className="create-poll-btn"
                  style={{
                    background: 'linear-gradient(90deg, #7D1F4B 0%, #F7941E 100%)',
                    color: 'white',
                    padding: '14px 32px',
                    border: 'none',
                    borderRadius: '24px',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    marginTop: '1.5rem',
                    width: '100%'
                  }}
                >
                  Create Poll
                </button>
              </form>
            </section>
          )}
          {activeSection === 'create-department' && (
            <section style={{ animation: 'fadeIn 0.5s ease' }}>
              <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>Create Department</h2>
              <form style={{ ...cardStyle, border: '1px solid #B24592', boxShadow: '0 4px 24px rgba(178,69,146,0.08)' }}>
                <label>
                  <span style={{ fontWeight: 600, color: '#444' }}>Department Name</span>
                  <input type="text" style={inputStyle} placeholder="e.g., Research & Development" />
                </label>
                <label>
                  <span style={{ fontWeight: 600, color: '#444' }}>Head of Department</span>
                  <input type="text" style={inputStyle} placeholder="e.g., Jane Doe" />
                </label>
                <button
                  type="submit"
                  className="create-department-btn"
                  style={{
                    background: 'linear-gradient(90deg, #7D1F4B 0%, #B24592 100%)',
                    color: 'white',
                    padding: '14px 32px',
                    border: 'none',
                    borderRadius: '24px',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    marginTop: '1.5rem',
                    width: '100%'
                  }}
                >
                  Create Department
                </button>
              </form>
            </section>
          )}
          {activeSection === 'create-group' && (
            <section style={{ animation: 'fadeIn 0.5s ease' }}>
              <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>Create Group</h2>
              <form style={{ ...cardStyle, border: '1px solid #F7941E', boxShadow: '0 4px 24px rgba(247,148,30,0.08)' }}>
                <label>
                  <span style={{ fontWeight: 600, color: '#444' }}>Group Name</span>
                  <input type="text" style={inputStyle} placeholder="e.g., Project Phoenix" />
                </label>
                <label>
                  <span style={{ fontWeight: 600, color: '#444' }}>Members (comma separated)</span>
                  <input type="text" style={inputStyle} placeholder="e.g., Alice, Bob, Charlie" />
                </label>
                <button
                  type="submit"
                  className="create-group-btn"
                  style={{
                    background: 'linear-gradient(90deg, #F7941E 0%, #B24592 100%)',
                    color: 'white',
                    padding: '14px 32px',
                    border: 'none',
                    borderRadius: '24px',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    marginTop: '1.5rem',
                    width: '100%'
                  }}
                >
                  Create Group
                </button>
              </form>
            </section>
          )}

          {activeSection === 'view-polls' && (
            <section style={{ animation: 'fadeIn 0.5s ease' }}>
              <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>Active Polls</h2>
              <div style={cardStyle}>
                {activePollsList.map(poll => (
                  <div key={poll.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #eee', cursor: 'pointer', transition: 'background 0.2s' }} onClick={() => { setSelectedAnalyticsItem(poll); setAnalyticsType('poll'); setShowAnalytics(true); }} onMouseEnter={(e) => e.currentTarget.style.background = '#f9f9f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}>{poll.question}</div>
                      <div style={{ fontSize: '0.9rem', color: '#888', marginTop: '4px' }}>Created {poll.created} • {poll.votes} votes</div>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setActivePollsList(activePollsList.filter(p => p.id !== poll.id)); }} style={{ color: '#ff4b4b', background: 'none', border: '1px solid #ff4b4b', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginLeft: '1rem' }}>End Poll</button>
                  </div>
                ))}
                {activePollsList.length === 0 && <div style={{ color: '#666', fontStyle: 'italic' }}>No active polls.</div>}
              </div>
            </section>
          )}

          {activeSection === 'view-surveys' && (
            <section style={{ animation: 'fadeIn 0.5s ease' }}>
              <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>All Surveys</h2>
              <div style={cardStyle}>
                {surveyList.map(survey => (
                  <div key={survey.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #eee', cursor: 'pointer', transition: 'background 0.2s' }} onClick={() => { setSelectedAnalyticsItem(survey); setActiveSection('survey-details'); setSurveyDepartmentFilter('all'); }} onMouseEnter={(e) => e.currentTarget.style.background = '#f9f9f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}>{survey.title}</div>
                      <div style={{ fontSize: '0.9rem', color: '#888', marginTop: '4px' }}>Created {survey.created} • {survey.responses} responses • <span style={{ color: survey.status === 'Active' ? '#4BCB6B' : '#F7941E' }}>{survey.status}</span></div>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setSurveyList(surveyList.filter(s => s.id !== survey.id)); }} style={{ color: '#ff4b4b', background: 'none', border: '1px solid #ff4b4b', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginLeft: '1rem' }}>Delete</button>
                  </div>
                ))}
                {surveyList.length === 0 && <div style={{ color: '#666', fontStyle: 'italic' }}>No surveys found.</div>}
              </div>
            </section>
          )}

          {activeSection === 'survey-details' && selectedAnalyticsItem && (
            <section style={{ animation: 'fadeIn 0.5s ease' }}>
              <button onClick={() => setActiveSection('view-surveys')} style={{ marginBottom: '1rem', background: 'none', border: 'none', color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
                ← Back to Surveys
              </button>
              <h2 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>{selectedAnalyticsItem.title}</h2>
              <div style={{ color: '#666', marginBottom: '2rem' }}>
                {selectedAnalyticsItem.responses} Responses • Created {selectedAnalyticsItem.created} • <span style={{ color: selectedAnalyticsItem.status === 'Active' ? '#4BCB6B' : '#F7941E' }}>{selectedAnalyticsItem.status}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {selectedAnalyticsItem.questions && selectedAnalyticsItem.questions.map((q, index) => (
                  <div key={index} style={cardStyle}>
                    <h4 style={{ marginBottom: '1rem', color: '#444' }}>{index + 1}. {q.text}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      {q.options.map((opt, i) => (
                        <div key={i}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.9rem', color: '#555' }}>
                            <span>{opt.label}</span>
                            <span>{opt.count} ({selectedAnalyticsItem.responses > 0 ? Math.round((opt.count / selectedAnalyticsItem.responses) * 100) : 0}%)</span>
                          </div>
                          <div style={{ width: '100%', height: '8px', background: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${selectedAnalyticsItem.responses > 0 ? (opt.count / selectedAnalyticsItem.responses) * 100 : 0}%`, height: '100%', background: '#B24592' }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {(!selectedAnalyticsItem.questions || selectedAnalyticsItem.questions.length === 0) && (
                   <div style={cardStyle}>No detailed question data available for this survey.</div>
                )}
              </div>
            </section>
          )}

          {activeSection === 'view-departments' && (
            <section style={{ animation: 'fadeIn 0.5s ease' }}>
              <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>Departments</h2>
              <div style={cardStyle}>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Department Name</th>
                      <th style={thStyle}>Head of Dept</th>
                      <th style={thStyle}>Members</th>
                      <th style={thStyle}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentList.map(dept => (
                      <tr key={dept.id}>
                        <td style={tdStyle}>{dept.name}</td>
                        <td style={tdStyle}>{dept.head}</td>
                        <td style={tdStyle}>{dept.members}</td>
                        <td style={tdStyle}>
                          <button onClick={() => setDepartmentList(departmentList.filter(d => d.id !== dept.id))} style={{ color: '#ff4b4b', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeSection === 'view-groups' && (
            <section style={{ animation: 'fadeIn 0.5s ease' }}>
              <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>User Groups</h2>
              <div style={cardStyle}>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Group Name</th>
                      <th style={thStyle}>Members</th>
                      <th style={thStyle}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupList.map(group => (
                      <tr key={group.id}>
                        <td style={tdStyle}>{group.name}</td>
                        <td style={tdStyle}>{group.members}</td>
                        <td style={tdStyle}>
                          <button onClick={() => setGroupList(groupList.filter(g => g.id !== group.id))} style={{ color: '#ff4b4b', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

  export default AdminDashboard;