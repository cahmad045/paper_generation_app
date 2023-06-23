// AdminSlice.js
import { createSlice } from '@reduxjs/toolkit';

const AdminSlice = createSlice({
  name: 'admin',
  initialState: {
    classLevelId: "",
    classLevelName: "",
    subjectId: "",
    subjectName: "",
    chapterId: "",
    chapterName: ""
  },
  reducers: {
    setclassLevelId: (state, action) => {
      state.classLevelId = action.payload;
      // console.log({payload: action.payload})
    },
    setclassLevelName: (state, action) => {
      state.classLevelName = action.payload;
      console.log({ payload: action.payload })
    },
    setsubjectId: (state, action) => {
      state.subjectId = action.payload;
      console.log({ payload: action.payload })

    },
    setsubjectName: (state, action) => {
      state.subjectName = action.payload;
      console.log({ payload: action.payload })

    },
    setchapterId: (state, action) => {
      state.chapterId = action.payload;
      console.log({ payload: action.payload })
    },
    setchapterName: (state, action) => {
      state.chapterName = action.payload;
      console.log({ payload: action.payload })
    },
  }
});

export const {
  setclassLevelId,
  setclassLevelName,
  
  setchapterId,
  setchapterName,

  setsubjectId,
  setsubjectName,

} = AdminSlice.actions;
export const selectAdmin = (state) => state.admin

export default AdminSlice.reducer;
