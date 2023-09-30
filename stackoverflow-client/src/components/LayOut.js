import React from 'react';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import the icons you want to use
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { setAuthStatus,setUser} from '../redux/actions';
import { logOutHandler, statusCodeCheck } from '../Utils/Utils';
const LayOut = () => {
  const user = useSelector((state) => state.user);
  const grpcClient = useSelector((state)=>state.grpcClient);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user)
  if(!user)
  {
    return null;
  }
  const logoutClickHandler = async (e)=>
  {
    e.preventDefault();  
    window.localStorage.setItem("accessToken","");
    window.localStorage.setItem("refreshToken","");
    dispatch(setAuthStatus(false));
    dispatch(setUser(null));
    navigate("/");  
    // const accessToken = window.localStorage.getItem("accessToken");
    // try{
    // const response = await logOutHandler(grpcClient,accessToken,null);
    // console.log("Logout Response : ",response);
    // let errorMessage = statusCodeCheck(response);
    // if(errorMessage!=null)
    // {
    //   console.log(errorMessage);
    //   alert(errorMessage);
    // }
    // else
    // {
    //   window.localStorage.setItem("accessToken","");
    //   window.localStorage.setItem("refreshToken","");
    //    setAuthStatus(false);
    //    setUser(null);
    //    navigate("/");
    // }}
    // catch(err)
    // {
    //   console.log(err);
    // }
    // finally
    // {
       
    // }
    
  }
  return (
    <div className="user-header">
      <div className="user-info">
        <FaUser className="user-icon" />
        <span className="user-name">{user.username}</span>
      </div>
      <div className="user-actions">
        <FaCog className="settings-icon" />
        <FaSignOutAlt className="logout-icon" onClick={logoutClickHandler}/>
      </div>
    </div>
  );
};

export default LayOut;
