import { createSelector } from 'reselect';

const selectCountryData = (state) => state.country;

export const selectCountry = createSelector(
    [selectCountryData],
    (countryData) => countryData.countries
)

export const selectRegion = createSelector(
    [selectCountryData],
    (regionData) => regionData.region
)

export const selectCountryArray = createSelector(
    [selectCountryData],
    (countryData) => countryData.countryArray
)