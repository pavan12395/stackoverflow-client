// Chat.js
import React, { useEffect,useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Protect from '../components/Protect';
import { setFirstRemoteMessage, setMessages, setPeerConnection,setQuestiondetails,setRemoteClientName} from '../redux/actions';
import { changeUserStatusHandler } from '../Utils/Utils';
import {USER_STATUS} from '../proto/stackoverflow_pb';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';
import QuestionDetails from '../components/QuestionDetails';
function Chat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messages = useSelector((state) => state.messages);
  const user = useSelector(state=>state.user);
  const peerConnection = useSelector((state) => state.peerConnection);
  const grpcClient = useSelector((state)=>state.grpcClient);
  const questionDetails = useSelector((state)=>state.questionDetails);
  const messageRef = useRef();
  const firstRemoteMessage = useSelector((state)=>state.firstRemoteMessage);
  const remoteClientName = useSelector((state)=>state.remoteClientName);
  const userType = useSelector(state=>state.userType);
  console.log("User type : "+userType);
  console.log("Remote client : "+remoteClientName);
  console.log("Question Details : ",questionDetails);
  console.log(firstRemoteMessage);
  console.log(peerConnection);
  useEffect(() => {
    let accessToken = window.localStorage.getItem("accessToken");
    let refreshToken = window.localStorage.getItem("refreshToken");
    const closeEventListener = async (data)=>
    {
       alert("Connection closed");
      await changeUserStatusHandler(grpcClient,accessToken,refreshToken,USER_STATUS.ACTIVE,"");
      dispatch(setMessages([]));
      dispatch(setPeerConnection(null));
      navigate("/home");
    }
    const dataEventListener = (data) => {
      if(firstRemoteMessage)
      {
          if(userType=="ANSWERER")
          {
             data = JSON.parse(data);
             console.log("FirstRemoteMessage  ANSWERER  : ",data);
             dispatch(setRemoteClientName(data.name));
             dispatch(setQuestiondetails(data.questionDetails));
             const answererFirstSendMessage = {name : user.username};
             console.log(answererFirstSendMessage);
             peerConnection.send(JSON.stringify(answererFirstSendMessage));
          }
          else
          {
             data = JSON.parse(data);
             console.log("FirstRemoteMessage QUESTIONER : ",data);
             dispatch(setRemoteClientName(data.name));
          }
          dispatch(setFirstRemoteMessage(false));
      } 
      else
      {
       console.log("Recieved Data : ",data);
       data = JSON.parse(data);
       if(data.type=="message")
       {
        const message = data.text;
         const newMessage = { text: message, sender: 'remote' };
         dispatch(setMessages([...messages,newMessage]));
       }
       else if(data.type=="reward")
       {
         console.log("Recieved a Reward type");
         const rewardRating = data.rewardRating;
         console.log("Recieved rewardRating of  : ",rewardRating);
       }
      }
     }
    if (peerConnection) {
      peerConnection.on('data',dataEventListener);
      peerConnection.on("close",closeEventListener);
    }
    const unloadEventListener = async (e)=>
    {
        e.returnValue = "Exit Chat ? ";
        await changeUserStatusHandler(grpcClient,accessToken,refreshToken,USER_STATUS.ACTIVE,"");
        dispatch(setMessages([]));
        peerConnection.close();
        dispatch(setPeerConnection(null));
    }
    window.addEventListener("beforeunload",unloadEventListener);
    return ()=>
    {
        window.removeEventListener("beforeunload",unloadEventListener);
        if(peerConnection)
        {
          peerConnection.off("data",dataEventListener);
          peerConnection.off("close",closeEventListener);
        }
    }
  }, [peerConnection,dispatch,messages,firstRemoteMessage,remoteClientName,userType]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (userType === "QUESTIONER" && firstRemoteMessage) {
        let questionerFirstSendMessage = { name: user.username, questionDetails: questionDetails };
        peerConnection.send(JSON.stringify(questionerFirstSendMessage));
        console.log("Sent by Questioner!");
      }
    }, 5000); // 20 seconds in milliseconds
  
    return () => clearTimeout(timeoutId); // Clear the timeout when the component unmounts
  }, [userType, firstRemoteMessage, peerConnection, user, questionDetails]);
  
  const handleSend = () => {
    if (peerConnection) {
      const newMessage = { text: messageRef.current.value, sender: 'you',type:"message"};
      peerConnection.send(JSON.stringify(newMessage)); 
      // Send the message to the remote peer
      dispatch(setMessages([...messages,newMessage]));
      messageRef.current.value="";
    }
  };
  
  const rewardHandler = (e)=>
  {
    e.preventDefault();
    const newMessage = {type:"reward",rating:questionDetails.rewardRating};
    peerConnection.send(JSON.stringify(newMessage));
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
            {msg.sender=="you" ? user.username + " "+msg.text : remoteClientName + " "+ msg.text}
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
      <button className='connect-button'>Close</button>
    </div>
    </div>
    
    </>
  );
}

export default Chat;
