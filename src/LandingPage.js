import React, { useState } from 'react';
import './App.css';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';

function LandingPage() {
  const [bgLoaded, setBgLoaded] = useState(false);

  // Use the image from the public folder
  const bgUrl = process.env.PUBLIC_URL + '/lucid.jpg';
  return (
    <div className="App landing-bg" style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="landing-bg-img-wrapper">
        <img
          src={bgUrl}
          alt="background"
          className="landing-bg-img"
          onLoad={() => setBgLoaded(true)}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '60vw',
            height: '100vh',
            objectFit: 'cover',
            zIndex: 0,
            opacity: 0.98,
            transition: 'opacity 0.7s',
          }}
        />
      </div>
      {/* Example 3D element on the left side (replace with your actual 3D component if needed) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '40vw', height: '100vh', zIndex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        {/* Place your 3D element/component here */}
      </div>
      {/* Optional overlay for readability */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(30,30,40,0.18)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />
      <nav className="navbar glass-navbar">
        <div className="navbar-logo" tabIndex={0} role="button">
            <span className="arc"></span>
            <span className="virtual">virtual</span><span className="pay">pay</span>
        </div>
        <ul className="navbar-links">
          <li><a href="#company">Our Company</a></li>
          <li><a href="#payments">Payments</a></li>
          <li><a href="#merchants">Merchants</a></li>
          <li><a href="#resources">Resources</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
        <div className="navbar-actions">
          <button className="navbar-btn secondary">Log In</button>
          <button className="navbar-btn primary">Get Started</button>
        </div>
      </nav>
      <div style={{ position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
        <HeroSection loaded={bgLoaded} />
      </div>
      <FeaturesSection />
      <section className="cta-section">
        <div className="cta-card">
          <h2 className="cta-title">Ready to Transform Your Organization?</h2>
          <p className="cta-caption">Empower every voice, unlock honest insights, and drive real change with secure, anonymous feedback. Your journey to a thriving workplace starts here.</p>
          <button className="cta-btn">Get Started</button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;