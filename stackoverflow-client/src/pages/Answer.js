import React,{useEffect}  from 'react';
import { useSelector,useDispatch} from 'react-redux';
import { Protect } from '../components/Protect';
import { setQuestioners } from '../redux/actions';
import {getUsersData} from '../Utils/Utils';
import io from 'socket.io-client';
export default function Answer()
{    
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user);
    const questioners = useSelector(state=>state.questioners);
    useEffect(()=>
    {
        try{
            const socket = io('http://localhost:4000', { transports : ['websocket'] });
            socket.on("connect",()=>
            {
                console.log("Connected!");
            })
            socket.on("users",async (data)=>
            {
                console.log("Recieved Data! ",data);
                const userData = await getUsersData(data);
                dispatch(setQuestioners(userData));
            });
            socket.on("welcome",async (data)=>
            {
                console.log("Recieved Data! ",data);
                const userData = await getUsersData(data);
                dispatch(setQuestioners(userData));
            })
            return ()=>
            {
                socket.disconnect();
                dispatch(setQuestioners(null));
                console.log("Connected Closed");
            }
        }
        catch(e)
        {
            console.log(e);
        }
    },[]);
    if(!user)
    {
        return <Protect/>
    }
    return(
        <h1>Hello world</h1>
    );
}