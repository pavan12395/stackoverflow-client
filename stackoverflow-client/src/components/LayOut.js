import React from 'react';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import the icons you want to use


const LayOut = () => {
  return (
    <div className="user-header">
      <div className="user-info">
        <FaUser className="user-icon" />
        <span className="user-name">Dummy User</span>
      </div>
      <div className="user-actions">
        <FaCog className="settings-icon" />
        <FaSignOutAlt className="logout-icon" />
      </div>
    </div>
  );
};

export default LayOut;
