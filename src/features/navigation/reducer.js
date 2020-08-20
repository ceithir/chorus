import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chapter: null,
  section: null,
  subsection: 0,
  instantText: false,
};

const slice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setSection: (state, action) => {
      state.section = action.payload;
      state.subsection = initialState.subsection;
    },
    nextSubSection: (state) => {
      state.subsection++;
    },
    toggleInstantText: (state) => {
      state.instantText = !state.instantText;
    },
    setChapter: (state, action) => {
      state.chapter = action.payload;
      state.section = initialState.section;
      state.subsection = initialState.subsection;
    },
  },
});

export const {
  setSection,
  nextSubSection,
  toggleInstantText,
  setChapter,
} = slice.actions;
export const selectSection = (state) => state.navigation.section;
export const selectSubSection = (state) => state.navigation.subsection;
export const selectInstantText = (state) => state.navigation.instantText;
export const selectChapter = (state) => state.navigation.chapter;

export default slice.reducer;
