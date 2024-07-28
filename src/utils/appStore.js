import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import moviesReducer from './movieSlice'
import gptReducer from './GPTSlice'

export const appStore = configureStore({
    reducer: {
        user: userReducer,
        movies: moviesReducer,
        gpt : gptReducer,
    },
})