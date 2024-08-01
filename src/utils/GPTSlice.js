import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name : "gptSearch",
    initialState: {
        gptSearch : null,
        movieResults : null,
        movieNames : null
    },
    reducers : {
        goForSearch : (state) => {
            state.gptSearch = !state.gptSearch
        },
        addGptMovie : (state,action) => {
            const {movieNames , movieResults} = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;
        },
    }
})

export const {goForSearch,addGptMovie} = gptSlice.actions;

export default gptSlice.reducer;