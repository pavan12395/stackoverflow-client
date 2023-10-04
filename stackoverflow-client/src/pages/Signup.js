import React,{useEffect, useRef} from 'react';
import { Link,useNavigate} from 'react-router-dom';
import Skills from '../components/Skills';
import { setSignupError,setAccessToken,setRefreshToken,setSkills,setAvailableSkillOptions} from '../redux/actions';
import { useSelector,useDispatch} from 'react-redux';
import {signUpHandler,statusCodeCheck,checkJWTExpired} from '../Utils/Utils';
import Modal from '../components/Modal';
import { EMPTY_STRING, HOME_ROUTE, initSkills, LOGIN_ROUTE,SESSION_EXPIRED_MESSAGE } from '../Constants/constants';
/*
state specific to this page --> skills,setSignUpError
*/
function Signup() {
  const userNameRef = useRef();
  const passwordRef = useRef();  
  const dispatch = useDispatch();
  const descRef = useRef();
  const navigate = useNavigate();
  const grpcClient = useSelector((state)=>state.grpcClient);
  const skills = useSelector((state)=>state.skills);
  const signUpError = useSelector((state)=>state.signUpError);
  useEffect(()=>
  {
    return ()=>
    {
      dispatch(setSignupError(""));
      dispatch(setSkills([]));
      dispatch(setAvailableSkillOptions(initSkills));
    }
  },[]);
  const handleButtonClick = async (e)=>
  {
        e.preventDefault();
        try{
        const response = await signUpHandler(grpcClient,userNameRef.current.value,passwordRef.current.value,descRef.current.value,skills);
        if(checkJWTExpired(response))
          {
             alert(SESSION_EXPIRED_MESSAGE);
             navigate("/");
          }
        let errorMessage = statusCodeCheck(response)
        if(errorMessage!=null)
        {
          dispatch(setSignupError(errorMessage));
        }
        else
        {
           dispatch(setAccessToken(response.accesstoken));
           dispatch(setRefreshToken(response.refreshtoken));
           navigate(HOME_ROUTE);
        }}
        catch(e)
        {
          dispatch(setSignupError(e));
        }
  }
  
  return (
    <>
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
          <p>Already a user? <Link to={LOGIN_ROUTE}>Login</Link></p>
        </div>
      </form>
      <Modal isOpen={signUpError!=null && signUpError !== EMPTY_STRING} message={signUpError} onClose={() => dispatch(setSignupError(EMPTY_STRING))} displayClose={true}/>
    </div>
    </>
  );
}

export default Signup;
