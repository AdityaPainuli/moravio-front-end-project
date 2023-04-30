import {configureStore} from '@reduxjs/toolkit';
import gifSliceReducer from "../state/gifsState"
import  pageNumberReducer from '../state/pageNumberState';
import queryStateReducer from '../state/queryState';

export const store = configureStore({
    reducer: {
        gifsState : gifSliceReducer,
        pageNumberState : pageNumberReducer,
        queryState:queryStateReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch