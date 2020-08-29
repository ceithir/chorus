import { createSlice } from "@reduxjs/toolkit";
import { BOOKS } from "./books";

const slice = createSlice({
  name: "library",
  initialState: {},
  reducers: {
    assignList: (state, action) => {
      const { character, books } = action.payload;
      BOOKS.forEach((book) => {
        if (state[book] === character) {
          state[book] = null;
        }
      });
      books.forEach((book) => {
        state[book] = character;
      });
    },
  },
});

export const { assignList } = slice.actions;
export const selectLibrary = () => (state) => state.library;

export default slice.reducer;
