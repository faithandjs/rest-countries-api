import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import {Wrapper} from './parent';
import {contextType, detailsType} from './type'

//create state that is part of the redux ish that can be updated on click to 
//1. change light and dark icons
//2. set a state with current country details
//3. set paths and alt texts
function Details() {
    const { details, currentIcons } = useContext(Wrapper) as contextType
    return (
        <div className='details'>
            <div className='back'><img src={currentIcons.arrow} alt='left arrow, back icon'/> Back</div>
            <div>
                <div><img src={details.flag} alt='flag'/></div>
                <div>
                    <div>{details.name} </div>
                    <ul>
                        <li><span>Native name</span> {details.nativeName}</li>
                        <li><span>Population</span> {details.population}</li>
                        <li><span>region</span> {details.region}</li>
                        <li><span>sub region</span> {details.subRegion}</li>
                        <li><span>capital</span> {details.capital}</li>
                        <li><span>top level domain</span> {details.tld}</li>
                        <li><span>currencies</span> {details.currencies}</li>
                        <li><span>languages</span> 
                            {Object.entries(details.languages).forEach(([key, value], index) => {
                                console.log(`${index}: ${key} = ${value}`, details.languages);
                                return <span> {value}</span>
                                })
                            }
                        </li>
                    </ul>
                    <div><span>border countries</span>{details.borders}</div>
                </div>
            </div>
        </div>
    );
}

export default Details;