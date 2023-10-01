import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Protect } from '../components/Protect';
export default function Home()
{
  const user = useSelector(state=>state.user);
  const navigate = useNavigate();
    if(!user)
    {
        return <Protect/>
    }
    const questionClickHandler = (e)=>
    {
      e.preventDefault();
      navigate("/question");
    }
    const answerClickHandler = (e)=>
    {
      e.preventDefault();
      navigate("/answer");
    }
    return (
        <div className="home-container">
          <div className="centered-content">
            <button className="action-button" onClick={questionClickHandler}>Ask a Question</button>
            <button className="action-button" onClick={answerClickHandler}>Answer a Question</button>
          </div>
        </div>
      );
}