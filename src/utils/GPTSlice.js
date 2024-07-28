import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name : "gptSearch",
    initialState: {
        gptSearch : null,
    },
    reducers : {
        goForSearch : (state) => {
            state.gptSearch = !state.gptSearch
        },
    }
})

export const {goForSearch} = gptSlice.actions;

export default gptSlice.reducer;