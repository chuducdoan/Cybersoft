import { applyMiddleware, combineReducers, createStore } from "redux";
import ToDoListReducer from './reducers/ToDoListReducer';
import reduxThunk from 'redux-thunk';
import { rootSaga } from "./sagas/rootSaga";
import createMiddleWareSage from 'redux-saga';
import LoadingReducer from './reducers/LoadingReducer';
import ModalReducer from './reducers/ModalReducer';
import { HistoryReducer } from './reducers/HistoryReducer';
import UserCyberBugReducer from './reducers/UserCyberBugReducer';
import ProjectCategoryReducer from './reducers/ProjectCategoryReducer';
import ProjectReducer from './reducers/ProjectReducer';
import DrawerCyberbugReducer from './reducers/DrawerCyberbugReducer';

const middleWareSaga = createMiddleWareSage();

const rootReducer = combineReducers({
    ToDoListReducer,
    LoadingReducer,
    ModalReducer,
    HistoryReducer,
    UserCyberBugReducer,
    ProjectCategoryReducer,
    ProjectReducer,
    DrawerCyberbugReducer
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga));
// goi saga
middleWareSaga.run(rootSaga);

export default store;