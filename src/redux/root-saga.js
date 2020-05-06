import { all, call } from 'redux-saga/effects';

import countrySagas from './country/country.sagas';

export default function* rootSaga() {
    yield all([
        call(countrySagas)
    ])
}