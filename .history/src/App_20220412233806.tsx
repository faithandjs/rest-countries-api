import React from 'react';
import Home from './components/home';
import Details from './components/details';
import { Routes, Route } from "react-router-dom"

let path = '/region/americas'

function App() {
  return (
    <Routes >
      <Route path='/' element={<Home/>}/>
      <Route path={path} element={<Details/>}/>
    </Routes>
  );
}

export default App;
