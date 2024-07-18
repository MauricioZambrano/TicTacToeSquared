import { configureStore } from '@reduxjs/toolkit';
import { gameSlice } from './slices/gameSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;


export const store = configureStore({
    reducer: {
        game: gameSlice.reducer,
    },
});