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
import {changeUserStatusHandler, checkJWTExpired, checkTokenHandler, getGrpcClient,statusCodeCheck} from './Utils/Utils';
import {setGrpcClient,setUser,setAccessToken,setRefreshToken, setUserStatus} from './redux/actions';
import { useNavigate } from 'react-router-dom';
import {USER_STATUS} from './proto/stackoverflow_pb';
import { ACCESS_TOKEN, ANSWER_ROUTE, CHAT_ROUTE, EMPTY_STRING, HOME_ROUTE, LOGIN_ROUTE, QUESTION_ROUTE, REFRESH_TOKEN, SIGNUP_ROUTE,SESSION_EXPIRED_MESSAGE} from './Constants/constants';
function App() {
console.log("Environment Variables Read are  : ")
console.log("REACT_APP_WEB_SOCKET_END_POINT : "+process.env.REACT_APP_WEB_SOCKET_END_POINT)
console.log("REACT_APP_ENVOY_END_POINT : "+process.env.REACT_APP_ENVOY_END_POINT)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state)=>state.accessToken);
  const refreshToken = useSelector((state)=>state.refreshToken);
  const grpcClient = useSelector((state)=>state.grpcClient);
  const userStatus = useSelector(state=>state.userStatus);
  const questionDetails = useSelector(state=>state.questionDetails);
  useEffect(()=>
  {
      dispatch(setAccessToken(window.localStorage.getItem(ACCESS_TOKEN)));
      dispatch(setRefreshToken(window.localStorage.getItem(REFRESH_TOKEN)));
      const client = getGrpcClient();
      dispatch(setGrpcClient(client));
  },[]);
  useEffect(()=>
  {
    if(grpcClient && accessToken && refreshToken)
    {
      changeUserStatusHandler(grpcClient,accessToken,refreshToken,userStatus.status,userStatus.id,questionDetails)
      .then((response)=>
      {
          if(checkJWTExpired(response))
          {
             alert(SESSION_EXPIRED_MESSAGE);
             navigate("/");
          }
      });
    }
  },[grpcClient,userStatus,questionDetails,accessToken,refreshToken]);
  useEffect(()=>
  {
     window.localStorage.setItem(ACCESS_TOKEN,accessToken);
     window.localStorage.setItem(REFRESH_TOKEN,refreshToken);
  },[accessToken,refreshToken]);
  useEffect(()=>
  {
    async function getUserFromToken()
    {
      if(accessToken)
      {
          const response =await checkTokenHandler(grpcClient,accessToken,null);
          if(checkJWTExpired(response))
          {
             alert(SESSION_EXPIRED_MESSAGE);
             navigate("/");
          }
          let errorMessage = statusCodeCheck(response)
          if(errorMessage===null){
            dispatch(setUser(response.user));
            dispatch(setUserStatus({status:USER_STATUS.ACTIVE,id:EMPTY_STRING}));
            navigate(HOME_ROUTE);
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
          <Route exact path={SIGNUP_ROUTE} element={<Signup/>} />
          <Route exact path={LOGIN_ROUTE} element={<Login/>} />
          <Route exact path={QUESTION_ROUTE} element={<Question/>} />
          <Route exact path={ANSWER_ROUTE} element={<Answer/>} />
          <Route exact path={CHAT_ROUTE} element={<Chat/>} />
          <Route exact path={HOME_ROUTE} element={<Home/>} />
        </Routes>
    </>
  );
}

export default App;
