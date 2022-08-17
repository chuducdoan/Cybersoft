import { applyMiddleware, combineReducers, createStore } from "redux";
import ToDoListReducer from './reducers/ToDoListReducer';
import reduxThunk from 'redux-thunk';
import { rootSaga } from "./sagas/rootSaga";
import createMiddleWareSage from 'redux-saga';
import LoadingReducer from './reducers/LoadingReducer';
import ModalReducer from './reducers/ModalReducer';

const middleWareSaga = createMiddleWareSage();

const rootReducer = combineReducers({
    ToDoListReducer,
    LoadingReducer,
    ModalReducer
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga));
// goi saga
middleWareSaga.run(rootSaga);

export default store;