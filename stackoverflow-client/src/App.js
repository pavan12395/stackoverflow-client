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
import {checkTokenHandler, getGrpcClient,statusCodeCheck,getTokenHandler} from './Utils/Utils';
import {setGrpcClient,setUser,setAccessToken,setRefreshToken} from './redux/actions';
import { useNavigate } from 'react-router-dom';
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state)=>state.accessToken);
  const refreshToken = useSelector((state)=>state.refreshToken);
  const grpcClient = useSelector((state)=>state.grpcClient);
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
