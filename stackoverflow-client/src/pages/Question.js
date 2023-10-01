import React, { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { Protect } from '../components/Protect';
import { setQuestionTitle,setQuestionDescription,setRatingReward,setQuestionModal} from '../redux/actions';
import {USER_STATUS} from '../proto/stackoverflow_pb';
import Peer from 'peerjs';
import { changeUserStatusHandler } from '../Utils/Utils';
import {setWebRTCConnection} from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
export default function Question()
{
    const navigate = useNavigate();
    const user = useSelector(state=>state.user);
    const grpcClient = useSelector(state=>state.grpcClient);
    const questionTitle = useSelector(state=>state.questionTitle);
    const questionDescription = useSelector(state=>state.questionDescription);
    const questionRatingReward = useSelector(state=>state.questionRatingReward);
    const webRTCConnection = useSelector(state=>state.webRTCConnection);
    const questionModal = useSelector(state=>state.questionModal);
    const dispatch = useDispatch();
    const buttonClickHandler = (e)=>
    {
      e.preventDefault();
       if(questionTitle=="" || questionDescription=="" || questionRatingReward==0.0)
       {
          alert("Invalid values");
          return;
       }
        console.log("Clicked!");
        const newPeer = new Peer();
        dispatch(setWebRTCConnection(newPeer));
    }
    const modalCloseHandler = async (e)=>
    {
       e.preventDefault();
       console.log("Clicked!");
       try
       {
        webRTCConnection.destroy();
       }
       catch(e)
       {
        console.log(e);
       }
       dispatch(setWebRTCConnection(null));
       let accessToken = window.localStorage.getItem("accessToken");
       let refreshToken = window.localStorage.getItem("refreshToken");
       const response = await changeUserStatusHandler(grpcClient,accessToken,refreshToken,USER_STATUS.ACTIVE,"");
       console.log(response);
       dispatch(setQuestionModal(""));
    }
    useEffect(()=>
    {
      console.log("Executing 1",webRTCConnection);
       if(webRTCConnection)
       {
          console.log("Executing");
          webRTCConnection.on("open",async (id)=>
          {
            console.log("Opened");
              let accessToken = window.localStorage.getItem("accessToken");
              let refreshToken = window.localStorage.getItem("refreshToken");
              const response = await changeUserStatusHandler(grpcClient,accessToken,refreshToken,USER_STATUS.QUESTION,id);
              console.log(response);
              dispatch(setQuestionModal("Waiting for Connection!"));
          });
          webRTCConnection.on("connect",()=>
          {
             console.log("Remote Client Connected!");
             navigate("/chat");
          });
          webRTCConnection.on("close",()=>
          {
            console.log("Closed the connection!");
          })
       }
    },[webRTCConnection]);
    if(!user)
    {
        return <Protect/>
    }
    return (
        <div>
          <h1>Ask a Question</h1>
          <form>
            <label htmlFor="questionTitle">Question Title:</label>
            <input
              type="text"
              id="questionTitle"
              name="questionTitle"
              value={questionTitle}
              onChange={(e)=>{dispatch(setQuestionTitle(e.target.value))}}
              required
            /><br /><br />
    
            <label htmlFor="questionDescription">Question Description:</label>
            <textarea
              id="questionDescription"
              name="questionDescription"
              value={questionDescription}
              onChange={(e)=>{dispatch(setQuestionDescription(e.target.value))}}
              rows="4"
              cols="50"
              required
            /><br /><br />
    
            <label htmlFor="ratingReward">Rating Reward</label>
            <input
              type="number"
              step="0.01"
              id="ratingReward"
              value={questionRatingReward}
              name="ratingReward"
              onChange={(e)=>{dispatch(setRatingReward(e.target.value))}}
              required
            /><br /><br />
            <button type="submit" onClick={buttonClickHandler}>Connect!</button>
            <Modal isOpen={questionModal!=""} message={questionModal} onClose={modalCloseHandler}/>
          </form>
        </div>
      );
}