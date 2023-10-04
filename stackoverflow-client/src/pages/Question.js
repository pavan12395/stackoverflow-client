import React, { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Protect from '../components/Protect';
import { setQuestionTitle,setQuestionDescription,setRatingReward,setQuestionModal, setPeerConnection, setQuestiondetails, setTypeOfUser} from '../redux/actions';
import {USER_STATUS} from '../proto/stackoverflow_pb';
import Peer from 'peerjs';
import { changeUserStatusHandler } from '../Utils/Utils';
import {setWebRTCConnection} from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { FaWindowRestore } from 'react-icons/fa';
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
    const peerConnection = useSelector(state=>state.peerConnection);
    const questionDetails = useSelector(state=>state.questionDetails);
    const accessToken = useSelector(state=>state.accessToken);
    const refreshToken = useSelector(state=>state.refreshToken);
    const dispatch = useDispatch();
    const destroyState = ()=>
    {
        dispatch(setQuestionDescription(""));
        dispatch(setQuestionTitle(""));
        dispatch(setQuestionModal(""));
        dispatch(setRatingReward(0));
    }
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
       const response = await changeUserStatusHandler(grpcClient,accessToken,refreshToken,USER_STATUS.ACTIVE,null);
       console.log(response);
       dispatch(setQuestionModal(""));
    }
    useEffect(()=>
    {
        const connectionHandler = async (connection)=>
          {
             console.log("Remote Client Connected!");
             await changeUserStatusHandler(grpcClient,accessToken,refreshToken,USER_STATUS.CALL,"","");
             dispatch(setPeerConnection(connection));
             dispatch(setTypeOfUser("QUESTIONER"));
             destroyState();
             navigate("/chat");
          };
          const connectionOpenHandler = async (id)=>
          {
             console.log("Opened");
            const questionDetails = {title : questionTitle,description:questionDescription,rewardRating:questionRatingReward};
            dispatch(setQuestiondetails(questionDetails));
            const response = await changeUserStatusHandler(grpcClient,accessToken,refreshToken,USER_STATUS.QUESTION,id,JSON.stringify(questionDetails));
            console.log(response);
            dispatch(setQuestionModal("Waiting for Connection!"));
          }
          const connectionCloseHandler = async ()=>
          {
            console.log("Closed the connection!");
            await changeUserStatusHandler(grpcClient,accessToken,refreshToken,USER_STATUS.ACTIVE,"","");
            if(peerConnection){
            peerConnection.close();
            }
            dispatch(setPeerConnection(null));
            destroyState();
            navigate("/home");
          }
      console.log("Executing 1",webRTCConnection);
       if(webRTCConnection)
       {
          console.log("Executing");
          
          webRTCConnection.on("open",connectionOpenHandler);
          webRTCConnection.on("connection",connectionHandler);
          webRTCConnection.on("close",connectionCloseHandler)
       }
       return ()=>
       {
          if(webRTCConnection)
          {
            webRTCConnection.off("open",connectionOpenHandler);
            webRTCConnection.off("close",connectionCloseHandler);
            webRTCConnection.off("connection",connectionHandler);
          }
       }
    },[webRTCConnection,dispatch,grpcClient,questionDetails,questionTitle,questionDescription,questionRatingReward,accessToken,refreshToken]);
    useEffect(()=>
    {
      const questionCleanUp = async (e)=>
      {
        await changeUserStatusHandler(grpcClient,accessToken,refreshToken,USER_STATUS.ACTIVE,"","");
          if(webRTCConnection)
          {
            webRTCConnection.destroy();
          }
          dispatch(setWebRTCConnection(null));
          destroyState();
      }
      window.addEventListener("beforeunload",questionCleanUp);
      return ()=>
      {
        window.removeEventListener("beforeunload",questionCleanUp);
      }
    },[accessToken,refreshToken]);
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
            <Modal isOpen={questionModal!=""} message={questionModal} onClose={modalCloseHandler} displayClose={true}/>
          </form>
        </div>
      );
}