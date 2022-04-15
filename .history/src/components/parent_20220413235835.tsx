import React, { createContext, useRef, useState } from 'react';
import arrowBlack from './images/right-arrItem.png'
import arrowWhite from './images/right-arrItem (1).png'
import mode from './images/sleep-mode (1).png'
import modeFill from './images/sleep-mode (2).png'


const wrapper = createContext()
const { Provider } = wrapper
function Parent({children}) {

    const [modeIcon, setModeIcon] = useState({
        dark: {
            mode: modeFill,
            arrow: arrowBlack
        },
        light: {
            mode: mode,
            arrow: arrowWhite
        }
    })
    const [details, setDetails] = useState({
        flag: '',
        name: '',
        nativeName: '',
        population: '',
        region: '',
        subRegion: '',
        capital: '',
        tld: '',
        currencies: [],
        languages: [],
        borderCountries: []
    })
    const src = useRef(modeIcon.light.mode)
    const back = useRef(modeIcon.light.arrow)
    const changeClasses = () => {
        const box = document.querySelector('.app')?.classList
         if(document.querySelector('.light')){
             console.log('light', box)
             box?.add('dark')
             box?.remove('light')
             src.current = modeIcon.dark.mode
             back.current = modeIcon.dark.arrow
        }else if(document.querySelector('.dark' )){
            console.log('dark', box)
            box?.add('light')
            box?.remove('dark')
            src.current = modeIcon.light.mode
            back.current = modeIcon.light.arrow
        }
     }
    return (
        <Provider value={}>
           {children} 
        </Provider>
    );
}

export default Parent;