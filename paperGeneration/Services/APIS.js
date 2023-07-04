import { store } from "../redux/store";
import axios from "axios";
// const baseURL = 'http://localhost:4000'
// const baseURL = 'http://127.0.0.2:4000'
// const baseURL = 'http://10.0.2.2:4000'
// const baseURL = 'http://192.168.153.85:4000'
const baseURL = "http://192.168.10.8:4000";
export const APIuser = axios.create({
  baseURL: `${baseURL}/users`,
});
export const APIGeneration = axios.create({
  baseURL: `${baseURL}`,
});
export const APIAdmin = axios.create({
  baseURL: `${baseURL}/a`,
});
const addTokenToHeaders = () => {
  const { token } = store.getState().user;
  if (token) {
    APIGeneration.defaults.headers.common.Authorization = `Bearer ${token}`;
    APIAdmin.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};
addTokenToHeaders(); // Call the function once when the app loads to set the initial token
store.subscribe(addTokenToHeaders);

export const APIS = {
  login: "/login",
  signup: "/register",
  PG: {
    classes: "classes",
    subjectsOfClass: "subjects-of-class",
    chaptersOfSubject: "chapters-of-subject",
    questionsOfChapters: "questions",
    generate: "generate",
    replace: "replace",
    replace2: "replace2",
    approval: "add-question",
    approvalNew: "add-question-new",
    userInstitue: "user-institue",
    userInstituePhoto: "user-institue-photo",
  },
  Admin: {
    allUsers: "/users",
    usersCount: "users-count",
    userDetails: "user-details",
    user: "user",
    questionsOfChapter: "questions-of-chapter",
    questionsOfSubject: "questions-of-subject",
    question: "question",
    questions: "questions",
    classes: "/classes",
    subjectsOfClass: "subjects-of-class",
    chaptersOfSubject: "chapters-of-subject",
    // questionsOfChapters: "questions",
    classLevel: "class-level",
    subject: "subject",
    chapter: "chapter",
    approvalQuestions: "approval-questions",
  },
};
