import React, { createContext, useRef, useState, useEffect, useMemo, Props, ClassAttributes } from 'react';
import arrowBlack from './images/right-arrow.png'
import arrowWhite from './images/right-arrow (1).png'
import mode from './images/sleep-mode (1).png'
import modeFill from './images/sleep-mode (2).png'
import { type } from '@testing-library/user-event/dist/type';
import {arrItem, contextType, detailsType} from './type'

export const Wrapper = createContext<contextType | null>(null)
const { Provider } = Wrapper
const Parent: React.FC<React.ReactNode> =({children}) => {
    const axios = require('axios').default;
    const [data, setData] = useState<arrItem[]>([])
    const [selectedCountry, setSelectedCountry] = useState<number>(0)
    const modeIcons = {
        dark: {
            mode: modeFill,
            arrow: arrowWhite
        },
        light: {
            mode: mode,
            arrow: arrowBlack
        }
    }
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
    const [currentIcons, setCurrentIcons] = useState({
        src: modeIcons.light.mode, 
        arrow: modeIcons.light.arrow
    })
    //const src = useRef(modeIcon.light.mode)
    //const back = useRef(modeIcon.light.arrow)
    const changeClasses = () => {
        const box = document.querySelector('.app')?.classList
        if(document.querySelector('.light')){
             box?.add('dark')
             box?.remove('light')
             setCurrentIcons({
                src: modeIcons.light.mode, 
                arrow: modeIcons.light.arrow
             })
        }else if(document.querySelector('.dark' )){
            setCurrentIcons({
                src: modeIcons.dark.mode, 
                arrow: modeIcons.dark.arrow
             })
            box?.add('light')
            box?.remove('dark')
        }
     }
    const settingDetails = () => {

    }
    useEffect(
        () => {
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
        () => ({data, selectedCountry, currentIcons, changeClasses, settingDetails})
        , [data, selectedCountry, currentIcons, changeClasses, settingDetails]
    )
    return (
        <Provider value={value}>
           {children} 
        </Provider>
    );
}
export default Parent;