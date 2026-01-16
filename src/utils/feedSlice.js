import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,   // null = loading, [] = loaded but empty
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },

    removeUserFromFeed: (state, action) => {
      // ✅ SAFETY CHECK TO PREVENT CRASH
      if (!Array.isArray(state)) return state;
      return state.filter((user) => user._id !== action.payload);
    },
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
