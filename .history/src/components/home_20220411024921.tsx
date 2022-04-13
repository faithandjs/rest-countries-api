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
    const axios = require('axios').default;
    const [data, setData] = useState<any[]>()
    const[inputValue, setInputValue] = useState('')
    const [currentCountries, setCurrentCountries] = useState([])
    const getLS = localStorage.getItem('countries-data')
    /**/
        useEffect(
        () => {
            console.log( getLS ==='undefined', getLS ===null)
            if( getLS === 'undefined' || getLS === null){
                axios.get('https://restcountries.com/v2/all')
                .then(function (response:any) {
                    console.log(typeof response);
                    setData(response)
                    localStorage.setItem('countries-data', JSON.stringify(data))
                })
                .catch(function (error:any) {
                    console.log(error);
                  })
            }else{
                setData(JSON.parse(getLS))
            }
            if(data != undefined){
                //console.log( data.data[1])
            }
        }
            ,[inputValue])
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