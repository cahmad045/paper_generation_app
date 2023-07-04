
// import jwt_decode from "jwt-decode";
import { APIGeneration, APIS } from "./APIS";
import GenericServices from "./GenericServices";
const axios = require('axios');


const links = APIS?.PG

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://localhost:3000/classes',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2U2NjczM2ZhOTlkNTFjYTg4Y2UwYzMiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwidHlwZSI6dHJ1ZSwiaWF0IjoxNjgzOTkzNzY4LCJleHAiOjE2ODY1ODU3Njh9.fRWhxlXai17uNg6UD8pg7nfzFos__tCzONzYIKC_jJs'
  }
};

// axios.request(config)
// .then((response) => {
//   console.log(JSON.stringify(response.data));
// })
// .catch((error) => {
//   console.log(error);
// });


class PaperGenerationServices extends GenericServices {
  constructor(baseAPI) {
    super(baseAPI);
  }
  getProfile = (userId) => {
    return new Promise((resolve, reject) => {
      this.get(links.userInstitue)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  updateIntitueName = (name) => {
    let formData = new FormData();
    formData.append("name", name);
    return new Promise((resolve, reject) => {
      this.post(`${links.userInstitue}`, {name})
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  updateIntituePhoto = (file) => {
    let formData = new FormData();
    formData.append("file", file.split("//").pop());
    return new Promise((resolve, reject) => {
      this.post_file(`${links.userInstituePhoto}`, formData)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  getClasses = () => {
    return new Promise((resolve, reject) => {
      this.get(links.classes)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  getSubjects = (classLevelId) => {
    return new Promise((resolve, reject) => {
      this.get(`${links.subjectsOfClass}?classLevelId=${classLevelId}`)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  getChapters = (classLevelId, subjectId) => {
    return new Promise((resolve, reject) => {
      this.get(`${links.chaptersOfSubject}?classLevelId=${classLevelId}&subjectId=${subjectId}`)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  generatePaper = (paperCriteria) => {
    return new Promise((resolve, reject) => {
      this.post(links.generate, { ...paperCriteria, institute: null })
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  replaceQuestion = (classLevelId, subjectId, chapterIds, prevQuestions) => {
    let formData = new FormData();
    formData.append("classLevelId", classLevelId);
    formData.append("subjectId", subjectId);
    formData.append("chapterIds", JSON.stringify(chapterIds));
    formData.append("prevQuestions", JSON.stringify(prevQuestions));

    //here form data is not used because it was creating network error.
    return new Promise((resolve, reject) => {
      this.post(links.replace, { classLevelId, subjectId, chapterIds, prevQuestions })
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  approveQuestion = (classLevelId, classLevelName, subjectId, chapterId, questionStatement, questionType, originalQuestionId) => {
    let formData = new FormData();
    formData.append("classLevelId", classLevelId);
    formData.append("classLevelName", classLevelName);
    formData.append("subjectId", subjectId);
    formData.append("chapterId", chapterId);
    formData.append("questionStatement", questionStatement);
    formData.append("questionType", questionType);

    let body = {
      classLevelId,
      classLevelName,
      subjectId,
      chapterId,
      questionStatement,
      questionType,
    }
    if (originalQuestionId) {
      formData.append("questionId", originalQuestionId);
      body.questionId = originalQuestionId
    }

    return new Promise((resolve, reject) => {
      this.post(links.approvalNew, body)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  approveQuestionOld = (classLevelId, subjectId, subjectName, chapterNo, chapterName, questionStatement, questionType) => {
    let formData = new FormData();
    formData.append("classLevelId", classLevelId);
    formData.append("subjectId", subjectId);
    formData.append("subjectName", subjectName);
    formData.append("chapterNo", chapterNo);
    formData.append("chapterName", chapterName);
    formData.append("questionStatement", questionStatement);
    formData.append("questionType", questionType);

    return new Promise((resolve, reject) => {
      this.post(links.approval, formData)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

export const paperServices = new PaperGenerationServices(APIGeneration);
