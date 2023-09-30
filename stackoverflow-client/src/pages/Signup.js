import React,{useEffect, useRef} from 'react';
import { Link,useNavigate} from 'react-router-dom';
import Skills from '../components/Skills';
import { setSignupError,setAuthStatus} from '../redux/actions';
import { useSelector,useDispatch} from 'react-redux';
import {signUpHandler,statusCodeCheck,store} from '../Utils/Utils';
import Modal from '../components/Modal';
/*
when leaving this component we have to setSignUpError to null
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
  console.log(signUpError);
  const handleButtonClick = async (e)=>
  {
    console.log("Clicked!");
        e.preventDefault();
        const response = await signUpHandler(grpcClient,userNameRef.current.value,passwordRef.current.value,descRef.current.value,skills);
        let errorMessage = statusCodeCheck(response)
        if(errorMessage!=null)
        {
          console.log(errorMessage);
          dispatch(setSignupError(errorMessage));
        }
        else
        {
           console.log(response)
           store("accessToken",response.accesstoken)
           store("refreshToken",response.refreshtoken)
           dispatch(setAuthStatus(true));
        }
  }
  useEffect(()=>
  {
    return ()=>
    {
      dispatch(setSignupError(""));
    }
  },[]);
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
          <p>Already a user? <Link to="/login">Login</Link></p>
        </div>
      </form>
      <Modal isOpen={signUpError!=null && signUpError !== ''} message={signUpError} onClose={() => dispatch(setSignupError(''))} />
    </div>
    </>
  );
}

export default Signup;
