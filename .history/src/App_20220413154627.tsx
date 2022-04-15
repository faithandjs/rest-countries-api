import React from 'react';
import Home from './components/home';
import Details from './components/details';
import Nav from './components/nav';
import { Routes, Route } from "react-router-dom"

let path = 'americas'

function App() {
  return (
    <div className='app'>
      <Nav/>
      <Routes >
        <Route path='/' element={<Home/>}/>
        <Route path={path} element={<Details/>}/>
      </Routes>
    </div>  
  );
}

export default App;
