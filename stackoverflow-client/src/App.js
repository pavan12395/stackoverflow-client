import React, { useEffect } from 'react';
import {Route, Routes} from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Question from './pages/Question';
import Answer from './pages/Answer';
import Chat from './pages/Chat';
import Home from './pages/Home';
import Layout from './components/LayOut';
import { useSelector,useDispatch} from 'react-redux';
import {changeUserStatusHandler, checkTokenHandler, getGrpcClient,statusCodeCheck} from './Utils/Utils';
import {setGrpcClient,setUser,setAccessToken,setRefreshToken} from './redux/actions';
import { useNavigate } from 'react-router-dom';
import { FaIgloo } from 'react-icons/fa';
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state)=>state.accessToken);
  const refreshToken = useSelector((state)=>state.refreshToken);
  const grpcClient = useSelector((state)=>state.grpcClient);
  const userStatus = useSelector(state=>state.userStatus);
  const questionDetails = useSelector(state=>state.questionDetails);
  const userType = useSelector(state=>state.userType);
  const webRTCConnection = useSelector(state=>state.webRTCConnection);
  useEffect(()=>
  {
      dispatch(setAccessToken(window.localStorage.getItem("accessToken")));
      dispatch(setRefreshToken(window.localStorage.getItem("refreshToken")));
      const client = getGrpcClient();
      console.log(client);
      dispatch(setGrpcClient(client));
  },[]);
  useEffect(()=>
  {
    if(grpcClient)
    {
      console.log("Changing the user status",userStatus,questionDetails);
      changeUserStatusHandler(grpcClient,accessToken,refreshToken,userStatus.status,userStatus.id,questionDetails);
    }
  },[grpcClient,userStatus,questionDetails,accessToken,refreshToken]);
  useEffect(()=>
  {
    const beforeUnload = ()=>
    {
     window.localStorage.setItem("accessToken",accessToken);
     window.localStorage.setItem("refreshToken",refreshToken);
    }
    window.addEventListener("beforeunload",beforeUnload);
    return ()=>
    {
      window.removeEventListener("beforeunload",beforeUnload);
    }
  },[accessToken,refreshToken]);
  useEffect(()=>
  {
    async function getUserFromToken()
    {
      if(accessToken)
      {
          const response =await checkTokenHandler(grpcClient,accessToken,null);
          let errorMessage = statusCodeCheck(response)
          if(errorMessage==null){
            dispatch(setUser(response.user));
            navigate("/home");
          }
      }
    }
    if(accessToken && refreshToken)
    {
      getUserFromToken(); 
    }
  },[accessToken,refreshToken,grpcClient]);
  
  return (
    <>
    <Layout/>
        <Routes>
          <Route exact path="/" element={<Signup/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/question" element={<Question/>} />
          <Route exact path="/answer" element={<Answer/>} />
          <Route exact path="/chat" element={<Chat/>} />
          <Route exact path="/home" element={<Home/>} />
        </Routes>
    </>
  );
}

export default App;
