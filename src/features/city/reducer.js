import { createSlice } from "@reduxjs/toolkit";
import { LOCATIONS, POOR } from "./locations";
import { TEKELI } from "../../characters";

const slice = createSlice({
  name: "city",
  initialState: {},
  reducers: {
    assign: (state, action) => {
      const { character, location } = action.payload;
      LOCATIONS.filter(
        (location) => character !== TEKELI || location !== POOR
      ).forEach((location) => {
        if (state[location] === character) {
          state[location] = null;
        }
      });
      state[location] = character;
    },
    forceAssign: (state, action) => {
      const { character, location } = action.payload;
      state[location] = character;
    },
  },
});

export const { assign, forceAssign } = slice.actions;
export const selectCity = () => (state) => state.city;

export default slice.reducer;
