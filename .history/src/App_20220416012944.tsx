import React, {useContext} from 'react';
import Home from './components/home';
import Details from './components/details';
import Nav from './components/nav';
import { Routes, Route } from "react-router-dom"
import Parent, {Wrapper} from './components/parent'

function App() {
  return (
    <div className='app light' style={{height: '100%', width: '100%'}}>
      <Parent>
        <Nav/>
        <Routes >
          <Route path='/' element={<Home/>}/>
          <Route path='details' element={<Details/>}/>
        </Routes>
      </Parent>
    </div>  
  );
}

export default App;
