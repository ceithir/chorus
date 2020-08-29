import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "forest",
  initialState: {},
  reducers: {
    sendTo: (state, action) => {
      const { character, direction } = action.payload;
      ["north", "south", "west", "east"].forEach((direction) => {
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
