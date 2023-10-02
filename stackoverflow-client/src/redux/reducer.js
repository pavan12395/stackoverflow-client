import {
    SET_AUTH_STATUS,
    SET_USER,
    SET_LOGIN_ERROR,
    SET_SIGNUP_ERROR,
    SET_WEBRTC_CONNECTION,
    SET_QUESTIONERS,
    SET_ANSWER_ERROR,
    SET_SKILLS,
    SET_NEWSKILL_NAME,
    SET_NEWSKILL_DIFFICULTY,
    SET_AVAILABLESKILLOPTIONS,
    SET_GRPC_CLIENT,
    SET_QUESTION_TITLE,
    SET_QUESTION_DESCRIPTION,
    SET_RATING_REWARD,
    SET_QUESTION_MODAL,
    SET_PEER_CONNECTION,
    SET_MESSAGES,
    SET_QUESTION_DETAILS,
    SET_FIRST_REMOTE_MESSAGE,
    SET_REMOTE_CLIENT_NAME,
    SET_TYPE_OF_USER,
    SET_RECIEVED_REWARD_RATING,
    SET_RECIEVED_REWARD_MESSAGE
  } from './actionTypes';

  import { Skills } from '../Constants/constants';
  
  const initialState = {
    isAuth: false,
    user: null,
    loginError: null,
    signUpError: null,
    webRTCConnection: null,
    questioners: [],
    answerError: null,
    skills: [],
    newSkillName : "",
    newSkillDifficulty : "",
    availableSkillOptions : Skills,
    grpcClient : null,
    questionTitle : "",
    questionDescription : "",
    questionRatingReward : 0.0,
    questionModal : "",
    peerConnection : null,
    messages : [],
    questionDetails : null,
    firstRemoteMessage : true,
    remoteClientName : null,
    userType : "",
    recievedRewardRating : 0,
    recievedRewardMessage : ""
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_AUTH_STATUS:
        return {
          ...state,
          isAuth: action.payload,
        };
  
      case SET_USER:
        return {
          ...state,
          user: action.payload,
        };
  
      case SET_LOGIN_ERROR:
        return {
          ...state,
          loginError: action.payload,
        };
  
      case SET_SIGNUP_ERROR:
        return {
          ...state,
          signUpError: action.payload,
        };
  
      case SET_WEBRTC_CONNECTION:
        return {
          ...state,
          webRTCConnection: action.payload,
        };
  
      case SET_QUESTIONERS:
        return {
          ...state,
          questioners: action.payload,
        };
  
      case SET_ANSWER_ERROR:
        return {
          ...state,
          answerError: action.payload,
        };

      case SET_SKILLS:
        return{
            ...state,
            skills: action.payload
        }
      
      case SET_NEWSKILL_NAME:
        return{
          ...state,newSkillName: action.payload
        }
      case SET_NEWSKILL_DIFFICULTY:
        return{
          ...state,newSkillDifficulty: action.payload
        }
      case SET_AVAILABLESKILLOPTIONS:
        return{
          ...state,availableSkillOptions: action.payload
        }  
      case SET_GRPC_CLIENT:
        return{
          ...state,grpcClient : action.payload
        }
      case SET_QUESTION_TITLE:
        return{
          ...state,questionTitle:action.payload
        }
      case SET_QUESTION_DESCRIPTION:
        return{
          ...state,questionDescription:action.payload
        }
      case SET_RATING_REWARD:
        return{
          ...state,questionRatingReward:action.payload
        }
      case SET_QUESTION_MODAL:
        return{
          ...state,questionModal:action.payload
        }
      case SET_PEER_CONNECTION:
        return{
          ...state,peerConnection:action.payload
        }
      case SET_MESSAGES:
        return{
          ...state,messages:action.payload
        }
      case SET_QUESTION_DETAILS:
        return{
          ...state,questionDetails:action.payload
        }
      case SET_FIRST_REMOTE_MESSAGE:
        return {
          ...state,firstRemoteMessage:action.payload
        }
      case SET_REMOTE_CLIENT_NAME:
        return {
          ...state,remoteClientName:action.payload
        }
      case SET_TYPE_OF_USER:
        return {
          ...state,userType : action.payload
        }
      case SET_RECIEVED_REWARD_RATING:
        return{
          ...state,recievedRewardRating:action.payload
        }
      case SET_RECIEVED_REWARD_MESSAGE:
        return{
          ...state,recievedRewardMessage:action.payload
        }
      default:
        return state;
    }
  };
  
  export default reducer;
  