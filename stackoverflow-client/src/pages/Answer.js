import React,{useEffect}  from 'react';
import { useSelector,useDispatch} from 'react-redux';
import Protect from '../components/Protect';
import Questioner from '../components/Questioner';
import Modal from '../components/Modal';
import { setAnswerError, setAnswerSocket, setQuestioners,setPeerConnection,setUserStatus, setWebRTCConnection,setTypeOfUser} from '../redux/actions';
import {getUsersData} from '../Utils/Utils';
import io from 'socket.io-client';
import {USER_STATUS} from '../proto/stackoverflow_pb';
import Peer from 'peerjs';
import { useNavigate } from 'react-router-dom';
import { EMPTY_STRING, TRANSPORT_WEBSOCKET, WEB_SOCKET_CONNECTION_ERROR, WEB_RTC_CONNECTION_EVENT, WEB_SOCKET_END_POINT, WEB_SOCKET_USERS_EVENT, WEB_SOCKET_WELCOME_EVENT, WEB_SOCKET_CONNECT_ERROR_EVENT, WEB_RTC_OPEN_EVENT } from '../Constants/constants';
export default function Answer()
{    
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user);
    const questioners = useSelector(state=>state.questioners);
    const grpcClient = useSelector(state=>state.grpcClient);
    const webRTCConnection = useSelector(state=>state.webRTCConnection);
    const answerError = useSelector(state=>state.answerError);
    const answerSocket = useSelector(state=>state.answerSocket);
    const navigate = useNavigate();
    const modalCloseHandler = (e)=>
    {
        e.preventDefault();
        dispatch(setAnswerError(""));
    }
    useEffect(()=>
    {
        const socket = io(WEB_SOCKET_END_POINT, { transports : [TRANSPORT_WEBSOCKET] });
        dispatch(setWebRTCConnection(new Peer()));
        dispatch(setAnswerSocket(socket));
        return ()=>
        {
            if(answerSocket)
            {
                answerSocket.disconnect();
            }
            dispatch(setAnswerSocket(null));
            dispatch(setQuestioners([]));
            dispatch(setAnswerError(EMPTY_STRING));
        }
    },[]);
    useEffect(()=>
    {
        if(answerSocket)
        {
            const connectionFailedHandler = ()=>
            {
                dispatch(setAnswerError(WEB_SOCKET_CONNECTION_ERROR));
            }
            const usersHandler = async (data)=>
            {
                const userData = await getUsersData(grpcClient,data);
                dispatch(setQuestioners(userData));
            }
            const welcomeHandler = async (data)=>
            {
                const userData = await getUsersData(grpcClient,data);
                dispatch(setQuestioners(userData));
            }
            answerSocket.on(WEB_SOCKET_USERS_EVENT,usersHandler);
            answerSocket.on(WEB_SOCKET_WELCOME_EVENT,welcomeHandler);
            answerSocket.on(WEB_SOCKET_CONNECT_ERROR_EVENT,connectionFailedHandler);
            return ()=>
            {
                answerSocket.off(WEB_SOCKET_USERS_EVENT,usersHandler);
                answerSocket.off(WEB_SOCKET_WELCOME_EVENT,welcomeHandler);
                answerSocket.off(WEB_SOCKET_CONNECT_ERROR_EVENT,connectionFailedHandler);
            }
       }
    },[dispatch,answerSocket,grpcClient]);
    
    useEffect(()=>
    {
        const connectionOpenHandler = async (id)=>
        {
            dispatch(setUserStatus({status : USER_STATUS.ANSWER,id: id}));
        }
        if(webRTCConnection)
        {
            webRTCConnection.on(WEB_RTC_OPEN_EVENT,connectionOpenHandler);
        }
        return ()=>
        {
            if(webRTCConnection)
            {
                webRTCConnection.off(WEB_RTC_OPEN_EVENT,connectionOpenHandler);
            }
        }
    },[webRTCConnection,dispatch]);
    if(!user)
    {
        return <Protect/>
    }
    return(
        <div>
      {questioners.map((questioner) => (
        <Questioner
          key={questioner.id}
          id={questioner.id}
          name={questioner.name}
          rating={questioner.rating}
          secret={questioner.secret}
          questionDetails={questioner.questionDetails}
        />
      ))}
      <Modal isOpen={answerError ? answerError.length!=0 : false} message={answerError} onClose={modalCloseHandler} displayClose={false}/>
    </div>
    );
}