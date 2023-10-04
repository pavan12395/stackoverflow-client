import React, { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import Protect from '../components/Protect';
import { ANSWER_ROUTE, EMPTY_STRING, QUESTION_ROUTE } from '../Constants/constants';
import { setRecievedRewardMessage } from '../redux/actions';
export default function Home()
{
  const user = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const recievedRewardMessage = useSelector(state=>state.recievedRewardMessage);
  const navigate = useNavigate();
  const modalClose = (e)=>
  {
    e.preventDefault();
    dispatch(setRecievedRewardMessage(EMPTY_STRING));
  }
  const questionClickHandler = (e)=>
  {
    e.preventDefault();
    navigate(QUESTION_ROUTE);
  }
  const answerClickHandler = (e)=>
  {
    e.preventDefault();
    navigate(ANSWER_ROUTE);
  }
  if(!user)
  {
    return <Protect/>
  }
    return (
        <div className="home-container">
          <div className="centered-content">
            <button className="action-button" onClick={questionClickHandler}>Ask a Question</button>
            <button className="action-button" onClick={answerClickHandler}>Answer a Question</button>
          </div>
          <Modal isOpen={recievedRewardMessage!=""} message={recievedRewardMessage} onClose={modalClose} displayClose={true}/>
        </div>
      );
}