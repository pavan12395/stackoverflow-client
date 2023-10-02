import React from "react";
import { Link } from "react-router-dom";


export default function Protect()
{
    return <h1><Link to="/">Signin</Link> to access this Page</h1>
}