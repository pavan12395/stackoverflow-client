import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { useRef } from 'react';
import {loginHandler, statusCodeCheck, store} from '../Utils/Utils';
import {setAuthStatus, setLoginError} from '../redux/actions';
import Modal from '../components/Modal';
function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const loginError = useSelector(state=>state.loginError);
  console.log(loginError);
  const grpcClient = useSelector(state=>state.grpcClient);
  const dispatch = useDispatch();
  const loginClickHandler = async (e)=>
  {
      e.preventDefault();
      let response = await loginHandler(grpcClient,usernameRef.current.value,passwordRef.current.value);
      let errorMessage = statusCodeCheck(response);
      console.log(errorMessage);
      if(errorMessage!=null)
      {
         dispatch(setLoginError(errorMessage));
      }
      else
      {
        store("accessToken",response.accesstoken);
        store("refreshToken",response.refreshtoken);
        dispatch(setAuthStatus(true));
      }
      
  }
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" ref={usernameRef}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" ref={passwordRef}/>
        </div>
        <div className="form-group">
          <button type="submit" onClick={loginClickHandler}>Login</button>
        </div>
        <div className="form-group">
          <p>Create a new account? <Link to="/">Signup</Link></p>
        </div>
      </form>
      <Modal isOpen={loginError!=null && loginError!=""} message={loginError} onClose={()=>{dispatch(setLoginError(""))}} displayClose={true}/>
    </div>
  );
}

export default Login;
