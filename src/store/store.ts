import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export type AppStore = typeof store;


export const store = configureStore({
    reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;