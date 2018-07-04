import {all, fork} from 'redux-saga/effects'

import analytics from './analytics/saga'
import crashlytics from './crashlytics/saga'

export default function* firebaseSaga() {
  yield all([fork(analytics), fork(crashlytics)])
}