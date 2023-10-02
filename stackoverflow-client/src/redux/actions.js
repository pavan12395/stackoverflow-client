import {SET_ANSWER_ERROR,SET_AUTH_STATUS,SET_LOGIN_ERROR,SET_QUESTIONERS,SET_SIGNUP_ERROR,SET_SKILLS,SET_USER,SET_WEBRTC_CONNECTION,
SET_NEWSKILL_DIFFICULTY,SET_NEWSKILL_NAME,SET_AVAILABLESKILLOPTIONS, SET_GRPC_CLIENT, SET_QUESTION_TITLE, SET_QUESTION_DESCRIPTION, SET_RATING_REWARD, SET_QUESTION_MODAL, SET_PEER_CONNECTION, SET_MESSAGES, SET_QUESTION_DETAILS} from './actionTypes';
// Action creators
export const setQuestioners = (data) => {
  return {
    type: SET_QUESTIONERS,
    payload: data,
  };
};

export const setAnswerError = (error) => {
  return {
    type: SET_ANSWER_ERROR,
    payload: error,
  };
};

export const setSignupError = (error) => {
  return {
    type: SET_SIGNUP_ERROR,
    payload: error,
  };
};

export const setWebRTCConnection = (connectionData) => {
  return {
    type: SET_WEBRTC_CONNECTION,
    payload: connectionData,
  };
};

export const setAuthStatus = (status) => {
  return {
    type: SET_AUTH_STATUS,
    payload: status,
  };
};

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const setLoginError = (error) => {
  return {
    type: SET_LOGIN_ERROR,
    payload: error,
  };
};

export const setSkills = (skills) => {
  return {
    type: SET_SKILLS,
    payload: skills,
  };
};

export const setNewSkillName = (newSkillName) => {
  return {
    type : SET_NEWSKILL_NAME,
    payload : newSkillName
  }
}

export const setNewSkillDifficulty = (newSkillDifficulty)=>
{
  return {
    type : SET_NEWSKILL_DIFFICULTY,
    payload : newSkillDifficulty
  }
}

export const setAvailableSkillOptions = (availableSkills)=>
{
  return {
    type : SET_AVAILABLESKILLOPTIONS,
    payload : availableSkills
  }
}

export const setGrpcClient = (grpcClient)=>
{
  return {
    type : SET_GRPC_CLIENT,
    payload : grpcClient
  }
}

export const setQuestionTitle = (title)=>
{
  return {
    type: SET_QUESTION_TITLE,
    payload : title
  }
}

export const setQuestionDescription = (desc)=>
{
  return {
    type : SET_QUESTION_DESCRIPTION,
    payload : desc
  }
}

export const setRatingReward = (ratingReward)=>
{
  return {
    type : SET_RATING_REWARD,
    payload : ratingReward
  }
}

export const setQuestionModal = (questionModal)=>
{
  return {
    type : SET_QUESTION_MODAL,
    payload : questionModal
  }
}

export const setPeerConnection = (peerConnection)=>
{
  return{
    type : SET_PEER_CONNECTION,
    payload : peerConnection
  }
}

export const setMessages = (messages)=>
{
  return {
    type : SET_MESSAGES,
    payload : messages
  };
}

export const setQuestiondetails = (questionDetails)=>
{
  return {
    type : SET_QUESTION_DETAILS,
    payload : questionDetails
  }
}