import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chapter: null,
  section: null,
  subsection: 0,
  instantText: false,
  step: 0,
  fadingOut: false,
};

const slice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setSection: (state, action) => {
      state.section = action.payload;
      state.subsection = initialState.subsection;
      state.step = initialState.step;
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
      state.step = initialState.step;
    },
    nextStep: (state) => {
      state.step++;
      state.subsection = initialState.subsection;
    },
    setFadingOut: (state, action) => {
      state.fadingOut = action.payload;
    },
  },
});

export const {
  setSection,
  nextSubSection,
  toggleInstantText,
  setChapter,
  nextStep,
  setFadingOut,
} = slice.actions;
export const selectSection = (state) => state.navigation.section;
export const selectSubSection = (state) => state.navigation.subsection;
export const selectInstantText = (state) => state.navigation.instantText;
export const selectChapter = (state) => state.navigation.chapter;
export const selectStep = (state) => state.navigation.step;
export const selectFadingOut = (state) => state.navigation.fadingOut;

export default slice.reducer;
