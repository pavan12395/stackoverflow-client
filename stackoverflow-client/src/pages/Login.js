import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { useRef } from 'react';
import {loginHandler, statusCodeCheck} from '../Utils/Utils';
import {setAccessToken,setLoginError,setRefreshToken} from '../redux/actions';
import Modal from '../components/Modal';
import { EMPTY_STRING, SIGNUP_ROUTE } from '../Constants/constants';
/* state specific to this page 
loginError
*/
function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const loginError = useSelector(state=>state.loginError);
  const grpcClient = useSelector(state=>state.grpcClient);
  const dispatch = useDispatch();
  useEffect(()=>
  {
    return ()=>
    {
       dispatch(setLoginError(""));
    }
  },[]);
  const loginClickHandler = async (e)=>
  {
      e.preventDefault();
      try
      {
        let response = await loginHandler(grpcClient,usernameRef.current.value,passwordRef.current.value);
        let errorMessage = statusCodeCheck(response);
        if(errorMessage!=null)
        {
          dispatch(setLoginError(errorMessage));
        }
        else
        {
          dispatch(setAccessToken(response.accesstoken));
          dispatch(setRefreshToken(response.refreshtoken));
        }
      }
      catch(e)
      {
        dispatch(setLoginError(e));
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
          <p>Create a new account? <Link to={SIGNUP_ROUTE}>Signup</Link></p>
        </div>
      </form>
      <Modal isOpen={loginError!=null && loginError!=EMPTY_STRING} message={loginError} onClose={()=>{dispatch(setLoginError(EMPTY_STRING))}} displayClose={true}/>
    </div>
  );
}

export default Login;
