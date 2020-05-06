import { CountryActionTypes } from './country.types';

//UPDATION ON CHANGE
export const updateCountryStart = (region) => ({
    type: CountryActionTypes.UPDATE_COUNTRY_START,
    payload: region
});

export const updateCountrySuccess = (country) => ({
    type: CountryActionTypes.UPDATE_COUNTRY_SUCCESS,
    payload: country
});

export const updateCountryFailure = (errorMessage) => ({
    type: CountryActionTypes.UPDATE_COUNTRY_FAILURE,
    payload: errorMessage
});

//FETCH COUNTRIES
export const fetchCountryStart = () => ({
    type: CountryActionTypes.FETCH_COUNTRY_START
});

export const fetchCountrySuccess = (country) => ({
    type: CountryActionTypes.FETCH_COUNTRY_SUCCESS,
    payload: country
});

export const fetchCountryFailure = (errorMessage) => ({
    type: CountryActionTypes.FETCH_COUNTRY_FAILURE,
    payload: errorMessage
});

// ARRAY CREATION FOR COUNTRY
export const updateCountryNameArray = (countryNameArray) => ({
    type: CountryActionTypes.UPDATE_COUNTRY_ARRAY,
    payload: countryNameArray
});

// FETCH REGIONS
export const fetchRegionSuccess = (region) => ({
    type: CountryActionTypes.FETCH_REGION_SUCCESS,
    payload: region
});

export const fetchRegionFailure = (errorMessage) => ({
    type: CountryActionTypes.FETCH_REGION_FAILURE,
    payload: errorMessage
});