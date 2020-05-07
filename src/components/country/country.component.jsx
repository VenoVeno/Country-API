import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Array from '../array-list/array-list.component';

import { selectFieldsToDisplay } from '../../redux/country/country.selectors';

import './country.styles.scss';

export const Country = ({ country, fieldsToDisplay }) => {
    // const { name, region, capital, population, languages, currencies, timezones } = country;
    // console.log(country.name)
    const keyObject = Object.keys(country).map(key => { return key; }) //Get all Keys from API
    const { name } = country;
    return (
        <div className="container">
            <h2>Country Details - {name} </h2>
            <ul className="responsive-table">
                <li className="table-header">
                    <div className="col col-1">Title</div>
                    <div className="col col-2">Value</div>
                </li>
                {
                    fieldsToDisplay.map((fields, index) => {
                        if (keyObject.includes(fields)) {
                            if (typeof country[fields] === "object") {
                                return (
                                    <li key={index} className="table-row">
                                        <div className="col col-1" data-label="Title">{fields}</div>
                                        <div className="col col-2" data-label="Value">
                                            <Array array={country[fields]} />
                                        </div>
                                    </li>
                                )
                            } else {
                                return (
                                    <li key={index} className="table-row">
                                        <div className="col col-1" data-label="Title">{fields}</div>
                                        <div className="col col-2" data-label="Value">{country[fields]}</div>
                                    </li>
                                )
                            }
                        } else {
                            return null;
                        }
                    })
                }
            </ul>
        </div >
    )
}

const mapStateToProps = createStructuredSelector({
    fieldsToDisplay: selectFieldsToDisplay
});

export default connect(mapStateToProps)(Country);