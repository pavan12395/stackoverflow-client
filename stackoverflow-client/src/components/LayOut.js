import React from 'react';
import { FaUser,FaSignOutAlt} from 'react-icons/fa'; // Import the icons you want to use
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import { setAccessToken,setRefreshToken,setUser, setUserStatus} from '../redux/actions';
import {USER_STATUS} from '../proto/stackoverflow_pb';
import { EMPTY_STRING } from '../Constants/constants';
const LayOut = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if(!user)
  {
    return null;
  }
  const logoutClickHandler = async (e)=>
  {
    e.preventDefault();
    dispatch(setUserStatus({status:USER_STATUS.INACTIVE,id:EMPTY_STRING}));
    dispatch(setAccessToken(EMPTY_STRING));
    dispatch(setRefreshToken(EMPTY_STRING));
    dispatch(setUser(null));
    navigate("/");  
  }
  return (
    <div className="user-header">
  <div className="user-info">
    <FaUser className="user-icon" />
    <span className="user-name">{user.username}</span>
  </div>
  <div className="user-actions">
    <FaSignOutAlt className="logout-icon" onClick={logoutClickHandler}/>
  </div>
</div>
  );
};

export default LayOut;
