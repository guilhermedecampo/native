import {createStore, applyMiddleware, compose} from 'redux'
import {persistStore} from 'redux-persist'
import createSagaMiddleware, {END} from 'redux-saga'

import reducer from './modules/reducer'
import saga from './modules/saga'

export default function create() {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [sagaMiddleware]
  const finalCreateStore = compose(applyMiddleware(...middleware))(createStore)
  const store = finalCreateStore(reducer)
  store.persistor = persistStore(store)
  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  store.runSaga(saga)
  return store
}
