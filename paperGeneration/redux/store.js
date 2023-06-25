import { configureStore } from '@reduxjs/toolkit';
import amountSlice from './amountSlice';
import counterSlice from './counterSlice';
import userSlice from './userSlice';
import PaperSlice from './PaperSlice';
import PreviousPaperSlice from './PreviousPaperSlice';
import AdminSlice from './AdminSlice';
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// import counterReducer from "./counterSlice"
//REDUX PERSIST START
// configureStore.js

// const userPersistConfig = {
//   key: 'user',
//   storage,
// }
// const paperPersistConfig = {
//   key: 'paper2',
//   storage,
// }
// const prevPaperPersistConfig = {
//   key: 'prev',
//   storage,
// }
// const adminPersistConfig = {
//   key: 'admin',
//   storage,
// }
// const persistedAdmin = persistReducer(adminPersistConfig, AdminSlice)
// const persistedUser = persistReducer(userPersistConfig, userSlice)
// const persistedPaper = persistReducer(paperPersistConfig, PaperSlice)
// const persistedPreviousPaperSlice = persistReducer(prevPaperPersistConfig, PreviousPaperSlice)

//REDUX PERSIST END

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    amount: amountSlice,
    user: userSlice, //persisted User instead of userSlice
    admin: AdminSlice, //persisted User instead of userSlice
    paper: PaperSlice,
    previousPaper: PreviousPaperSlice
  },
})
// export const store = configureStore({
//   reducer: {
//     counter: counterSlice,
//     amount: amountSlice,
//     user: persistedUser, //persisted User instead of userSlice
//     admin: persistedAdmin, //persisted User instead of userSlice
//     paper: persistedPaper,
//     previousPaper: persistedPreviousPaperSlice
//   },
// })
// export const persistor = persistStore(store);

