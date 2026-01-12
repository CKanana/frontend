import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './App';
import AuthenticationPage from './AuthenticationPage';

function MainApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthenticationPage />} />
      </Routes>
    </Router>
  );
}

export default MainApp;
