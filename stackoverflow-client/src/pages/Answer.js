import React,{useEffect}  from 'react';
import { useSelector,useDispatch} from 'react-redux';
import Protect from '../components/Protect';
import Questioner from '../components/Questioner';
import Modal from '../components/Modal';
import { setAnswerError, setAnswerSocket, setQuestioners,setWebRTCConnection } from '../redux/actions';
import {changeUserStatusHandler, getUsersData} from '../Utils/Utils';
import io from 'socket.io-client';
import {USER_STATUS} from '../proto/stackoverflow_pb';
import Peer, { SocketEventType } from 'peerjs';
import { useNavigate } from 'react-router-dom';
export default function Answer()
{    
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user);
    const questioners = useSelector(state=>state.questioners);
    const grpcClient = useSelector(state=>state.grpcClient);
    const webRTCConnection = useSelector(state=>state.webRTCConnection);
    const accessToken = useSelector(state=>state.accessToken);
    const refreshToken = useSelector(state=>state.refreshToken);
    const answerError = useSelector(state=>state.answerError);
    const answerSocket = useSelector(state=>state.answerSocket);
    const modalCloseHandler = (e)=>
    {
        e.preventDefault();
        dispatch(setAnswerError(""));
    }
    const navigate = useNavigate();
    useEffect(()=>
    {
        const socket = io('http://localhost:4000', { transports : ['websocket'] });
        dispatch(setAnswerSocket(socket));
        return ()=>
        {
            
            dispatch(setAnswerSocket(null));
        }
    },[]);
    useEffect(()=>
    {
        if(answerSocket)
        {
            const connectionHandler = ()=>
            {
                dispatch(setAnswerError(""));
                console.log("Connected!");
            }
            const connectionFailedHandler = ()=>
            {
                dispatch(setAnswerError("Cant connect to WebSockets Server"));
            }
            const usersHandler = async (data)=>
            {
                console.log("Recieved Data! ",data);
                const userData = await getUsersData(grpcClient,data);
                console.log(userData);
                dispatch(setQuestioners(userData));
            }
            const welcomeHandler = async (data)=>
            {
                console.log("Recieved Data on Welcome ! ",data);
                const userData = await getUsersData(grpcClient,data);
                console.log(userData);
                dispatch(setQuestioners(userData));
            }
            answerSocket.on("connect",connectionHandler);
            answerSocket.on("users",usersHandler);
            answerSocket.on("welcome",welcomeHandler);
            answerSocket.on("connect_error",connectionFailedHandler);
            return ()=>
            {
                answerSocket.destroy();
            }
       }
    },[dispatch,answerSocket,grpcClient]);
    useEffect(()=>{
    async function effectCall()
    {
            const newPeer = new Peer();
            dispatch(setWebRTCConnection(newPeer));
            const response = await changeUserStatusHandler(grpcClient,accessToken,refreshToken,USER_STATUS.ANSWER,"","");
            console.log(response);
    }
    effectCall();
    const unloadEventListener = async ()=>
    {
        dispatch(setQuestioners([]));
        console.log("Connected Closed");
        dispatch(setWebRTCConnection(null));
        await changeUserStatusHandler(grpcClient,accessToken,refreshToken,USER_STATUS.ACTIVE,"","");
    }
    window.addEventListener("beforeunload",unloadEventListener);
    return ()=>
    {
        window.removeEventListener("beforeunload",unloadEventListener);
    }
    },[dispatch,grpcClient,accessToken,refreshToken]);
    useEffect(()=>
    {
        const connectionHandler = async ()=>
        {
            console.log("Remote Client Connected!");
            await changeUserStatusHandler(grpcClient,accessToken,refreshToken,USER_STATUS.CALL,"","");
        }
        const closeHandler = async ()=>
        {
            console.log("Closed the connection!");
            await changeUserStatusHandler(grpcClient,accessToken,refreshToken,USER_STATUS.ACTIVE,"","");
        }
        if(webRTCConnection)
        {
            webRTCConnection.on("connection",connectionHandler);
            webRTCConnection.on("close",closeHandler);
        }
        return ()=>
        {
            if(webRTCConnection)
            {
                webRTCConnection.off("connection",connectionHandler);
                webRTCConnection.off("close",closeHandler);
            }
        }
    },[webRTCConnection,grpcClient,dispatch,accessToken,refreshToken]);
    if(!user)
    {
        return <Protect/>
    }
    console.log(questioners);
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