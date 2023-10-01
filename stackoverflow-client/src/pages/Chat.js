import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Protect } from '../components/Protect';

export default function Chat()
{
    const user = useSelector(state=>state.user);
    if(!user)
    {
        return <Protect/>
    }
    return(
        <h1>Chat</h1>
    );
}