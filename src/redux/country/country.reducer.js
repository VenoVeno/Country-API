import { CountryActionTypes } from './country.types';

const INITIAL_STATE = {
    countries: [],
    region: [],
    isFetching: false,
    fetchErrorMessage: undefined,
    countryArray: []
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
                region: action.payload,
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
                countryArray: action.payload
            }
        default:
            return state;
    }
}

export default countryReducer;