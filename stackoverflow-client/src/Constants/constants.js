

console.log("Environment Variables Read are  : ")
console.log("REACT_APP_WEB_SOCKET_END_POINT : "+process.env.REACT_APP_WEB_SOCKET_END_POINT)
console.log("REACT_APP_ENVOY_END_POINT : "+process.env.REACT_APP_ENVOY_END_POINT)
export const difficultyOptions = ['EASY', 'MEDIUM', 'HARD'];
export const initSkills = ['JAVA','PYTHON','MYSQL']
export const QUESTION_ROUTE = "/question";
export const ANSWER_ROUTE = "/answer";
export const HOME_ROUTE = "/home";
export const SIGNUP_ROUTE = "/";
export const LOGIN_ROUTE = "/login";
export const CHAT_ROUTE = "/chat";
export const EMPTY_STRING="";
export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";
export const VALIDATION = "VALIDATION";
export const CONNECTION = "CONNECTION";
export const QUESTIONER = "QUESTIONER";
export const ANSWERER = "ANSWERER";
export const CONNECTION_WAIT_MESSAGE = "Connecting to a Client";
export const WEB_RTC_OPEN_EVENT = "open";
export const WEB_RTC_CONNECTION_EVENT = "connection";
export const WEB_SOCKET_END_POINT = process.env.REACT_APP_WEB_SOCKET_END_POINT || 'http://localhost:4000';
export const TRANSPORT_WEBSOCKET = 'websocket';
export const WEB_SOCKET_CONNECTION_ERROR = "Cant connect to WebSockets Server";
export const WEB_SOCKET_USERS_EVENT = "users"
export const WEB_SOCKET_WELCOME_EVENT = "welcome";
export const WEB_SOCKET_CONNECT_ERROR_EVENT = "connect_error";
export const ANSWERER_NO_REWARD_MESSAGE = "Questioner is not Satisified with your assistance";
export const ERROR_RATING_MESSAGE = "Error in Updating Rating";
export const ANSWERER_REWARD_MESSAGE = "User rewarded with rating : ";
export const WEB_RTC_MESSAGE_TYPE = "message";
export const WEB_RTC_SENDER_REMOTE_TYPE = 'remote';
export const WEB_RTC_SENDER_LOCAL_TYPE = "you";
export const WEB_RTC_REWARD_TYPE = "reward";
export const WEB_RTC_CONNECTION_OPEN_EVENT = "open";
export const WEB_RTC_CONNECTION_DATA_EVENT = "data";
export const WEB_RTC_CONNECTION_CLOSE_EVENT = "close";
export const GRPC_SERVER_END_POINT = process.env.REACT_APP_ENVOY_END_POINT || "http://localhost:9090";
export const QUESTION_TITLE_EMPTY = "Question title is Empty!";
export const QUESTION_DESC_EMPTY = "Question Description is Empty!";
export const QUESTION_REWARD_EMPTY = "Reward Amount should be More than 0";
export const JWT_EXPIRED_MESSAGE = "JWT expired at";
export const SESSION_EXPIRED_MESSAGE = "Session Expired Login once Again";