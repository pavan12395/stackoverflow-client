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
        const socket = io('http://localhost:4000', { transports : ['websocket'] });
        dispatch(setWebRTCConnection(new Peer()));
        dispatch(setAnswerSocket(socket));
        return ()=>
        {
            dispatch(setAnswerSocket(null));
            dispatch(setQuestioners([]));
            dispatch(setAnswerError(""));
        }
    },[]);
    useEffect(()=>
    {
        if(answerSocket)
        {
            const connectionFailedHandler = ()=>
            {
                dispatch(setAnswerError("Cant connect to WebSockets Server"));
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
            answerSocket.on("users",usersHandler);
            answerSocket.on("welcome",welcomeHandler);
            answerSocket.on("connect_error",connectionFailedHandler);
            return ()=>
            {
                answerSocket.off("users",usersHandler);
                answerSocket.off("welcome",welcomeHandler);
                answerSocket.off("connect_error",connectionFailedHandler);
            }
       }
    },[dispatch,answerSocket,grpcClient]);
    
    useEffect(()=>
    {
        const connectionOpenHandler = async (id)=>
        {
            dispatch(setUserStatus({status : USER_STATUS.ANSWER,id: id}));
        }
        const connectionHandler = async (connection)=>
        {
             dispatch(setPeerConnection(connection));
             dispatch(setTypeOfUser("ANSWERER"));
             navigate("/chat");
        }
        const closeHandler =  async ()=>
        {
            dispatch(setUserStatus(USER_STATUS.ACTIVE));
            navigate("/home");
        }
        if(webRTCConnection)
        {
            webRTCConnection.on("open",connectionOpenHandler);
            webRTCConnection.on("connection",connectionHandler);
            webRTCConnection.on("close",closeHandler);
        }
        return ()=>
        {
            if(webRTCConnection)
            {
                webRTCConnection.off("open",connectionOpenHandler);
                webRTCConnection.off("connection",connectionHandler);
                webRTCConnection.off("close",closeHandler);
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