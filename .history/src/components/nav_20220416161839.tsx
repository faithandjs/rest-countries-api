import React, {useContext} from 'react';
import {Wrapper} from './parent';
import {contextType, currentIconsType} from './type'

function Nav() {
    const { currentIcons, changeClasses } = useContext(Wrapper) as contextType
//console.log(currentIcons)
    return (
        <div className='navbar'>
            <div className='donde'>Where in the world</div>
            <div onClick={() => changeClasses()} className='mode-box'>
                <img src={currentIcons.src} alt='mode icon' /> 
                <span>Dark mode</span>
            </div>
        </div>
    );
}

export default Nav;