import React, { createContext, useRef, useState, useEffect, useMemo, ClassAttributes } from 'react';
import arrowWhite from './images/next.png'
import arrowBlack from './images/next (1).png'
import mode from './images/sleep-mode (1).png'
import modeFill from './images/sleep-mode (2).png'
import {arrItem, contextType, detailsType, items, currentIconsType} from './type'

export const Wrapper = createContext<contextType | null>(null)
const { Provider } = Wrapper
const Parent: React.FC<React.ReactNode> =({children}) => {
    const axios = require('axios').default;
    const [data, setData] = useState<arrItem[]>([])
    const modeIcons = {
        dark: {
            mode: modeFill,
            arrow: arrowWhite,
            text: 'Light Mode'
        },
        light: {
            mode: mode,
            arrow: arrowBlack,
            text: 'Dark Mode'
        }
    }
    const [details, setDetails] = useState<detailsType>(
        {
        flag: '',
        name: '',
        nativeName: '',
        population: 0,
        region: '',
        subRegion: '',
        capital: [],
        tld: [],
        currencies: [],
        languages: {},
        borders: []
    })

    const getLSD = localStorage.getItem('countries-data-details')
    const getLS = localStorage.getItem('countries-data')
    const passed = useRef<boolean>(false)
    const passed1 = useRef<boolean>(false)
    const native = useRef<string>('') 
    const currency = useRef<string[]>([])
    const [currentIcons, setCurrentIcons] = useState<currentIconsType>({
        src: modeIcons.light.mode, 
        arrow: modeIcons.light.arrow,
        text:  modeIcons.light.text
    })
    const changeClasses = () => {
        const box = document.querySelector('.app')?.classList
        if(document.querySelector('.light')){
             box?.add('dark')
             box?.remove('light')
             setCurrentIcons({
                src: modeIcons.dark.mode, 
                arrow: modeIcons.dark.arrow,
                text:  modeIcons.dark.text
             })
        }else if(document.querySelector('.dark' )){
            setCurrentIcons({
                src: modeIcons.light.mode, 
                arrow: modeIcons.light.arrow,
                text:  modeIcons.light.text
             })
            box?.add('light')
            box?.remove('dark')
        }
     }
    const settingDetails = (obj:arrItem) => {
        data.map((item, index) => {
            if (item.name.common === obj.name.common){
            const active = data[index]
            const nativeNames = active.name.nativeName;
            Object.entries(nativeNames).forEach(([key, value], index) => {
                if (index === (Object.keys(nativeNames).length - 1)){
                    native.current = value.common
                }
              });
            let arr:string[] = []
            Object.entries(active.currencies).forEach(([key, value], index) => {
                arr.push(value.name)
            });
            let arr2:string[] = []
            if (active.borders){
                active.borders.map(item => {
                    let item1 = item
                    data.map(item => {
                        if (item.cca3 === item1){
                            arr2.push(item.name.common)
                        }
                    })
                })
            }
            setDetails({
                flag: active.flags.svg,
                name: active.name.common,
                nativeName: native.current,
                population: active.population,
                region: active.region,
                subRegion: active.subregion,
                capital: active.capital,
                tld: active.tld,
                currencies: arr,
                languages: active.languages,
                borders: arr2
            })
            }
        })
        
    }
    
    useEffect(
        () => {
            if(!passed.current){
                if(  getLSD   ){
                    if(JSON.parse(getLSD!).name !== ''){
                        setDetails(JSON.parse(getLSD!))
                    }
                }
            }
        },[]
    )
    useEffect(
        () => {
            if(passed.current){localStorage.setItem('countries-data-details', JSON.stringify(details))}
        }
    , [details])
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
    let current2:currentIconsType = currentIcons
    //in nav, currentIcons.text is not recieved. 
    //so i assigned it to current2 and sent
    //also noticed that once i sent current2, i couldnt change it again
    const value:contextType = useMemo(
        () => ({data, details, currentIcons, current2, changeClasses, settingDetails})
        , [data, details, currentIcons, current2, changeClasses, settingDetails]
    )
    return (
        <Provider value={value}>
           {children} 
        </Provider>
    );
}
export default Parent;