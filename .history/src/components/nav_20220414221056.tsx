import React, {useContext} from 'react';
import {Wrapper} from './parent';
import {contextType} from './type'

function Nav() {
    const { currentIcons, changeClasses } = useContext(Wrapper) as contextType
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
                <img src={currentIcons.src} alt='mode icon' /> 
                <span>{currentIcons}</span>
            </div>
        </div>
    );
}

export default Nav;