import { createSlice } from "@reduxjs/toolkit";
import { DEJANIRE, MAHARAL, RASHOMON } from "../../characters";

const slice = createSlice({
  name: "party",
  initialState: {
    forest: [DEJANIRE],
    library: [MAHARAL],
    city: [RASHOMON],
  },
  reducers: {
    addToParty: (state, action) => {
      const { character, location } = action.payload;
      state[location].push(character);
    },
  },
});

export const { addToParty } = slice.actions;
export const selectParty = (location) => (state) => state.party[location];

export default slice.reducer;
