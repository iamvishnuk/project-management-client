import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        userId: "",
    },
    reducers: {
        changeUserDetails: (state, action) => {
            state.userId = action.payload.userId;
        },
    },
});

export const { changeUserDetails } = UserSlice.actions;
export default UserSlice.reducer;
