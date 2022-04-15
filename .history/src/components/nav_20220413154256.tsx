import React from 'react';

function Nav() {

    const changeClasses = () => {
       const box = document.querySelector('.mode-box')?.classList
       //box?.add('dark')
       //box?.remove('light')
       if(document.querySelector('.light')){
           console.log('light')
       }
    }
    return (
        <div className='navbar'>
            <div>Where in the world</div>
            <div onClick={() => changeClasses()} className='mode-box light'><img alt='mode icon'/> Dark Mode</div>
        </div>
    );
}

export default Nav;