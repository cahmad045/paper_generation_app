import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  amount: 10,
}

export const amountSlice = createSlice({
  name: 'amount',
  initialState,
  reducers: {
    increment: (state, action) => {
      console.log("amount increment state===> ", state.amount, "amount icreament action====> ", action)
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.amount += 1
    },
    decrement: (state) => {
      console.log("amount decrement state===> ", state.amount)
      state.amount -= 1
    },
    incrementByAmount: (state, action) => {
      console.log("amount incrementByAmount state===> ", state.amount, "amount incrementByAmount action====> ", action)
      state.amount += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = amountSlice.actions


// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}

// The function below is called a selector and allows us to select a amount from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.amount)`
export const selectAmount = (state) => state.amount.amount


export default amountSlice.reducer