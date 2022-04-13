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
// https://restcountries.com/v3.1/name/{name}
// 
function Home(): JSX.Element { 
    interface display{
        img: string,
        name: string,
        population: number,
        region: string,
        capital: string
    }
    const axios = require('axios').default;
    const [data, setData] = useState<object[]>()
    const [inputValue, setInputValue] = useState('')
    const [currentCountries, setCurrentCountries] = useState([])
    const getLS = localStorage.getItem('countries-data')
    const settingCurrent = () => {
        let arr:display[];
        if (data !== undefined){
            data.map(item =>{
                console.log(item)
                //return {item}
        })
    }
    }
    settingCurrent()
    /*const displaySyntax = (arr:display[]) =>{
        arr.map(item =>{
            const alt = item.name + 'flag'
            return (
                <div>
                    <div><img src={item.img} alt={alt}/></div>
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
            if( getLS === 'undefined' || getLS === null){
                axios.get('https://restcountries.com/v3.1/all')
                .then(function (response:any) {
                    console.log(typeof response);
                    setData(response.data)
                    localStorage.setItem('countries-data', JSON.stringify(data))
                })
                .catch(function (error:any) {
                    console.log(error);
                  })
            }else{
                setData(JSON.parse(getLS))
            }
            if(data != undefined){
                console.log( data[1])
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
        console.log('set', inputValue, typeof data)
        
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