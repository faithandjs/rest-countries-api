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
    const passed1 = useRef(false)
    interface items {
        flags: string;
        name: string;
        population: number;
        region: string;
        capital: string[];
    }
    interface arrItem {
        flags: {
            png:string;
        };
        name: {
            common:string;
        };
        population: number;
        region: string;
        capital: [];
    }
    const settingCurrent = (data:arrItem[]) => {
        console.log('inside settingCurrent')
        if (data !== undefined || data !== null || data !== []){
            console.log('inside settingCurrent, if')
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
            console.log('current countries after set', currentCountries)
        }
    }
    /*const displaySyntax = (arr:items[]) =>{
        arr.map(item =>{
            const alt = item.name + 'flag'
            return (
                <div>
                    <div><img src={item.flag} alt={alt}/></div>
                    <div>
                        <h2>{item.name}</h2>
                        <div>
                            <div>{item.population}</div>
                            <div>{item.region}</div>
                            <div>{item.capital}</div>
                        </div>
                    </div>
                </div>
            )
        })
    }*/
    useEffect(
        () => {
            let passed = false
            if(!passed){
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
                passed = true;
            }
        }
            ,[inputValue])
    useEffect(
        () => {
            console.log("before if",passed1.current)
            if(passed1.current){
                localStorage.setItem('countries-data', JSON.stringify(data))
                console.log("inside if",passed1.current)
                { settingCurrent(data)}
                console.log(currentCountries, currentCountriesSet.current)
                
            } 
            passed1.current = true
            console.log("after if",passed1.current)
           }
        , [data])
    
    console.log('current countries', currentCountries,'set?', currentCountriesSet.current)
    return (
        <div>
            <div>
                donde en el mundo
            </div>
            <div>
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

                <div>
                    {currentCountriesSet.current ? 
                        currentCountries!.map(item =>{
                            const alt = item.name + ' flag'
                            return (
                                <div>
                                    <div><img src={item.flags} alt={alt}/></div>
                                    <div>
                                        <h2>{item.name}</h2>
                                        <div>
                                            <div>{item.population}</div>
                                            <div>{item.region}</div>
                                            <div>{item.capital}</div>
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