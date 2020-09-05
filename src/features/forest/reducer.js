import { createSlice } from "@reduxjs/toolkit";
import { DIRECTIONS } from "./directions";

const slice = createSlice({
  name: "forest",
  initialState: {},
  reducers: {
    sendTo: (state, action) => {
      const { character, direction } = action.payload;
      DIRECTIONS.forEach((direction) => {
        if (state[direction] === character) {
          state[direction] = null;
        }
      });
      state[direction] = character;
    },
  },
});

export const { sendTo } = slice.actions;
export const selectForest = () => (state) => state.forest;

export default slice.reducer;
