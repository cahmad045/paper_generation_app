import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  email: "",
  token: ""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log("Updated User Slice ====> ", {state:state, action:action});
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      localStorage.setItem("us", JSON.stringify({...initialState, ...action.payload}))
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { updateUser } = userSlice.actions

export const selectUser = (state) => state.user

export default userSlice.reducer