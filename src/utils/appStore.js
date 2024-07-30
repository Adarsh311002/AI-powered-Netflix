import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import moviesReducer from './movieSlice'
import gptReducer from './GPTSlice'
import langReducer from './configSlice'


export const appStore = configureStore({
    reducer: {
        user: userReducer,
        movies: moviesReducer,
        gpt : gptReducer,
        lang : langReducer,
    },
})