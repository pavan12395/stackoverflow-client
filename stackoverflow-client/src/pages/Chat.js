// Chat.js
import React, { useEffect,useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Protect from '../components/Protect';
import { setMessages } from '../redux/actions';
function Chat() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const user = useSelector(state=>state.user);
  const peerConnection = useSelector((state) => state.peerConnection);
  const messageRef = useRef();
  useEffect(() => {
    if (peerConnection) {
      peerConnection.on('data', (data) => {
        const newMessage = { text: data, sender: 'remote' };
        dispatch(setMessages([...messages,newMessage]));
      });
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
