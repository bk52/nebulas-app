import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from "redux-saga";

import apiSaga from "./saga/watcher";
import app from './reducers/app';
import toast from './reducers/toast';
import galaxies from './reducers/galaxies';
import glxSelect from './reducers/galaxySelected';
import glxSettings from './reducers/galaxySettings';
import detailedPage from './reducers/detailedPage';
import user from './reducers/user';

const initialiseSagaMiddleware = createSagaMiddleware();
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
var cr = combineReducers({
    app,
    user,
    toast,
    galaxies,
    glxSelect,
    glxSettings,
    detailedPage
});
const store = createStore(cr, storeEnhancers(applyMiddleware(initialiseSagaMiddleware)));
initialiseSagaMiddleware.run(apiSaga);
export default store;