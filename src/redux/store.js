import { configureStore } from '@reduxjs/toolkit';
import { combineReducers} from 'redux';
import authReducer from './reducers/authReducer';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk)
});

export default store;