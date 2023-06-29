import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./ProjectSlice";
import userReducer from "./UserSlice";
import sockeReducer from "./SocketSlice";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REGISTER,
    REHYDRATE,
    PAUSE,
    PURGE,
    PERSIST,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["socket"],
};

const persistedProjectReducer = persistReducer(persistConfig, projectReducer);
const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const Store = configureStore({
    reducer: {
        project: persistedProjectReducer,
        user: persistedUserReducer,
        socket: sockeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(Store);
