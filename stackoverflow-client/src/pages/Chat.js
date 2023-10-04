// Chat.js
import React, { useEffect,useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Protect from '../components/Protect';
import { setFirstRemoteMessage, setMessages, setPeerConnection,setQuestiondetails,setRecievedRewardMessage,setRecievedRewardRating,setRemoteClientName, setTypeOfUser, setUserStatus} from '../redux/actions';
import {statusCodeCheck,updateRatingHandler} from '../Utils/Utils';
import {USER_STATUS} from '../proto/stackoverflow_pb';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';
import QuestionDetails from '../components/QuestionDetails';
import { ANSWERER, ANSWERER_NO_REWARD_MESSAGE, ANSWERER_REWARD_MESSAGE, EMPTY_STRING, ERROR_RATING_MESSAGE, HOME_ROUTE, QUESTIONER, WEB_RTC_CONNECTION_CLOSE_EVENT, WEB_RTC_CONNECTION_DATA_EVENT, WEB_RTC_CONNECTION_OPEN_EVENT, WEB_RTC_MESSAGE_TYPE, WEB_RTC_REWARD_TYPE, WEB_RTC_SENDER_LOCAL_TYPE, WEB_RTC_SENDER_REMOTE_TYPE } from '../Constants/constants';
function Chat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messageRef = useRef();
  const webRTCConnection = useSelector(state=>state.webRTCConnection);
  const messages = useSelector((state) => state.messages);
  const user = useSelector(state=>state.user);
  const peerConnection = useSelector((state) => state.peerConnection);
  const grpcClient = useSelector((state)=>state.grpcClient);
  const questionDetails = useSelector((state)=>state.questionDetails);
  const firstRemoteMessage = useSelector((state)=>state.firstRemoteMessage);
  const remoteClientName = useSelector((state)=>state.remoteClientName);
  const recievedRewardRating = useSelector(state=>state.recievedRewardRating);
  const userType = useSelector(state=>state.userType);
  const accessToken = useSelector(state=>state.accessToken);
  const refreshToken = useSelector(state=>state.refreshToken);
  useEffect(()=>
  {
    return ()=>
    {
        dispatch(setMessages([]));
        if(peerConnection)
        {
          peerConnection.close();
        }
        dispatch(setPeerConnection(null));
        dispatch(setMessages([]));
        dispatch(setQuestiondetails(null));
        dispatch(setFirstRemoteMessage(true));
        dispatch(setRemoteClientName(null));
        dispatch(setTypeOfUser(""));
        dispatch(setRecievedRewardRating(0));
    }
  },[]);
  useEffect(() => {
    const openEventListener = async ()=>
    {
       dispatch(setUserStatus({status : USER_STATUS.CALL,id:""}));
    }
    const closeEventListener = async (data)=>
    {
      if(userType==ANSWERER)
      {
          if(recievedRewardRating==0)
          {
            dispatch(setRecievedRewardMessage(ANSWERER_NO_REWARD_MESSAGE));
          }
          else
          {
              const response = await updateRatingHandler(grpcClient,recievedRewardRating,accessToken,refreshToken);
              let errorMessage = statusCodeCheck(response);
              if(errorMessage)
              {
                dispatch(setRecievedRewardMessage(ERROR_RATING_MESSAGE));
              }
              else
              {
                dispatch(setRecievedRewardMessage(ANSWERER_REWARD_MESSAGE+recievedRewardRating));
              }
          }
          
      }
      dispatch(setUserStatus({status : USER_STATUS.ACTIVE,id:EMPTY_STRING}));
      navigate(HOME_ROUTE);
      if(webRTCConnection)
      {
        webRTCConnection.destroy();
      }
    }
    const dataEventListener = (data) => {
      if(firstRemoteMessage)
      {
          if(userType==ANSWERER)
          {
             data = JSON.parse(data);
             dispatch(setRemoteClientName(data.name));
             dispatch(setQuestiondetails(data.questionDetails));
             const answererFirstSendMessage = {name : user.username};
             peerConnection.send(JSON.stringify(answererFirstSendMessage));
          }
          else
          {
             data = JSON.parse(data);
             dispatch(setRemoteClientName(data.name));
          }
          dispatch(setFirstRemoteMessage(false));
      } 
      else
      {
       data = JSON.parse(data);
       if(data.type==WEB_RTC_MESSAGE_TYPE)
       {
        const message = data.text;
         const newMessage = { text: message, sender: WEB_RTC_SENDER_REMOTE_TYPE };
         dispatch(setMessages([...messages,newMessage]));
       }
       else if(data.type==WEB_RTC_REWARD_TYPE)
       {
         const rewardRating = data.rating;
         dispatch(setRecievedRewardRating(rewardRating));
       }
      }
     }
    if (peerConnection) {
      peerConnection.on(WEB_RTC_CONNECTION_OPEN_EVENT,openEventListener);
      peerConnection.on(WEB_RTC_CONNECTION_DATA_EVENT,dataEventListener);
      peerConnection.on(WEB_RTC_CONNECTION_CLOSE_EVENT,closeEventListener);
    }
    return ()=>
    {
        if(peerConnection)
        {
          peerConnection.off(WEB_RTC_CONNECTION_OPEN_EVENT,openEventListener);
          peerConnection.off(WEB_RTC_CONNECTION_DATA_EVENT,dataEventListener);
          peerConnection.off(WEB_RTC_CONNECTION_CLOSE_EVENT,closeEventListener);
        }
    }
  }, [peerConnection,dispatch,messages,firstRemoteMessage,remoteClientName,userType,dispatch,recievedRewardRating]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (userType === QUESTIONER && firstRemoteMessage) {
        let questionerFirstSendMessage = { name: user.username, questionDetails: questionDetails };
        peerConnection.send(JSON.stringify(questionerFirstSendMessage));
      }
    }, 1000); // 20 seconds in milliseconds
  
    return () => clearTimeout(timeoutId); // Clear the timeout when the component unmounts
  }, [userType, firstRemoteMessage, peerConnection, user, questionDetails,accessToken,refreshToken]);
  
  const handleSend = () => {
    if (peerConnection) {
      const newMessage = { text: messageRef.current.value, sender: WEB_RTC_SENDER_LOCAL_TYPE,type:WEB_RTC_MESSAGE_TYPE};
      peerConnection.send(JSON.stringify(newMessage)); 
      dispatch(setMessages([...messages,newMessage]));
      messageRef.current.value="";
    }
  };
  
  const rewardHandler = (e)=>
  {
    e.preventDefault();
    const newMessage = {type:WEB_RTC_REWARD_TYPE,rating:questionDetails.rewardRating};
    peerConnection.send(JSON.stringify(newMessage));
    peerConnection.close();
  }
  const closeHandler = (e)=>
  {
    e.preventDefault();
    peerConnection.close();
  }
  if(!user)
  {
    return <Protect/>
  }
  return (
    <>
    <QuestionDetails/>
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.sender==WEB_RTC_SENDER_LOCAL_TYPE ? user.username + " "+msg.text : remoteClientName + " "+ msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          ref={messageRef}
        />
        <button onClick={handleSend}>Send</button>
      </div>
      <Modal isOpen={firstRemoteMessage} message={"Loading!"} displayClose={false}/>
      <div className="button-container">
      {userType=="QUESTIONER" && <button className='connect-button' onClick={rewardHandler}>Reward</button>}
      <button className='connect-button' onClick={closeHandler}>Close</button>
    </div>
    </div>
    
    </>
  );
}

export default Chat;
