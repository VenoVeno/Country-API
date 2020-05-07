import React from 'react';

import Country from '../country/country.component';

import './country-list.styles.scss';

export const CountryList = ({ country }) => {
    return (
        <div className="country-list">
            {
                country.map((country, index) => (
                    <Country key={index} country={country} />
                ))
            }
        </div>
    )
}

export default CountryList;