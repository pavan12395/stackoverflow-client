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
  const dispatch = useDispatch();
  const recievedRewardMessage = useSelector(state=>state.recievedRewardMessage);
  console.log(recievedRewardMessage);
  const modalClose = (e)=>
  {
    e.preventDefault();
    dispatch(setRecievedRewardMessage(""));
  }
  const navigate = useNavigate();
  useEffect(()=>
    {
      if(user){
        const accessToken = window.localStorage.getItem("accessToken");
        const refreshToken = window.localStorage.getItem("refreshToken");
        const activateUserStatus = async ()=>
        {
            await changeUserStatusHandler(grpcClient,accessToken,refreshToken,USER_STATUS.ACTIVE,"",null);
        }
        activateUserStatus();
      }
    },[grpcClient,user])
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
          <Modal isOpen={recievedRewardMessage!=""} message={recievedRewardMessage} onClose={modalClose} displayClose={true}/>
        </div>
      );
}