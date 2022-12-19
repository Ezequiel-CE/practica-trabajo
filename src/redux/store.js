import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import counterReducer from './reducers/counter';
import usersReducer from './reducers/user';
import modalReducer from './reducers/modal';
import rootSaga from './sagas/saga';

const reducer = combineReducers({
  counter: counterReducer,
  users: usersReducer,
  modal: modalReducer,
});

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
