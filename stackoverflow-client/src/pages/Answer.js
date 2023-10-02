import React,{useEffect}  from 'react';
import { useSelector,useDispatch} from 'react-redux';
import Protect from '../components/Protect';
import Questioner from '../components/Questioner';
import { setQuestioners, setWebRTCConnection } from '../redux/actions';
import {changeUserStatusHandler, getUsersData} from '../Utils/Utils';
import io from 'socket.io-client';
import {USER_STATUS} from '../proto/stackoverflow_pb';
import Peer from 'peerjs';
import { useNavigate } from 'react-router-dom';
import { FaWindowRestore } from 'react-icons/fa';
export default function Answer()
{    
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user);
    const questioners = useSelector(state=>state.questioners);
    const grpcClient = useSelector(state=>state.grpcClient);
    const webRTCConnection = useSelector(state=>state.webRTCConnection);
    const navigate = useNavigate();
    useEffect(()=>
    {
        const socket = io('http://localhost:4000', { transports : ['websocket'] });
        socket.on("connect",()=>
            {
                console.log("Connected!");
            })
            socket.on("users",async (data)=>
            {
                console.log("Recieved Data! ",data);
                const userData = await getUsersData(grpcClient,data);
                console.log(userData);
                dispatch(setQuestioners(userData));
            });
            socket.on("welcome",async (data)=>
            {
                console.log("Recieved Data on Welcome ! ",data);
                const userData = await getUsersData(grpcClient,data);
                console.log(userData);
                dispatch(setQuestioners(userData));
            })

        return ()=>
        {
            socket.disconnect();
        }
    },[]);
    useEffect(()=>{
    const accessToken = window.localStorage.getItem("accessToken");
    const refreshToken = window.localStorage.getItem("refreshToken");
    async function effectCall()
    {
            const newPeer = new Peer();
            dispatch(setWebRTCConnection(newPeer));
            const response = await changeUserStatusHandler(grpcClient,accessToken,refreshToken,USER_STATUS.ANSWER,"");
            console.log(response);
    }
    effectCall();
    const unloadEventListener = async ()=>
    {
        dispatch(setQuestioners([]));
        console.log("Connected Closed");
        dispatch(setWebRTCConnection(null));
        await changeUserStatusHandler(grpcClient,accessToken,refreshToken,USER_STATUS.ACTIVE,"");
    }
    window.addEventListener("beforeunload",unloadEventListener);
    return ()=>
    {
        window.removeEventListener("beforeunload",unloadEventListener);
    }
    },[dispatch,grpcClient]);
    useEffect(()=>
    {
        let accessToken = window.localStorage.getItem("accessToken");
        let refreshToken = window.localStorage.getItem("refreshToken");
        if(webRTCConnection)
        {
            webRTCConnection.on("connect",async ()=>
            {
                console.log("Remote Client Connected!");
                await changeUserStatusHandler(grpcClient,accessToken,refreshToken,USER_STATUS.CALL,"");
                navigate("/chat");
            });
            webRTCConnection.on("close",async ()=>
            {
                console.log("Closed the connection!");
                await changeUserStatusHandler(grpcClient,accessToken,refreshToken,USER_STATUS.ACTIVE,"");
                navigate("/home");
            });
        }
    },[webRTCConnection,grpcClient]);
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
        />
      ))}
    </div>
    );
}