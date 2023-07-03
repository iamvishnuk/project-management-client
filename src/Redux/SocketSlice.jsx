import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";
const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const socketSlice = createSlice({
    name: "socket",
    initialState: {
        socket: io(baseURL),
    },
});

export default socketSlice.reducer;
