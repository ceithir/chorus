import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "../features/navigation/reducer";
import partyReducer from "../features/party/reducer";

export default configureStore({
  reducer: {
    navigation: navigationReducer,
    party: partyReducer,
  },
});
