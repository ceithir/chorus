import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "navigation",
  initialState: {
    section: "intro",
  },
  reducers: {
    setSection: (state, action) => {
      state.section = action.payload;
    },
  },
});

export const { setSection } = slice.actions;
export const selectSection = (state) => state.navigation.section;

export default slice.reducer;
