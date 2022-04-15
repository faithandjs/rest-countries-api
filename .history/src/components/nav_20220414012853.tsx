import React, {useContext} from 'react';
import {Wrapper} from './parent';

function Nav() {
    const { src, changeClasses } = useContext(Wrapper)
/*
    const changeClasses = () => {
       const box = document.querySelector('.app')?.classList
        if(document.querySelector('.light')){
            console.log('light', box)
            box?.add('dark')
            box?.remove('light')
       }else if(document.querySelector('.dark' )){
           console.log('dark', box)
           box?.add('light')
           box?.remove('dark')
       }
    }*/
    return (
        <div className='navbar'>
            <div>Where in the world</div>
            <div onClick={() => changeClasses()} className='mode-box'>
                <img src={src} alt='mode icon'/> 
                Dark Mode
            </div>
        </div>
    );
}

export default Nav;