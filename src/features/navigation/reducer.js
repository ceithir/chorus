import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "navigation",
  initialState: {
    section: "intro",
    subsection: 0,
    instantText: false,
  },
  reducers: {
    setSection: (state, action) => {
      state.section = action.payload;
      state.subsection = 0;
    },
    nextSubSection: (state) => {
      state.subsection++;
    },
    toggleInstantText: (state) => {
      state.instantText = !state.instantText;
    },
  },
});

export const { setSection, nextSubSection, toggleInstantText } = slice.actions;
export const selectSection = (state) => state.navigation.section;
export const selectSubSection = (state) => state.navigation.subsection;
export const selectInstantText = (state) => state.navigation.instantText;

export default slice.reducer;
