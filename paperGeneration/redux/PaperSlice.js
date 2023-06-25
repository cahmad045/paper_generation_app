// PaperSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { paper2 } from "../App";
import { Admin2 } from "../App";
const sqObj = {
  section: 0,
  type: "",
  total: 0,
  attempt: 0,
  marks: 0,
  chapters: [],
};

const PaperSlice = createSlice({
  name: "paper",
  initialState: {
    aiQuestions: [],
    institue: {},
    classLevelId: "",
    classLevelName: "",
    subjectId: "",
    subjectName: "",
    fullBook: false,
    totalChapters: [],
    totalChaptersNames: [],
    totalCh: [],
    paperData: "",
    isShort: false,
    isLong: false,
    shortQuestions: [
      {
        section: 0,
        type: "short",
        total: 0,
        attempt: 0,
        marks: 0,
        chapters: [],
      },
    ],
    longQuestions: [
      {
        section: 0,
        type: "long",
        totalQuestions: 0,
        attempt: 0,
        totalMarks: 0,
        marks: 0,
        marksDistribution: [],
        chapters: [],
      },
    ],
  },
  // initialState: {
  //   classLevelId: '',
  //   subjectId: '',
  //   fullBook: false,
  //   // paper:'',
  //   // chapter: '',
  //   // checkboxes: [],
  //   totalChapters: [],
  //   questionType: [],
  //   numQuestions: 0,
  //   marksPerQuestion: 0,
  //   paperData: null,
  // },
  reducers: {
    setIsShort: (state, action) => {
      state.isShort = action.payload
    },
    setIsLong: (state, action) => {
      state.isLong = action.payload
    },
    setInstitue: (state, action) => {
      state.institute = { ...state.institue, ...action.payload }
    },
    setaiQuestions: (state, action) => {
      state.aiQuestions = action.payload;
      console.log({ payload: action.payload });
    },
    setclassLevelId: (state, action) => {
      state.classLevelId = action.payload;
    },
    setclassLevelName: (state, action) => {
      state.classLevelName = action.payload;
    },
    setsubjectId: (state, action) => {
      state.subjectId = action.payload;
    },
    setsubjectName: (state, action) => {
      state.subjectName = action.payload;
    },
    setfullBook: (state, action) => {
      state.fullBook = action.payload;
    },
    settotalChapters: (state, action) => {
      state.totalChapters = action.payload;
    },
    setChaptersNames: (state, action) => {
      state.totalChaptersNames = action.payload;
    },
    settotalCh: (state, action) => {
      state.totalCh = action?.payload;
    },
    setShortEmpty: (state, action) => {
      state.shortQuestions.map((v, i) => {
        v.chapters.length = 0
      })
    },
    setLongEmpty: (state, action) => {
      state.longQuestions.map((v, i) => {
        v.chapters.length = 0
      })
    },
    setAddChapterShort: (state, action) => {
      let ch = state.shortQuestions[action?.payload?.index]?.chapters;
      ch?.push(action?.payload?.chapterId);
      console.log(ch);
      // state.shortQuestions[action?.payload?.index]?.chapters =  ch
    },
    setAddChapterLong: (state, action) => {
      let ch = state.longQuestions[action?.payload?.index]?.chapters;
      ch?.push(action?.payload?.chapterId);
      console.log(ch);
      // state.shortQuestions[action?.payload?.index]?.chapters =  ch
    },
    setRemoveChapterShort: (state, action) => {
      state.shortQuestions[action?.payload?.index].chapters =
        state.shortQuestions[action?.payload?.index]?.chapters?.filter(
          (ch) => ch != action?.payload?.chapterId
        );
    },
    setRemoveChapterLong: (state, action) => {
      state.longQuestions[action?.payload?.index].chapters =
        state.longQuestions[action?.payload?.index]?.chapters?.filter(
          (ch) => ch != action?.payload?.chapterId
        );
    },
    setshortQuestions: (state, action) => {
      // state.shortQuestions[action?.payload] = {...state.shortQuestions[action?.payload], ...action?.payload || sqObj}
      state.shortQuestions = action.payload;
    },
    setshortQuestions2: (state, action) => {
      state.shortQuestions[action?.payload?.index] = {
        ...state.shortQuestions[action?.payload?.index],
        ...(action?.payload || sqObj),
      };
      // state.shortQuestions = action.payload
    },
    addSectionSQ: (state, action) => {
      state.shortQuestions.push({
        section: state?.shortQuestions?.length,
        type: "short",
        total: 0,
        attempt: 0,
        marks: 0,
        chapters: [],
      });
    },
    setTotalShort: (state, action) => {
      state.shortQuestions[action?.payload?.index].total =
        action?.payload?.value;
    },
    setTotalLong: (state, action) => {
      state.longQuestions[action?.payload?.index].totalQuestions =
        action?.payload?.value;
    },
    setMarksShort: (state, action) => {
      state.shortQuestions[action?.payload?.index].marks =
        action?.payload?.value;
    },
    setMarksLong: (state, action) => {
      state.longQuestions[action?.payload?.index].marks =
        action?.payload?.value;
    },
    setChoiceShort: (state, action) => {
      state.shortQuestions[action?.payload?.index].attempt =
        action?.payload?.value;
    },
    setChoiceLong: (state, action) => {
      state.longQuestions[action?.payload?.index].attempt =
        action?.payload?.value;
    },
    setChaptersShort: (state, action) => {
      state.shortQuestions[action?.payload?.index].chapters =
        action?.payload?.value;
    },
    setChaptersLong: (state, action) => {
      state.longQuestions[action?.payload?.index].chapters =
        action?.payload?.value;
    },
    removeSectionShort: (state, action) => {
      state.shortQuestions.splice(action?.payload?.index, 1);
    },
    setlongQuestions: (state, action) => {
      // state.longQuestions = action.payload;
      state.longQuestions[action?.payload] = {
        ...state.longQuestions[action?.payload],
        ...action?.payload,
      };
    },
    // LONG QUESTIONS
    addSectionLQ: (state, action) => {
      state.longQuestions.push({
        section: state?.longQuestions?.length,
        type: "long",
        totalQuestions: 0,
        attempt: 0,
        totalMarks: 0,
        marksDistribution: [],
        chapters: [],
      });
    },
    removeSectionLong: (state, action) => {
      state.longQuestions.splice(action?.payload?.index, 1);
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
  setaiQuestions,
  setclassLevelId,
  setsubjectId,
  setfullBook,
  settotalChapters,
  setChaptersNames,
  settotalCh,
  setshortQuestions,
  addSectionSQ,
  setshortQuestions2,
  setTotalShort,
  setMarksShort,
  setChoiceShort,
  setChaptersShort,
  setChaptersLong,
  removeSectionShort,
  setAddChapterShort,
  setRemoveChapterShort,
  setlongQuestions,
  setclassLevelName,
  setsubjectName,
  // Long Questions
  removeSectionLong,
  addSectionLQ,
  setTotalLong,
  setMarksLong,
  setChoiceLong,
  setAddChapterLong,
  setRemoveChapterLong,
  setShortEmpty,
  setLongEmpty,

  setIsShort,
  setIsLong,
  setInstitue,
  // setPaperType,
  // settotalChapters,
  // setQuestionType,
  // setNumQuestions,
  // setMarksPerQuestion,
  // generatePaper,
} = PaperSlice.actions;
export const selectPaper = (state) => state.paper;

export const onChangeMarksShort = (index, value) => { };
export const onChangeChoiceShort = (index, value) => { };
export const onChangeTotalLong = (index, value) => { };
export const onChangeMarksLong = (index, value) => { };
export const onChangeChoiceLong = (index, value) => { };

export default PaperSlice.reducer;
