import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./ProjectSlice"
import userReducer from "./UserSlice"

export default configureStore({
    reducer: {
        project: projectReducer,
        user: userReducer
    },
});
