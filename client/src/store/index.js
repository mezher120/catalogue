import {legacy_createStore as createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducer';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store;