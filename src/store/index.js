import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';

import reducers from '../reducers';

const persistsConfig = {
    key                         : 'root',
    storage                     : AsyncStorage,
    whiltelist                  : ['auth', 'logout', 'profile']
};

const persistedReducer          = persistReducer(persistsConfig, reducers);

export const store              = createStore(persistedReducer, {}, applyMiddleware(thunk));
// const store                     = Reactotron.createStore(rootReducer, compose(middleware));
export const persistedStore     = persistStore(store);
