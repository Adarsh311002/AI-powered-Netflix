import { createSlice } from "@reduxjs/toolkit";

const langStore = createSlice({
    name : "langStore",
    initialState : {
        lang : "en"
    },
    reducers : {
        changeLanguage : (state,action) => {
            state.lang = action.payload;
        }
    }
})

export const {changeLanguage} = langStore.actions;

export default langStore.reducer;