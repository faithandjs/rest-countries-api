import React, { useEffect, useState } from 'react';
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
    interface items {
        flag: string;
        name: string;
        population: number;
        region: string;
        capital: string;
    }
    const axios = require('axios').default;
    const [data, setData] = useState<items[]>([])
    const [inputValue, setInputValue] = useState('')
    const [currentCountries, setCurrentCountries] = useState<items[]>()
    const getLS = localStorage.getItem('countries-data')
    const settingCurrent = (data:items[]) => {
        if (data !== undefined){
            /*data.map(item =>{
                if (currentCountries !== undefined){    
                    setCurrentCountries([...currentCountries, {
                        flag: item.flag,
                        name: item.name,
                        population: item.population,
                        region: item.region,
                        capital: item.capital
                    }])
                }else{
                    setCurrentCountries([{
                        flag: item.flag,
                        name: item.name,
                        population: item.population,
                        region: item.region,
                        capital: item.capital
                    }])
                }

        })*/
        setCurrentCountries(data)
    }
    }
    //settingCurrent(data!)
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
            console.log( getLS ==='undefined', getLS ===null)
            if( getLS === 'undefined' || getLS === null || getLS === '[]'){
                console.log('befor fetch')
                axios.get('https://restcountries.com/v3.1/all')
                .then(function (response:any) {
                    console.log('after fetch in then')
                    response.data.map((item: items) => {
                        console.log(item, data)
                            setData([...data, {
                                flag: item.flag,
                                name: item.name,
                                population: item.population,
                                region: item.region,
                                capital: item.capital
                            }])
                    })
                    localStorage.setItem('countries-data', JSON.stringify(data))
                })
                .catch(function (error:any) {
                    console.log(error);
                  })
            }else{
                setData(JSON.parse(getLS))
                console.log(data,getLS)
            }
        }
            ,[inputValue])
    useEffect(
        () => {
            let pageLoad = false
            if (!pageLoad){
                //setCurrentCountries()
            }
           }
        )
        
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
                    the flags
                </div>
            </div>
        </div>
    );
}

export default Home;