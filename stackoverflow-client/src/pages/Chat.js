import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function Chat()
{
    const navigate = useNavigate();
    const isAuth = useSelector(state=>state.isAuth);
    useEffect(()=>
    {
        if(!isAuth)
        {
        navigate("/");
        }
    },[]);
    return(
        <h1>Chat</h1>
    );
}