import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Question from './pages/Question';
import Answer from './pages/Answer';
import Chat from './pages/Chat';
import Home from './pages/Home';
import Layout from './components/LayOut';
function App() {
  return (
    <Router>
      <Layout/>
        <Routes>
          <Route exact path="/" element={<Signup/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/question" element={<Question/>} />
          <Route exact path="/answer" element={<Answer/>} />
          <Route exact path="/chat" element={<Chat/>} />
          <Route exact path="/home" element={<Home/>} />
        </Routes>
    </Router>
  );
}

export default App;
