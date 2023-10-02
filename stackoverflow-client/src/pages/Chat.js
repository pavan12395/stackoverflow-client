// Chat.js
import React, { useEffect,useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Protect from '../components/Protect';
import { setMessages, setPeerConnection } from '../redux/actions';
import { changeUserStatusHandler } from '../Utils/Utils';
import {USER_STATUS} from '../proto/stackoverflow_pb';
import { useNavigate } from 'react-router-dom';
function Chat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messages = useSelector((state) => state.messages);
  const user = useSelector(state=>state.user);
  const peerConnection = useSelector((state) => state.peerConnection);
  const grpcClient = useSelector((state)=>state.grpcClient);
  const messageRef = useRef();
  useEffect(() => {
    let accessToken = window.localStorage.getItem("accessToken");
    let refreshToken = window.localStorage.getItem("refreshToken");
    if (peerConnection) {
      peerConnection.on('data', (data) => {
        const newMessage = { text: data, sender: 'remote' };
        dispatch(setMessages([...messages,newMessage]));
      });
      peerConnection.on("close",async (data)=>
      {
         alert("Connection closed");
        await changeUserStatusHandler(grpcClient,accessToken,refreshToken,USER_STATUS.ACTIVE,"");
        dispatch(setMessages([]));
        dispatch(setPeerConnection(null));
        navigate("/home");
      })
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
    }
  }, [peerConnection,dispatch,messages]);

  const handleSend = () => {
    if (peerConnection) {
      peerConnection.send(messageRef.current.value); 
      const newMessage = { text: messageRef.current.value, sender: 'you' };
      // Send the message to the remote peer
      dispatch(setMessages([...messages,newMessage]));
      messageRef.current.value="";
    }
  };

  if(!user)
  {
    return <Protect/>
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
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
    </div>
  );
}

export default Chat;
