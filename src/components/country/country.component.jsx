import React from 'react';

import Array from '../array-list/array-list.component';

import './country.styles.scss';

export const Country = ({ country }) => {
    const { name, region, capital, population, languages, currencies, timezones } = country;
    return (
        <div class="container">
            <h2>Country Details - {name} </h2>
            <ul class="responsive-table">
                <li class="table-header">
                    <div class="col col-1">Title</div>
                    <div class="col col-2">Value</div>
                </li>
                <li class="table-row">
                    <div class="col col-1" data-label="Title">Region</div>
                    <div class="col col-2" data-label="Value">{region}</div>
                </li>
                <li class="table-row">
                    <div class="col col-1" data-label="Title">Capital</div>
                    <div class="col col-2" data-label="Value">{capital}</div>
                </li>
                <li class="table-row">
                    <div class="col col-1" data-label="Title">Population</div>
                    <div class="col col-2" data-label="Value">{population}</div>
                </li>
                <li class="table-row">
                    <div class="col col-1" data-label="Title">Languages</div>
                    <div class="col col-2" data-label="Value"><Array array={languages} /></div>
                </li>
                <li class="table-row">
                    <div class="col col-1" data-label="Title">Currencies</div>
                    <div class="col col-2" data-label="Value"><Array key={currencies.code} array={currencies} /></div>
                </li>
                <li class="table-row">
                    <div class="col col-1" data-label="Title">TimeZone</div>
                    <div class="col col-2" data-label="Value">
                        <span>
                            {
                                timezones.map(timezone => (
                                    <span>{timezone}<br></br></span>
                                ))
                            }
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    )
}