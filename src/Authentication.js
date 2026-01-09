import React from 'react';

const Authentication = () => {
  return (
    <div className="auth-container">
     <div className="login">
      <h2>Log In</h2>
      <form className="auth-form">
        <input type="text" placeholder="Username or Email" className="auth-input" />
        <input type="password" placeholder="Password" className="auth-input" />
        <button type="submit" className="auth-btn">Log In</button>
      </form>
        </div>
        <div className="signup">
        <h2>Sign Up</h2>
        <form className="auth-form">
          <input type="text" placeholder="Username" className="auth-input" />
          <input type="email" placeholder="Email" className="auth-input" />
          <input type="text" placeholder="Full Name" className="auth-input" />
          <input type="text" placeholder="Department" className="auth-input" />
          <input type="password" placeholder="Password" className="auth-input" />
          <input type="password" placeholder="Confirm Password" className="auth-input" />

          <button type="submit" className="auth-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );    
}
export default Authentication;