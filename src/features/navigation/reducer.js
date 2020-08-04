import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "navigation",
  initialState: {
    section: "intro",
    subsection: 0,
  },
  reducers: {
    setSection: (state, action) => {
      state.section = action.payload;
      state.subsection = 0;
    },
    nextSubSection: (state) => {
      state.subsection++;
    },
  },
});

export const { setSection, nextSubSection } = slice.actions;
export const selectSection = (state) => state.navigation.section;
export const selectSubSection = (state) => state.navigation.subsection;

export default slice.reducer;
