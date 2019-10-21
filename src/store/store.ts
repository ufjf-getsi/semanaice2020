import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import { fetchLocationsMiddleware } from './locations/middleware';
import { fetchSessionsMiddleware } from './sessions/middleware';
import { fetchSpeakersMiddleware } from './speakers/middleware';

import rootReducer from './root-reducer';
import { loadState } from '../api';


const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares: Middleware[] = [
  fetchLocationsMiddleware,
  fetchSessionsMiddleware,
  fetchSpeakersMiddleware
];

function configureStore(initialState?: {}) {
  console.log(initialState);
  
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
}

// pass an optional param to rehydrate state on app start
const store = configureStore(loadState());

// export store singleton instance
export default store;
