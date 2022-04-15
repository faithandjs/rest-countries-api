import React, { createContext, useRef, useState, useEffect, useMemo, Props, ClassAttributes } from 'react';
import arrowBlack from './images/right-arrow.png'
import arrowWhite from './images/right-arrow (1).png'
import mode from './images/sleep-mode (1).png'
import modeFill from './images/sleep-mode (2).png'
import { type } from '@testing-library/user-event/dist/type';
import {arrItem, contextType, detailsType} from './type'

export const Wrapper = createContext<contextType | null>(null)
const { Provider } = Wrapper
function Parent({children} :any) {
    const axios = require('axios').default;
    const [data, setData] = useState<arrItem[]>([])
    const [selectedCountry, setSelectedCountry] = useState<number>(0)
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
    const [details, setDetails] = useState<detailsType>({
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
     console.log(Wrapper)
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
    const value:contextType = useMemo(
        () => ({data, selectedCountry, src, back, changeClasses, settingDetails})
        , [data, selectedCountry, src, back, changeClasses, settingDetails]
    )
    return (
        <Provider value={value}>
           {children} 
        </Provider>
    );
}
export default Parent;