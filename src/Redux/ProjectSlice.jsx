import { createSlice } from "@reduxjs/toolkit";

export const ProjectSlice = createSlice({
    name: "projectData",
    initialState: {
        value: {},
    },
    reducers: {
        changeProjectDetails: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { changeProjectDetails } = ProjectSlice.actions;
export default ProjectSlice.reducer;
