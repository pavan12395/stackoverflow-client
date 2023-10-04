import React, { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import Protect from '../components/Protect';
import { setRecievedRewardMessage } from '../redux/actions';
import { changeUserStatusHandler } from '../Utils/Utils';
import {USER_STATUS} from '../proto/stackoverflow_pb';
export default function Home()
{
  const user = useSelector(state=>state.user);
  const grpcClient = useSelector(state=>state.grpcClient);
  const accessToken = useSelector(state=>state.accessToken);
  const refreshToken = useSelector(state=>state.refreshToken);
  const dispatch = useDispatch();
  const recievedRewardMessage = useSelector(state=>state.recievedRewardMessage);
  const navigate = useNavigate();
  useEffect(()=>
  {
    if(user){
      const activateUserStatus = async ()=>
      {
        await changeUserStatusHandler(grpcClient,accessToken,refreshToken,USER_STATUS.ACTIVE,"",null);
      }
      activateUserStatus();
    }
  },[grpcClient,user]);
  const modalClose = (e)=>
  {
    e.preventDefault();
    dispatch(setRecievedRewardMessage(""));
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