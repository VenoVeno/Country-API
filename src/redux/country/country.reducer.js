import { CountryActionTypes } from './country.types';
import { updatedFetchedRegion, updateCountryArray, updateSearchFilterArray } from './country.utils';

const INITIAL_STATE = {
    countries: [],
    region: [],
    countryArray: [],
    filteredCountry: [],
    isFetching: false,
    fetchErrorMessage: undefined,
    fieldsToDisplay: ["region", "capital", "population", "languages", "currencies", "timezones"]
}

const countryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CountryActionTypes.FETCH_COUNTRY_START:
            return {
                ...state,
                isFetching: true
            }
        case CountryActionTypes.FETCH_COUNTRY_SUCCESS:
        case CountryActionTypes.UPDATE_COUNTRY_SUCCESS:
            return {
                ...state,
                isFetching: false,
                countries: action.payload,
                fetchErrorMessage: null
            }
        case CountryActionTypes.FETCH_REGION_SUCCESS:
            return {
                ...state,
                isFetching: false,
                region: updatedFetchedRegion(action.payload),
                fetchErrorMessage: null
            }
        case CountryActionTypes.FETCH_COUNTRY_FAILURE:
        case CountryActionTypes.FETCH_REGION_FAILURE:
        case CountryActionTypes.UPDATE_COUNTRY_FAILURE:
            return {
                ...state,
                isFetching: false,
                fetchErrorMessage: action.payload
            }
        case CountryActionTypes.UPDATE_COUNTRY_ARRAY:
            return {
                ...state,
                countryArray: updateCountryArray(state.countries)
            }
        case CountryActionTypes.UPDATE_SEARCH_FILTER_COUNTRY:
            return {
                ...state,
                filteredCountry: updateSearchFilterArray(action.payload, state.countries)
            }
        default:
            return state;
    }
}

export default countryReducer;