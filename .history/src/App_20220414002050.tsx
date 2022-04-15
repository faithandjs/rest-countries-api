import React from 'react';
import Home from './components/home';
import Details from './components/details';
import Nav from './components/nav';
import { Routes, Route } from "react-router-dom"
import Parent from './components/parent'

let path = 'americas'

function App() {
  return (
    <div className='app light'>
      <Parent>
        <Nav/>
        <Routes >
          <Route path='/' element={<Home/>}/>
          <Route path={path} element={<Details/>}/>
        </Routes>
      </Parent>
    </div>  
  );
}

export default App;
