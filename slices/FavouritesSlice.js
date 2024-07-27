import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favourites: [],
};

const favouritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    getFavData(state, action) {
      state.favourites.push(action.payload);
    },
    removeFav(state, action) {
      const index = state.favourites.findIndex(
        (f) => f.idMeal === action.payload.idMeal
      );
      if (index !== -1) {
        state.favourites.splice(index, 1);
      }
    },
    setFavourites(state, action) {
      state.favourites = action.payload;
    },
  },
});

export const { getFavData, removeFav, setFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;
