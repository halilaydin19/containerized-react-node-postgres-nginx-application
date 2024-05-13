import React from 'react';
import UserList from './list'; 
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NextPage from './nextpage';
function App() {
 

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<UserList />} />
        <Route path="/NextPage" element={<NextPage/>} />
      </Routes>
    </Router>
  );
}

export default App;