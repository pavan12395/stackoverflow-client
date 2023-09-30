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
    SET_GRPC_CLIENT
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
    grpcClient : null
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
      default:
        return state;
    }
  };
  
  export default reducer;
  