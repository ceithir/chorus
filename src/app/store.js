import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "../features/navigation/reducer";
import partyReducer from "../features/party/reducer";
import forestReducer from "../features/forest/reducer";
import libraryReducer from "../features/library/reducer";

export default configureStore({
  reducer: {
    navigation: navigationReducer,
    party: partyReducer,
    forest: forestReducer,
    library: libraryReducer,
  },
});
