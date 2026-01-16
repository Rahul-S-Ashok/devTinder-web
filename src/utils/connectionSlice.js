import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: null,   // null = loading, [] = loaded but empty
  reducers: {
    addConnection: (state, action) => {
      return action.payload;
    },
    removeConnection: () => {
      return null;   // reset to loading state
    },
  },
});

export const { addConnection, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
