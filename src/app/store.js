import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "../features/navigation/reducer";

export default configureStore({
  reducer: {
    navigation: navigationReducer,
  },
});
