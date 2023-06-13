import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./ProjectSlice"

export default configureStore({
    reducer: {
        project: projectReducer
    },
});
