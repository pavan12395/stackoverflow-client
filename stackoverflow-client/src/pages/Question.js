import React, { useEffect,useRef} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Protect from '../components/Protect';
import {setQuestionModal, setPeerConnection, setQuestiondetails, setTypeOfUser} from '../redux/actions';
import {USER_STATUS} from '../proto/stackoverflow_pb';
import Peer from 'peerjs';
import { changeUserStatusHandler, validateQuestionDetails } from '../Utils/Utils';
import {setWebRTCConnection} from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
export default function Question()
{
    const navigate = useNavigate();
    const user = useSelector(state=>state.user);
    const grpcClient = useSelector(state=>state.grpcClient);
    const questionTitleRef = useRef();
    const questionDescriptionRef = useRef();
    const questionRatingRewardRef = useRef();
    const webRTCConnection = useSelector(state=>state.webRTCConnection);
    const questionModal = useSelector(state=>state.questionModal);
    const accessToken = useSelector(state=>state.accessToken);
    const refreshToken = useSelector(state=>state.refreshToken);
    const dispatch = useDispatch();
    useEffect(()=>
    {
      return ()=>
      {
        dispatch(setQuestionModal(null));
      }
    },[]);
    const buttonClickHandler = (e)=>
    {
      e.preventDefault();
      const validationError = validateQuestionDetails(questionTitleRef.current.value,questionDescriptionRef.current.value,questionRatingRewardRef.current.value);
      if(!validationError || validationError.length==0)
      {
        const newPeer = new Peer();
        dispatch(setWebRTCConnection(newPeer));
      }
      else
      {
         dispatch(setQuestionModal({type:"VALIDATION",message:validationError,display:true}));
      }
    }
    const modalCloseHandler = async (e)=>
    {
       e.preventDefault();
       if(!questionModal)
       {
          return;
       }
       else if(questionModal.type=="VALIDATION")
       {
        dispatch(setQuestionModal(null));
       }
       else if(questionModal.type=="CONNECTION")
       {
          try
          {
            webRTCConnection.destroy();
          }
          catch(e)
          {
          }
          dispatch(setWebRTCConnection(null));
          changeUserStatusHandler(grpcClient,accessToken,refreshToken,USER_STATUS.ACTIVE,null);
          dispatch(setQuestionModal(null));
       }
       
    }
    useEffect(()=>
    {
        const connectionHandler = async (connection)=>
          {
             dispatch(setPeerConnection(connection));
             dispatch(setTypeOfUser("QUESTIONER"));
             navigate("/chat");
          };
          const connectionOpenHandler = async (id)=>
          {
            const questionDetails = {title : questionTitleRef.current.value,description:questionDescriptionRef.current.value,rewardRating:questionRatingRewardRef.current.value};
            await changeUserStatusHandler(grpcClient,accessToken,refreshToken,USER_STATUS.QUESTION,id,JSON.stringify(questionDetails));
            dispatch(setQuestiondetails(questionDetails));
            dispatch(setQuestionModal({type:"CONNECTION",message:"Connecting to a Client",display:true}));
          }
          const connectionCloseHandler = async ()=>
          {
            dispatch(setWebRTCConnection(null));
            await changeUserStatusHandler(grpcClient,accessToken,refreshToken,USER_STATUS.ACTIVE,"",null);
          }
       if(webRTCConnection)
       {          
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
    },[webRTCConnection,dispatch,grpcClient,accessToken,refreshToken]);
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
              ref={questionTitleRef}
              required
            /><br /><br />
    
            <label htmlFor="questionDescription">Question Description:</label>
            <textarea
              id="questionDescription"
              name="questionDescription"
              ref={questionDescriptionRef}
              rows="4"
              cols="50"
              required
            /><br /><br />
    
            <label htmlFor="ratingReward">Rating Reward</label>
            <input
              type="number"
              step="0.01"
              id="ratingReward"
              ref={questionRatingRewardRef}
              name="ratingReward"
              required
            /><br /><br />
            <button type="submit" onClick={buttonClickHandler}>Connect!</button>
            <Modal isOpen={questionModal!=null} message={questionModal ? questionModal.message : ""} onClose={modalCloseHandler} displayClose={!questionModal ? false : questionModal.display}/>
          </form>
        </div>
      );
}

/*
Todo

Invalid values --> more elaborate and questions syntax search and mention the reason in modal
Making refs
arrive at a particular page one call to change the status
Responsibility of destroying the peer will be handed over to Chat.js
Navigate to home responsibility handed to Chat.js
*/