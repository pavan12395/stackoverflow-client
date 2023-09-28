import React,{useRef} from 'react';
import { Link,useNavigate} from 'react-router-dom';
import Skills from '../components/Skills';
function Signup() {
  const userNameRef = useRef();
  const passwordRef = useRef();  
  const descRef = useRef();
  const navigate = useNavigate();
  const handleButtonClick = ()=>
  {
      
  }
  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" ref={userNameRef}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" ref={passwordRef}/>
        </div>
        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <input type="text" id="desc" name="desc" ref={descRef}/>
        </div>
        <div className="form-group">
            <Skills/>
        </div>
        <div className="form-group">
          <button type="submit" onClick={handleButtonClick}>Signup</button>
        </div>
        <div className="form-group">
          <p>Already a user? <Link to="/login">Login</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
