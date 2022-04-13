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
    const axios = require('axios').default;
    const [data, setData] = useState<arrItem[]>([])
    const [inputValue, setInputValue] = useState('')
    const [currentCountries, setCurrentCountries] = useState<items[]>()
    const getLS = localStorage.getItem('countries-data') 
    interface items {
        flags: string;
        name: string;
        population: number;
        region: string;
        capital: string;
    }
    interface arrItem {
        flags: {
            png:string;
        };
        name: string;
        population: number;
        region: string;
        capital: string[];
    }
    const settingCurrent = (data:arrItem[]) => {
        if (data !== undefined){
            let arr: items[] = [];
            data.map(item =>{
                arr.push({
                    flags: item.flags.png,
                    name: item.name,
                    population: item.population,
                    region: item.region,
                    capital: item.capital[0]
                }
)
        })
        setCurrentCountries(arr)
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
                console.log('befor fetch')
                axios.get('https://restcountries.com/v3.1/all')
                .then(function (response:any) {
                    console.log('after fetch in then', response)
                    setData(response.data)
                })
                .catch(function (error:any) {
                    console.log(error);
                  })
                }else{
                setData(JSON.parse(getLS))
                console.log('data', data,'getLS', getLS)
                }
                settingCurrent(data!)
                passed = true;
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
        localStorage.setItem('countries-data', JSON.stringify(data))
        
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