import React from 'react';

import { Country } from '../country/country.component';

import './country-list.styles.scss';

export const CountryList = (props) => {
    return (
        <div className="country-list">
            {
                props.country.map(
                    country =>
                        (
                            <Country key={country.id} country={country} />
                        )
                )
            }
        </div>
    )
}