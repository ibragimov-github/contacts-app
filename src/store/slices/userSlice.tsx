import { createSlice } from "@reduxjs/toolkit";

interface Istate {
  token: string|null,
  id: string|null,
  email: string|null,
}

const initialState = {
  token: null,
  id: null,
  email: null,
} as Istate

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.token = action.payload.token
      state.id = action.payload.id
      state.email = action.payload.firstName
    },
    removeUser(state) {
      state.token = null
      state.id = null
      state.email = null
    }
  }
})


export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;