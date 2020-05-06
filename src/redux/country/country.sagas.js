import { takeLatest, call, all, put } from 'redux-saga/effects'
import { CountryActionTypes } from './country.types';

import { fetchCountrySuccess, fetchCountryFailure, updateCountryNameArray, fetchRegionSuccess, fetchRegionFailure, updateCountrySuccess, updateCountryFailure } from './country.actions';

import { select } from 'redux-saga/effects';
import { selectCountry } from './country.selectors'

// Fetch Country API
export function* fetchCountriesAsync() {
    try {
        const data = yield fetch("https://restcountries.eu/rest/v2/all");
        const dataJSON = yield data.json();
        yield put(fetchCountrySuccess(dataJSON));
    } catch (error) {
        yield put(fetchCountryFailure(error));
    }
}

//Fetch After Update
export function* fetchCountriesAfterRegionUpdate({ payload }) {
    console.log("Hey", payload)
    try {
        const data = yield fetch(`https://restcountries.eu/rest/v2/region/${payload}`);
        const dataJSON = yield data.json();
        yield put(updateCountrySuccess(dataJSON));
        console.log(dataJSON);
    } catch (error) {
        yield put(updateCountryFailure(error));
    }
}

export function* onFetchStart() {
    yield takeLatest(CountryActionTypes.FETCH_COUNTRY_START, fetchCountriesAsync)
    yield takeLatest(CountryActionTypes.FETCH_COUNTRY_START, fetchCountriesRegionAsync)
}

export function* onUpdate() {
    yield takeLatest(
        CountryActionTypes.UPDATE_COUNTRY_START, fetchCountriesAfterRegionUpdate)
}

//Fetch Country Region API
export function* fetchCountriesRegionAsync() {
    try {
        const data = yield fetch("https://restcountries.eu/rest/v2/all?fields=region");
        const dataJSON = yield data.json();

        const filteredRegion = yield Array.from(new Set(dataJSON.map(newObj => newObj.region)))
            .map(region => {
                return region
            })
        filteredRegion.reverse();
        yield put(fetchRegionSuccess(filteredRegion.filter(Boolean)));
    } catch (error) {
        yield put(fetchRegionFailure(error));
    }
}

//Update Country Name Array for suggestion
export function* updateCountryName() {
    const countries = yield select(selectCountry);
    const countryArray = countries.map(newObj => {
        return newObj.name
    });
    yield put(updateCountryNameArray(countryArray));
}

export function* onFetchCountrySuccess() {
    yield takeLatest(CountryActionTypes.FETCH_COUNTRY_SUCCESS, updateCountryName)
    yield takeLatest(CountryActionTypes.UPDATE_COUNTRY_SUCCESS, updateCountryName)
}

export default function* countrySagas() {
    yield all([
        call(onFetchStart),
        call(onFetchCountrySuccess),
        call(onUpdate)
    ])
}