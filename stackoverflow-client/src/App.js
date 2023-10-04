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
import {setGrpcClient,setUser,setAccessToken,setRefreshToken, setUserStatus} from './redux/actions';
import { useNavigate } from 'react-router-dom';
import {USER_STATUS} from './proto/stackoverflow_pb';
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state)=>state.accessToken);
  const refreshToken = useSelector((state)=>state.refreshToken);
  const grpcClient = useSelector((state)=>state.grpcClient);
  const userStatus = useSelector(state=>state.userStatus);
  const user = useSelector(state=>state.user);
  const questionDetails = useSelector(state=>state.questionDetails);
  useEffect(()=>
  {
      dispatch(setAccessToken(window.localStorage.getItem("accessToken")));
      dispatch(setRefreshToken(window.localStorage.getItem("refreshToken")));
      const client = getGrpcClient();
      dispatch(setGrpcClient(client));
  },[]);
  useEffect(()=>
  {
    if(grpcClient && accessToken && refreshToken)
    {
      changeUserStatusHandler(grpcClient,accessToken,refreshToken,userStatus.status,userStatus.id,questionDetails);
    }
  },[grpcClient,userStatus,questionDetails,accessToken,refreshToken]);
  useEffect(()=>
  {
     window.localStorage.setItem("accessToken",accessToken);
     window.localStorage.setItem("refreshToken",refreshToken);
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
            dispatch(setUserStatus({status:USER_STATUS.ACTIVE,id:""}));
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
