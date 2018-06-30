import {call, put, all, select, takeLatest} from 'redux-saga/effects'

import ResponseError from '@/lib/api/ResponseError'
import {reportError} from '@/redux/modules/fabric'
import {getToken} from '../../auth/selectors'
import * as api from '@/lib/services/listings'
import * as actions from './index'

function* request({id}) {
  yield put(actions.request(id))
  try {
    const jwt = select(getToken)
    const response = yield call(api.related, id, {jwt})
    yield put(actions.success(id, response.listings))
  } catch (err) {
    yield put(actions.failure(id, err))
    if (!(err instanceof ResponseError)) yield put(reportError(err))
  }
}

export default function* listingsDataSaga() {
  yield all([takeLatest(actions.LOAD, request)])
}