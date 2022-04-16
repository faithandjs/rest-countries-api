import React, {useContext} from 'react';
import {Wrapper} from './parent';
import {contextType, currentIconsType} from './type'

function Nav() {
    const { currentIcons, current2, changeClasses } = useContext(Wrapper) as contextType
    
    return (
        <div className='navbar'>
            <div className='donde'>Where in the world</div>
            <div onClick={() => changeClasses()} className='mode-box'>
                <img src={currentIcons.src} alt='mode icon' /> 
                <span>{current2.text}</span>
            </div>
        </div>
    );
}

export default Nav;