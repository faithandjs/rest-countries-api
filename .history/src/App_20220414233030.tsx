import React, {useContext} from 'react';
import Home from './components/home';
import Details from './components/details';
import Nav from './components/nav';
import { Routes, Route } from "react-router-dom"
import Parent, {Wrapper} from './components/parent'
//import {contextType} from './components/type'

//let path = 'americas'

function App() {
  //const {details} = useContext(Wrapper) as contextType
  //console.log(details)
  //const path = details.name? details.name : 'details'
  let path = 'details'
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
