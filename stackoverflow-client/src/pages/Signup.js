import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <div className="form-group">
          <p>Already a user? <Link to="/login">Login</Link></p>
        </div>
        <div className="form-group">
          <button type="submit">Signup</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
