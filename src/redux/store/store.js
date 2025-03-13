import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/auth';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;