import { createSlice  } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

interface GIfState {
    data: any[],
}

const initialState:GIfState = {
    data : []
};

export const gifSlice = createSlice({
    name:"GIFS",
    initialState,
    reducers: {
        addingData : (state,action) => {
            state.data = action.payload;
        },
        clearData : (state,action) => {
            state.data = [];
        }
    }
})

export const {addingData,clearData} = gifSlice.actions;
export const selectData = (state:RootState) => state.gifsState;
export default gifSlice.reducer