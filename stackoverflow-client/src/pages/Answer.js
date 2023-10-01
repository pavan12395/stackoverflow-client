import React,{useEffect}  from 'react';
import { useSelector } from 'react-redux';
import { Protect } from '../components/Protect';
export default function Answer()
{    
    const user = useSelector(state=>state.user);
    if(!user)
    {
        return <Protect/>
    }
    return(
        <h1>Answer</h1>
    );
}