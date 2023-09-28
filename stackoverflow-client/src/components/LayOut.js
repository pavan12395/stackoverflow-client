import React from 'react';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import the icons you want to use
import { useSelector } from 'react-redux';
const LayOut = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="user-header">
      <div className="user-info">
        <FaUser className="user-icon" />
        <span className="user-name">{user.name}</span>
      </div>
      <div className="user-actions">
        <FaCog className="settings-icon" />
        <FaSignOutAlt className="logout-icon" />
      </div>
    </div>
  );
};

export default LayOut;
