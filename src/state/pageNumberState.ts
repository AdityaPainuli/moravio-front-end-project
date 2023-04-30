import { createSlice  } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

interface pageNumber {
    value:number,
    totalPage:number
}

const initialState:pageNumber = {
    value:0,
    totalPage:0,
};

export const pageNumberSlice = createSlice({
    name:"pageNumber",
    initialState,
    reducers: {
       incrementingPageNumber: (state,action)=> {
        state.value += 1;
       },
       decrementingPageNumber : (state,action) => {
        state.value -= 1;
       },
       setPageNumber : (state,action) => {
        state.value = action.payload
       },
       setTotalPage : (state,action) => {
        state.totalPage = action.payload
       }
    }
})

export const {incrementingPageNumber,decrementingPageNumber,setPageNumber , setTotalPage} = pageNumberSlice.actions;
export const pageNumberState = (state:RootState) => state.pageNumberState.value;
export default pageNumberSlice.reducer