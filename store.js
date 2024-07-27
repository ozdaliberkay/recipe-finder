import { configureStore } from "@reduxjs/toolkit";
import FavouritesSlice from "./slices/FavouritesSlice";

const store = configureStore({
  reducer: {
    favorites: FavouritesSlice,
  },
});
export default store;
