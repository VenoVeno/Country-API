import { takeLatest, call, all, put } from 'redux-saga/effects'
import { CountryActionTypes } from './country.types';

import { fetchCountrySuccess, fetchCountryFailure, updateCountryNameArray, fetchRegionSuccess, fetchRegionFailure, updateCountrySuccess, updateCountryFailure, fetchCountryStart } from './country.actions';

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

//Fetch Country Region API
export function* fetchCountriesRegionAsync() {
    try {
        const data = yield fetch("https://restcountries.eu/rest/v2/all?fields=region");
        const regionJSONData = yield data.json();
        yield put(fetchRegionSuccess(regionJSONData));
    } catch (error) {
        yield put(fetchRegionFailure(error));
    }
}

export function* onFetchStart() {
    yield takeLatest(CountryActionTypes.FETCH_COUNTRY_START, fetchCountriesAsync)
    yield takeLatest(CountryActionTypes.FETCH_COUNTRY_START, fetchCountriesRegionAsync)
}

//Fetch After Updation on Dropdown
export function* fetchCountriesAfterRegionUpdate({ payload }) {
    if (payload === "none") {
        yield put(fetchCountryStart());
        return;
    }
    try {
        const data = yield fetch(`https://restcountries.eu/rest/v2/region/${payload}`);
        const dataJSON = yield data.json();
        yield put(updateCountrySuccess(dataJSON));
    } catch (error) {
        yield put(updateCountryFailure(error));
    }
}

export function* onUpdate() {
    yield takeLatest(
        CountryActionTypes.UPDATE_COUNTRY_START, fetchCountriesAfterRegionUpdate)
}

//Update Country Name Array for suggestion
export function* updateCountryName() {
    yield put(updateCountryNameArray());
}

export function* onCountryModifySuccess() {
    yield takeLatest([
        CountryActionTypes.FETCH_COUNTRY_SUCCESS,
        CountryActionTypes.UPDATE_COUNTRY_SUCCESS],
        updateCountryName)
}

export default function* countrySagas() {
    yield all([
        call(onFetchStart),
        call(onUpdate),
        call(onCountryModifySuccess)
    ])
}