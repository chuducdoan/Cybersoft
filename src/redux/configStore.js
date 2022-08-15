import { applyMiddleware, combineReducers, createStore } from "redux";
import ToDoListReducer from './reducers/ToDoListReducer';
import reduxThunk from 'redux-thunk';
import { rootSaga } from "./sagas/rootSaga";
import createMiddleWareSage from 'redux-saga';

const middleWareSaga = createMiddleWareSage();

const rootReducer = combineReducers({
    ToDoListReducer
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga));
// goi saga
middleWareSaga.run(rootSaga);

export default store;