
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App landing-bg">
      <nav className="landing-nav">
        <div className="nav-logo">
          <img src={logo} alt="VirtualPay Logo" className="logo-img" />
          <span className="nav-title">VirtualPay</span>
        </div>
        <ul className="nav-links">
          <li><a href="#company">Our Company</a></li>
          <li><a href="#payments">Payments</a></li>
          <li><a href="#merchants">Merchants</a></li>
          <li><a href="#resources">Resources</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
        <button className="login-btn">Login</button>
      </nav>
      <main className="landing-main">
        <h1 className="landing-title">Welcome to VirtualPay Feedback System</h1>
        <p className="landing-desc">
          Empowering open, secure, and data-driven organizational dialogue.
        </p>
        <button className="get-started-btn">Get Started</button>
      </main>
    </div>
  );
}

export default App;
