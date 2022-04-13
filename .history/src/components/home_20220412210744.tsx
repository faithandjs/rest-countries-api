import React, { useEffect, useRef, useState } from 'react';
import './style/style.scss'

/*
Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode *(optional)*

*/
// https://restcountries.com/v3.1/all
// 
function Home(): JSX.Element {
    const axios = require('axios').default;
    const [data, setData] = useState<arrItem[]>([])
    const [inputValue, setInputValue] = useState('')
    const [currentCountries, setCurrentCountries] = useState<items[]>()
    const getLS = localStorage.getItem('countries-data') 
    const currentCountriesSet = useRef(false)
    const passed = useRef(false)
    const passed1 = useRef(false)
    const initalDataLoad = useRef<boolean>(false)
    interface items {
        flags: string;
        name: string;
        population: number;
        region: string;
        capital: string[];
    }
    interface arrItem {
        flags: {
            svg:string;
        };
        name: {
            common:string;
        };
        population: number;
        region: string;
        capital: [];
    }
    const settingCurrent = (data:arrItem[]) => {
        if (data !== undefined || data !== null || data !== []){
            let arr: items[] = [];
            data.map(item =>{
                arr.push({
                    flags: item.flags.svg,
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
    useEffect(
        () => {
            if(passed1.current){
                localStorage.setItem('countries-data', JSON.stringify(data))
                if(!initalDataLoad.current){
                    settingCurrent(data)
                    initalDataLoad.current = true
                }
                console.log('useeffect for data')
            } 
            passed1.current = true
           }
        , [data])
    
     return (
        <div>
            <div className='firsthalf'>
                <div>Where in the world</div>
                <div><img alt='mode icon'/> Dark Mode</div>
            </div>
            <div className='secondhalf'>
                <form>
                    <div>
                        <img alt='search icon'/>
                        <input value={inputValue} onChange={(evt:React.FormEvent<HTMLInputElement>) => setInputValue((evt.target as HTMLInputElement).value)} placeholder='Search for a country...'/>
                    </div>
                    <select name='region'>
                        <option value='select'>Filter by Region</option>
                        <option value='africa'>Africa</option>
                        <option value='america'>America</option>
                        <option value='asia'>Asia</option>
                        <option value='europe'>Europe</option>
                        <option value='oceania'>Oceania</option>
                    </select>
                </form>

                <div className='all-flags'>
                    {currentCountriesSet.current ? 
                        currentCountries!.map(item =>{
                            const alt = item.name + ' flag'
                            return (
                                <div className='a-flag'>
                                    <div><img src={item.flags} alt={alt}/></div>
                                    <div className='text'>
                                        <h2>{item.name}</h2>
                                        <div>
                                            <div><span>population:</span> {item.population}</div>
                                            <div><span>region:</span> {item.region}</div>
                                            <div><span>capital:</span> {item.capital}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }): null
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;