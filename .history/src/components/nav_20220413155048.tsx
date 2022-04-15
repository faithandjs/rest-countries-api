import React from 'react';

function Nav() {

    const changeClasses = () => {
       const box = document.querySelector('.app')?.classList
       //box?.add('dark')
       //box?.remove('light')
       if(document.querySelector('.light')){
            console.log('light')
            box?.add('dark')
            box?.remove('light')
       }else if(document.querySelector('.dark' )){
           console.log('dark')
           box?.add('light')
           box?.remove('dark')
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