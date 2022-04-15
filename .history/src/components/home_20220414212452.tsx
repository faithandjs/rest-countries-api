import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import './style/style.scss'
import searchImg from './images/search.png'
import {Wrapper} from './parent';
import {arrItem, items, contextType} from './type'

/*
Users should be able to:
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode *(optional)*

*/
// https://restcountries.com/v3.1/all
// 
function Home({children} :any): JSX.Element {
    const {data, settingDetails} = useContext(Wrapper) as contextType
    const [toBeDisplayed, setTobeDisplayed] = useState<arrItem[]>([])
    const [inputValue, setInputValue] = useState('')
    const [currentCountries, setCurrentCountries] = useState<items[]>([])
    const currentCountriesSet = useRef(false)
    const passed1 = useRef(false)
    const passed2 = useRef(false)
    const initalDataLoad = useRef<boolean>(false)
    
    const settingCurrent = (data:arrItem[]) => {
        /*console.log('inside setting current', 'current countres',  currentCountries)
        console.log( 'data',Object.keys(data).length)
        console.log(  'toBeDisplayed', Object.keys(toBeDisplayed).length)*/
        if (data !== undefined || data !== null || data !== []){
            let arr: items[] = [];
            data.map(item =>{
                arr.push({
                    flags: item.flags.png,
                    name: item.name.common,
                    population: item.population,
                    region: item.region,
                    capital: item.capital
                })
            })
            setCurrentCountries(arr)
            currentCountriesSet.current = true
        }
    }
    useEffect(
        () => {
            if(passed1.current){
                localStorage.setItem('countries-data', JSON.stringify(data))
                if(!initalDataLoad.current){
                    settingCurrent(data)
                    setTobeDisplayed(data)
                    //console.log('set tobe displayed')
                    initalDataLoad.current = true
                }
            } 
            passed1.current = true
           }
        , [data])
    useEffect(
        () => {
            if(passed2){
                search()
                console.log('search()')
            }
            passed2.current = true
        }
    , [inputValue])
    const search = () => {
        let arr:arrItem[] = [];
        toBeDisplayed.map(item =>{
            if (item.name.common.toLowerCase().includes(`${inputValue.toLowerCase()}`) ){
                arr.push(item)
            }
        })
        settingCurrent(arr) 
    }
    console.log('toBeDisplayed',  Object.keys(toBeDisplayed).length,
     'general', currentCountries)
    const selectRegion = () =>{
        let arr:arrItem[] = []
        let value = document.querySelector('select')!.value
        console.log('region', value)
        if(value !== 'all'){
            data.map(item => {
                if (item.region === value){
                    arr.push(item)
                }
            })
            console.log('here')
            setTobeDisplayed(arr)
            settingCurrent(arr)
            search()
        }else{
            settingCurrent(data)
            setTobeDisplayed(data)
            //search()
        }
        search()
    }
     return (
            <div className='home'>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <img src={searchImg} alt='search icon'/>
                        <input value={inputValue} type='text' 
                        onChange={(evt:React.FormEvent<HTMLInputElement>) => {
                            setInputValue((evt.target as HTMLInputElement).value)
                        }} 
                        placeholder='Search for a country...'/>
                    </div>
                    <select name='region' onChange={() => selectRegion()}>{/* path /region/name */}
                        <option value='all' >Filter by Region</option>
                        <option value='Africa' >Africa</option>
                        <option value='Americas'>Americas</option>
                        <option value='Asia'>Asia</option>
                        <option value='Europe'>Europe</option>
                        <option value='Oceania'>Oceania</option>
                    </select>
                </form>

                <div className='all-flags'>
                    {currentCountriesSet.current ? 
                        currentCountries!.map((item, index) =>{
                            const alt = item.name + ' flag'
                            //make a to var that consists of /name
                            return (
                                <Link to='americas'>
                                <div key={index} className='a-flag' onClick={() => settingDetails(item)} >
                                    <div className='flag-box'><img src={item.flags} alt={alt}/></div>
                                    <div className='text'>
                                        <h2>{item.name}</h2>
                                        <div>
                                            <div><span>population:</span> {item.population}</div>
                                            <div><span>region:</span> {item.region}</div>
                                            <div><span>capital:</span> {item.capital}</div>
                                        </div>
                                    </div>
                                </div>
                                </Link>
                            )
                        }): null
                    }
                </div>
            </div>
    );
}

export default Home;