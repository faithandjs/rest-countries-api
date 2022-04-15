import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import {Wrapper} from './parent';
import {contextType, detailsType} from './type'

//create state that is part of the redux ish that can be updated on click to 
//1. change light and dark icons
//2. set a state with current country details
//3. set paths and alt texts
function Details() {
    const { data, selectedCountry, currentIcons } = useContext(Wrapper) as contextType
    return (
        <div>
            <div><img src={currentIcons.arrow} alt='left arrow, back icon'/> Back</div>
            <div>
                <div><img alt='flag'/></div>
                hhhhhhhhhhhhhhhhh
            </div>
        </div>
    );
}

export default Details;