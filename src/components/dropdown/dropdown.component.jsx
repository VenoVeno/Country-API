import React from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import './dropdown.styles.scss';

import DropDownOption from '../dropdown-option/dropdown-option.component';

import { selectRegion } from '../../redux/country/country.selectors';

const DropDown = ({ value, onChange, name, regions }) => {
    return (
        <div className="dropdown-container">
            <select className={name} value={value} onChange={onChange}>
                <DropDownOption value="none">Show All Regions</DropDownOption>
                {
                    regions ?
                        regions.map((region, id) => {
                            return (
                                region ?
                                    <DropDownOption key={id} value={region}>{region}</DropDownOption>
                                    : (null)
                            )
                        })
                        : (null)
                }
            </select>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    regions: selectRegion
});

export default connect(mapStateToProps)(DropDown);