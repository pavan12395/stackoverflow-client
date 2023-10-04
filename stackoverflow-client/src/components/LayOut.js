import React from 'react';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import the icons you want to use
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import { setAccessToken,setRefreshToken,setUser, setUserStatus} from '../redux/actions';
import {USER_STATUS} from '../proto/stackoverflow_pb';
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
    dispatch(setUserStatus({status:USER_STATUS.INACTIVE,id:""}));
    dispatch(setAccessToken(""));
    dispatch(setRefreshToken(""));
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
        <FaCog className="settings-icon" />
        <FaSignOutAlt className="logout-icon" onClick={logoutClickHandler}/>
      </div>
    </div>
  );
};

export default LayOut;
