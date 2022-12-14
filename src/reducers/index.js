import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import dataReducer from './data-reducer';

export const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    data: dataReducer,
  });
