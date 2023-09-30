import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
export default function Home()
{
  const user = useSelector((state)=>state.user);
  if(user==null)
  {
    return <h1>Sign in to be a user</h1>
  }
    return (
        <div className="home-container">
          <div className="centered-content">
            <button className="action-button">Ask a Question</button>
            <button className="action-button">Answer a Question</button>
          </div>
        </div>
      );
}