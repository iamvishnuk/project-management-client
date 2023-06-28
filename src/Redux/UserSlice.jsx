import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        userId: "",
        userName:""
    },
    reducers: {
        changeUserDetails: (state, action) => {
            state.userId = action.payload.userId;
            state.userName = action.payload.userName
        },
    },
});

export const { changeUserDetails } = UserSlice.actions;
export default UserSlice.reducer;
