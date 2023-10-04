// Questioner.js
import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ANSWERER, CHAT_ROUTE } from '../Constants/constants';
import { setPeerConnection,setTypeOfUser} from '../redux/actions';

function Questioner({ id, name, rating, secret,questionDetails}) {
  const webRTCConnection = useSelector(state=>state.webRTCConnection);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buttonClickHandler = async (e)=>
  {
    e.preventDefault();
    const connection = webRTCConnection.connect(secret);
    dispatch(setPeerConnection(connection));
    dispatch(setTypeOfUser(ANSWERER));
    navigate(CHAT_ROUTE);
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
