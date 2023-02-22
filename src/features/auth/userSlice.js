import { createSlice } from "@reduxjs/toolkit";
import { addToLocal, clearLocal, getUser } from "./localstorage";




const initialValue = {
  user: getUser()
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialValue,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      addToLocal(action.payload)
    },
    clearUser: (state, action) => {
      state.user = null;
      clearLocal();
    }
  }
});

export const { addUser, clearUser } = userSlice.actions;
export default userSlice.reducer;