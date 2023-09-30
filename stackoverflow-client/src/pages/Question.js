import React,{useEffect}  from 'react';
import {useSelector} from 'react-redux';



export default function Question()
{
    const isAuth = useSelector(state=>state.isAuth);
    console.log("hello world");
    return(
        <h1>Question</h1>
    );
}