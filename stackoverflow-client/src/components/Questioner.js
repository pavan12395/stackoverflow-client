// Questioner.js
import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { setPeerConnection,setTypeOfUser} from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import { changeUserStatusHandler } from '../Utils/Utils';
import {USER_STATUS} from '../proto/stackoverflow_pb';

function Questioner({ id, name, rating, secret,questionDetails}) {
  console.log(questionDetails);  
  const dispatch = useDispatch();  
  const webRTCConnection = useSelector(state=>state.webRTCConnection);  
  const grpcClient = useSelector(state=>state.grpcClient);
  const navigate = useNavigate();
  const buttonClickHandler = async (e)=>
  {
    e.preventDefault();
    let accessToken = window.localStorage.getItem("accessToken");
    let refreshToken = window.localStorage.getItem("refreshToken");
    await changeUserStatusHandler(grpcClient,accessToken,refreshToken,USER_STATUS.CALL,"");
    const peerConnection = webRTCConnection.connect(secret);
    console.log(peerConnection);
    dispatch(setPeerConnection(peerConnection));
    dispatch(setTypeOfUser("ANSWERER"));
    navigate("/chat");
  } 
  return (
    <div className="questioner-container">
      <div className="questioner-left">
        <h1 className="question-title">{questionDetails.title}</h1>
        <div className="question-description">
        <p>Description : {questionDetails.description.length<=10 ? questionDetails.description : questionDetails.description.substring(0,10)+"...."}</p>
        <p className="reward-rating">Reward Rating: {questionDetails.rewardRating}</p>
        </div>
      </div>
      <div className="questioner-right">
        <button className="connect-button" onClick={buttonClickHandler}>Connect</button>
        <div className="user-info">
          <p className="user-name1">{name}</p>
          <div className="user-rating">
          <span className="star-icon">★</span>
            <p>{rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questioner;
