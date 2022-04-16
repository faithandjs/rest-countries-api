import React, {useContext} from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import {Wrapper} from './parent';
import {arrItem, contextType, detailsType} from './type'

//create state that is part of the redux ish that can be updated on click to 
//1. change light and dark icons
//3. set paths and alt texts
function Details() {
    const {data, details, currentIcons, settingDetails } = useContext(Wrapper) as contextType
    const [lang, setLang] = useState<any[]>([])
    
    useEffect(
        ()=>{
            let arr:any[] = []
                Object.entries(details.languages).forEach(([key, value], index) => {
                arr.push(value)
        }) 
            setLang(arr)
        }, [details]
    )
    const borderClick = (testName:string) => {
        data.map((item )=> {
            //let n:arrItem | null = null
            if (item.name.common === testName){
                settingDetails(item)
            }
        })
    }
    const borderCheck = () => {
        if (details.borders.length === 0 || details.borders === undefined){
            return null
        }else{
            return(
            <div className='border'>
                <span>border countries: </span>
                {details.borders.map((item, index) => {
                     
                return <div onClick={() => borderClick(item) }>{item }</div>
                    })}</div>)
        }
    }
    return (
        <div className='details'>
            <Link to='/'><div className='back'><img src={currentIcons.arrow} alt='left arrow, back icon'/> Back</div></Link>
            <div className='content'>
                <div className='flag'><img src={details.flag} alt='flag'/></div>
                <div className='moreContent'>
                    <div className='name'>{details.name} </div>
                    <div className='lists'>    
                        <ul>
                            <li><span>Native name: </span>{details.nativeName}</li>
                            <li><span>Population: </span>{details.population}</li>
                            <li><span>region: </span>{details.region}</li>
                            <li><span>sub region: </span>{details.subRegion}</li>
                            <li><span>capital: </span>{details.capital}</li>
                        </ul>
                        <ul>
                            <li><span>top level domain: </span>{details.tld}</li>
                            <li><span>currencies: </span>{details.currencies.map((item, index) => {
                                    if(index === 0){
                                        return `${item}`
                                    }else{
                                        return `, ${item}`
                                    }
                                })}</li>
                            <li><span>languages: </span>
                                {lang.map((item, index) => {
                                    if(index === 0){
                                        return `${item}`
                                    }else{
                                        return `, ${item}`
                                    }
                                })}
                            </li>

                        </ul>
                    </div>
                    {borderCheck()}
                </div>
            </div>
        </div>
    );
}

export default Details;