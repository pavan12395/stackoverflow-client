# stackoverflow-client

## Description
An remote peer to peer application where users can ask questions or answer questions implemented by using WebRTC and WebSockets.

### TechStack

| **Component**        | **Technology**                      |
|-----------------------|-------------------------------------|
| Frontend              | React, grpc-web, Docker             |
| GrpcServer            | protobuf, grpc, Spring Boot, Docker |
| WebSocketsServer      | NodeJS                              |
| Database              | MySQL                               |


## QuickStart

For setting up the application , Install docker compose on your local system , Execute the following commands

```
cd stackoverflow-client/quickstart
docker-compose up
```


## Components Overview

### Database 

MySQL database stores details of users in 3 tables as follows

Users(id,username,password,description,refreshToken,rating)

Skills(user_id,skill_id,skill_difficulty)

Live_users(user_id,user_status,webrtc_secret,question_details)

user_status takes values of enums as follows

| Value | State      |
|-------|------------|
| 0     | INACTIVE   |
| 1     | ACTIVE     |
| 2     | QUESTION   |
| 3     | ANSWER     |
| 4     | CALL       |

### WebSockets Server

A NodeJS server for giving live updates of Questions being asked to the users in ANSWER state 

| **Endpoint**            | **Description**                                                                                         |
|-------------------------|---------------------------------------------------------------------------------------------------------|
| Websockets endpoint     | Subscribed by users wanting live updates of questions.                                                  |
| `/userAdded` endpoint   | A REST endpoint protected by an `API_KEY`. It's called by a gRPC server when a user's status changes to or from "QUESTION." This endpoint emits an event to all users subscribed to the Websockets endpoint for live updates. |

### GrpcServer 
A grpc server implemented in Java using Spring Boot , Contains endpoints like /signUp , /login , /changeUserStatus , /checkToken , /getToken , /logout

Implemented Authentication using JWT tokens and encrypted the passwords using bcrypt library.
Makes a call to WebSockets Server when a user status is changed from QUESTION or to QUESTION

### Envoy-proxy

An envoy-proxy for handling incoming grpc-web traffic from the frontend Application to GrpcServer


### stackoverflow-client

The frontend React application which makes calls to GrpcServer through Envoy-proxy.


## Frontend Documentation

### Libraries

| Library                 | Purpose                                          |
|-------------------------|--------------------------------------------------|
| `react-router-dom`      | Navigation within a React application.         |
| `peerjs`                | Facilitates WebRTC communication.              |
| `react-redux`           | State management in React applications.        |
| `redux`                 | State management library for React.            |
| `socket.io-client`      | Subscribing to WebSockets endpoint.             |
| `protoc`                | Generates source code from `stackoverflow.proto` file. |

### Pages and Components

| Component          | Purpose                                               |
|-------------------|-------------------------------------------------------|
| SignUp            | Manages the sign-up functionality in the application. |
| Login             | Handles user login functionality.                    |
| Question          | Displays a form for QUESTIONERS to submit questions. |
| Answer            | Manages websockets events and displays all Questioners. |
| Home              | Serves as the landing page when a user is logged in, providing options to ask or answer questions. |
| Chat              | Displays QuestionDetails and the chat window.       |
| LayOut            | Displays user information, rating, and a logout button. |
| Modal             | A reusable component for displaying error messages and loading indicators throughout the application. |
| Protect           | Displays a message when a user accesses a route without proper authentication. |
| QuestionDetails   | Displays detailed information about a question in the Chat page. |
| Questioner        | Displays details of a Questioner in the Answer page. |
| Skills            | Allows users to select skills during the sign-up process.

### Redux state variables

| Redux Variable         | Description                                                                                                        |
|------------------------|--------------------------------------------------------------------------------------------------------------------|
| `user`                 | Decrypted user details obtained from JWT access token, used for user authentication and user-specific actions. |
| `loginError`           | Stores errors that occur during the user login process. Useful for displaying error messages to users.         |
| `signUpError`          | Captures errors during user signup, helping identify and handle issues that arise during the sign-up process.  |
| `webRTCConnection`     | Contains the Peer object for WebRTC communication, facilitating peer-to-peer data and media streaming.         |
| `questioners`          | Stores a set of live Questioners fetched from the WebSockets endpoint on the Answer Page.                        |
| `answerError`          | Records errors that occur during the process of answering questions, aiding in error handling and messaging.   |
| `Skills`               | Represents the set of skills selected by the user during the sign-up process, which can be used for matching.   |
| `newSkillName`         | Captures the name of a new skill entered in the Skills component.                                               |
| `newSkillDifficulty`   | Stores the difficulty level of a new skill entered in the Skills component.                                     |
| `availableSkillOptions`| Contains the remaining skill options after selecting the required skills in the Skills component.              |
| `grpcClient`           | Represents the client created for interacting with the gRPC service via the Envoy endpoint.                   |
| `questionModal`        | A boolean variable indicating whether to display a modal on the Question page.                                |
| `peerConnection`       | Stores the connection object received when a "connect" event occurs on the `webRTCConnection` Peer object.      |
| `messages`             | Holds a list of all messages in the Chat.js component, facilitating real-time communication and message display. |
| `questionDetails`      | Contains a JSON object representing detailed information about a question in the Chat.js component.            |
| `firstRemoteMessage`   | A boolean variable that indicates whether the first remote message has been received in the Chat.js component. |
| `remoteClientName`     | Variable storing the name of the remote client in the Chat.js component, allowing for identification.          |
| `userType`             | Takes the value of "QUESTIONER" or "ANSWERER" based on the page, distinguishing user roles.                    |
| `receivedRewardRating` | Represents the rating reward received at the end of answering a question by an ANSWERER.                         |
| `accessToken`          | Stores the JWT access token obtained from the session storage of the browser, used for authentication.       |
| `refreshToken`         | Holds the JWT refresh token obtained from the session storage of the browser, for token renewal.            |
| `answerSocket`         | Represents the `socket.io-client` object responsible for live updates on the Answer page.                   |
| `userStatus`           | Indicates the status of the user, helping manage user state and actions in the application.                   |









