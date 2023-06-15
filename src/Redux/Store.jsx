import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./ProjectSlice"
import userReducer from "./UserSlice"
import {persistReducer, persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage
}

const persistedProjectReducer = persistReducer(persistConfig, projectReducer)
const persistedUserReducer = persistReducer(persistConfig, userReducer)

export const Store =  configureStore({
    reducer: {
        project: persistedProjectReducer,
        user: persistedUserReducer
    },
});

export const persistor = persistStore(Store)