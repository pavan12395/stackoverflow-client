import React, { useEffect } from 'react';
import {Route, Routes} from 'react-router-dom';
import { Provider } from 'react-redux';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Question from './pages/Question';
import Answer from './pages/Answer';
import Chat from './pages/Chat';
import Home from './pages/Home';
import Layout from './components/LayOut';
import { useSelector,useDispatch} from 'react-redux';
import {checkTokenHandler, getGrpcClient,statusCodeCheck, store,getTokenHandler} from './Utils/Utils';
import { setAuthStatus, setGrpcClient,setUser} from './redux/actions';
import { useNavigate } from 'react-router-dom';
import { FaWindowRestore } from 'react-icons/fa';
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state)=>state.isAuth);
  console.log(isAuth);
  const grpcClient = useSelector((state)=>state.grpcClient);
  useEffect(()=>
  {
    const refreshToken = window.localStorage.getItem("refreshToken");
    if(refreshToken!="" && !isAuth)
    {
      console.log("Executing!!!");
      dispatch(setAuthStatus(true));
    }
  },[]);
  useEffect(()=>
  {
    console.log("Executing!");
    async function retryForToken()
    {
       const refreshToken = window.localStorage.getItem("refreshToken");
       const response = await getTokenHandler(grpcClient,refreshToken);
       console.log(response);
       let errorMessage = statusCodeCheck(response);
       if(errorMessage==null)
       {
          window.localStorage.setItem("accessToken",response.accesstoken);
          getUserFromToken(false)
       }
       else
       {
          window.localStorage.setItem("accessToken",null);
          window.localStorage.setItem("accessToken",null);
          navigate("/");
       }
    }
    async function getUserFromToken(retry)
    {
      const accessToken = window.localStorage.getItem("accessToken");
      if(accessToken)
      {
          const response =await checkTokenHandler(grpcClient,accessToken,null);
          let errorMessage = statusCodeCheck(response)
          if(errorMessage!=null && retry)
          {
            await retryForToken();
          }
          else
          {
            dispatch(setUser(response.user));
            navigate("/home");
          }
      }
    }
    async function authStatusListener()
    {
         if(grpcClient && isAuth)
         {
            await getUserFromToken(true);
         }    
    }
     authStatusListener();
  },[isAuth,grpcClient]);
  useEffect(()=>
  {
     const client = getGrpcClient();
     console.log(client);
     dispatch(setGrpcClient(client));
  },[]);
  
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
