import React, { createContext, useRef, useState, useEffect, useMemo, Props, ClassAttributes } from 'react';
import arrowBlack from './images/right-arrItem.png'
import arrowWhite from './images/right-arrItem (1).png'
import mode from './images/sleep-mode (1).png'
import modeFill from './images/sleep-mode (2).png'
import { type } from '@testing-library/user-event/dist/type';


export const Wrapper = createContext()
const { Provider } = Wrapper
function Parent({children} :any) {
    interface arrItem {
        flags: {
            png: string;
        };
        name: {
            common:string;
        };
        population: number;
        region: string;
        capital: [];
    }
    const axios = require('axios').default;
    const [data, setData] = useState<arrItem[]>([])
    const [selectedCountry, setSelectedCountry] = useState(0)
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
    const getLS = localStorage.getItem('countries-data')
    const passed = useRef(false) 
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
    const settingDetails = () => {

    }
    useEffect(
        () => {
            console.log('inside inputval useeffect');
            if(!passed.current){
                if( getLS === 'undefined' || getLS === null || getLS === '[]'){
                axios.get('https://restcountries.com/v3.1/all')
                .then(function (response:any) {
                    setData(response.data)
                })
                .catch(function (error:any) {
                    console.log(error);
                  })
                }else{
                    setData(JSON.parse(getLS))
                }
                passed.current = true;
            }
        }
            ,[])
    const value = useMemo(
        () => ({data, selectedCountry, src, back, changeClasses, settingDetails})
        , [data, selectedCountry, src, back, changeClasses, settingDetails]
    )
    return (
        <Provider value={value}>
           {children} 
        </Provider>
    );
}
/*
const value: {
    data: arrItem[];
    selectedCountry: number;
    src: React.MutableRefObject<string>;
    back: React.MutableRefObject<string>;
    changeClasses: () => void;
    settingDetails: () => void;
} */
export default Parent;