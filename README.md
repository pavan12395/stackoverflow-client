# Stackoverflow-client

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
git clone https://github.com/pavan12395/stackoverflow-client.git
cd stackoverflow-client/stackoverflow-client/quickstart
docker-compose up
```
Open up localhost:8086 to access the application

## Components Overview


### Architecture

<img width="932" alt="Screenshot 2023-10-11 at 2 47 17 PM" src="https://github.com/pavan12395/stackoverflow-client/assets/60562210/31f942b3-5605-429b-a100-4d0c322ed0e3">


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


### Stackoverflow-client

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



## Walkthrough Demo

### Users sign's up by providing details like username , password , description , Skills

<img width="1792" alt="Screenshot 2023-10-15 at 7 41 08 AM" src="https://github.com/pavan12395/stackoverflow-client/assets/60562210/c45ea49e-d314-47c2-ba51-03944dd6bb63">
 
### User navigated to Home page on SignUp

<img width="1777" alt="Screenshot 2023-10-15 at 7 41 31 AM" src="https://github.com/pavan12395/stackoverflow-client/assets/60562210/d3851d96-b0ff-4c41-9ea8-fe4428c3c744">

### User chooses to Question gets navigated to /question Route 

<img width="1792" alt="Screenshot 2023-10-15 at 7 42 29 AM" src="https://github.com/pavan12395/stackoverflow-client/assets/60562210/34194207-3df1-4efd-9988-922c509f7dce">
<img width="1789" alt="Screenshot 2023-10-15 at 7 42 41 AM" src="https://github.com/pavan12395/stackoverflow-client/assets/60562210/5e6aa03d-0f99-4dc7-9336-130ea03c63b1">

### User chooses to Answer gets navigated to /answer Route where one will get live updates of Questions being asked

<img width="1792" alt="Screenshot 2023-10-15 at 7 43 24 AM" src="https://github.com/pavan12395/stackoverflow-client/assets/60562210/96560396-1795-4074-9bb4-8a142995aa34">

### User chooses to Answer a question is routed to Chat route , opening a Connection between the both Clients

<img width="1792" alt="Screenshot 2023-10-15 at 7 49 28 AM" src="https://github.com/pavan12395/stackoverflow-client/assets/60562210/5c2d9777-d2f7-44bf-81b3-6eb4881ddab2">

### Answerer gets rewarded and gets prompt message when questioner clicks on Reward Button

<img width="1792" alt="Screenshot 2023-10-15 at 7 46 42 AM" src="https://github.com/pavan12395/stackoverflow-client/assets/60562210/38351cda-c1f2-44f8-882b-ee119995c633">
 









