import React, { useState } from 'react';
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
    const fetchCountries = () =>{
        axios.get('/user?ID=12345')
        .then(function (response:object) {
            console.log(response);
            return response
        })
        .catch(function (error:any) {
            console.log(error);
        })
        .then(function () {
            console.log('here')
        });
    }
    const getCountriesFromLS:any = localStorage.getItem('countries-data')
    //const [data, setData] = useState(localStorage.getItem('countries-data')? JSON.parse(localStorage.getItem('countries-data')!): fetchCountries())
    if( localStorage.getItem('countries-data') === null){
        console.log('string')
    }else{
        console.log('not')
    }
    //localStorage.setItem('countries-data', JSON.stringify(data))
    //console.log(localStorage.getItem('countries-data'), data)
    return (
        <div>
            <div>
                donde en el mundo
            </div>
            <div>
                <form>
                    <div>
                        <img alt='search icon'/>
                        <input placeholder='Search for a country...'/>
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