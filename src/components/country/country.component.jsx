import React from 'react';

import Array from '../array-list/array-list.component';

import './country.styles.scss';

export const Country = ({ country }) => {
    const { name, region, capital, population, languages, currencies, timezones } = country;
    return (
        <div key="props.country.id" className="country-container">
            <h2>Country Name : {name} </h2>
            <h2>Region : {region} </h2>
            <h2>Capital : {capital}</h2>
            <h2>Population : {population} </h2>

            <h2>Languages : </h2>
            <Array array={languages} />

            <h2>Currencies : </h2>
            <Array key={currencies.code} array={currencies} />

            <h2>TimeZone : </h2>
            {
                timezones.map(timezone => (
                    <h1>{timezone}</h1>
                ))
            }

        </div >
    )
}