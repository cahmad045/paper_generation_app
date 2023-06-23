// PaperSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { paper2 } from '../App';

const PreviousPaperSlice = createSlice({
  name: 'previousPaper',
  initialState: {
    classLevelId: "",
    subjectId: "",
    fullBook: false,
    chapterIds: [],
    prevQuestions: [],
    replacedQuestions: []
  },
  reducers: {
    setUsingChapters: (state, action) => {
      state.totalChapters = action.payload;
    },
    setUsedQuestions: (state, action) => {
      state.prevQuestions = action.payload;
    },
    // setSection: (state, action) => {
    //   state.section = action.payload;
    // },
    // setSection: (state, action) => {
    //   state.section = action.payload;
    // },
    // settotalMarks: (state, action) => {
    //   state.section = action.payload;
    // },
    // toggleCheckbox: (state, action) => {
    //   const checkboxValue = action.payload;
    //   const index = state.checkboxes.indexOf(checkboxValue);

    //   if (index === -1) {
    //     state.checkboxes.push(checkboxValue);
    //   } else {
    //     state.checkboxes.splice(index, 1);
    //   }
    // },
    // setCheckboxes: (state, action) => {
    //   state.checkboxes = action.payload;
    // },

    // setQuestionType: (state, action) => {
    //   state.questionType = action.payload;
    // },
    // setNumQuestions: (state, action) => {
    //   state.numQuestions = action.payload;
    // },
    // setMarksPerQuestion: (state, action) => {
    //   state.marksPerQuestion = action.payload;
    // },
    generatePaper: (state, action) => {
      // Generate Paper data based on the state
      state.paperData = {
        classLevelId: state.classLevelId,
        subjectId: state.subjectId,
        fullBook: state.fullBook,
        totalChapters: state.totalChapters,
        shortQuestions: state.shortQuestions,
        longQuestions: state.longQuestions,
        // chapter: state.chapter,
        // questionType: state.questionType,
        // numQuestions: state.numQuestions,
        // marksPerQuestion: state.marksPerQuestion,
      };
    },
  },
});

export const {
  setclassLevelId,
  setsubjectId,
  setfullBook,
  settotalChapters,
  setChaptersNames,
  setshortQuestions,
  addSectionSQ,
  setshortQuestions2,
  setTotalShort,
  setMarksShort,
  setChoiceShort,
  removeSectionShort,

  setlongQuestions,
  // setPaperType,
  // settotalChapters,
  // setQuestionType,
  // setNumQuestions,
  // setMarksPerQuestion,
  // generatePaper,
} = PreviousPaperSlice.actions;
export const selectPreviousPaper = (state) => state.paper

export const onAddUsedQuestions = (index, value) => { }
export const onAddUsingChapters = (index, value) => { }

export default PreviousPaperSlice.reducer;
