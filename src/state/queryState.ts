import { createSlice  } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

interface queryInterface {
    value:string
}

const initialState:queryInterface = {
  value : ""
};

export const querySlice = createSlice({
    name:"queryState",
    initialState,
    reducers: {
       setQueryState: (state,action) => {
        state.value = action.payload;
       }
    }
})

export const {setQueryState} = querySlice.actions;
export const pageNumberState = (state:RootState) => state.queryState.value;
export default querySlice.reducer