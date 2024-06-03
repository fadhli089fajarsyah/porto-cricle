import { createSlice } from "@reduxjs/toolkit";
import { IThread } from "../../types/app";
import { getThreadAsync } from "../async/thread";

interface IInitialState {
    threads: IThread[];
}

const initialState: IInitialState = {
    threads: [],
};

const threadSlice = createSlice({
    name: "thread",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getThreadAsync.fulfilled, (state, action) => {
            state.threads = action.payload;
        });
    },
});

export default threadSlice.reducer;