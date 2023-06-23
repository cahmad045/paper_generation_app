
// import jwt_decode from "jwt-decode";
import { APIGeneration, APIS, APIAdmin } from "./APIS";
import GenericServices from "./GenericServices";

const links = APIS?.Admin

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


class AdminServices extends GenericServices {
  constructor(baseAPI) {
    super(baseAPI);
  }
  // USER START
  getAllUsers = () => {
    return new Promise((resolve, reject) => {
      this.get(links.allUsers)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  getUsersCount = () => {
    return new Promise((resolve, reject) => {
      this.get(links.usersCount)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  getUserDetails = (userId) => {
    let formData = new FormData();
    formData.append("userId", userId);

    return new Promise((resolve, reject) => {
      this.post(links.userDetails, formData)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  deleteUser = (userId) => {
    let formData = new FormData();
    formData.append("userId", userId);

    return new Promise((resolve, reject) => {
      this.delete(links.user, formData)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  // USER END
  // QUESTION START
  getQuestionsofChapter = (classLevelId, subjectId, chapterId) => {
    let formData = new FormData();
    formData.append("classLevelId", classLevelId);
    formData.append("subjectId", subjectId);
    formData.append("chapterId", chapterId);

    return new Promise((resolve, reject) => {
      this.post(links.questionsOfChapter, formData)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  getQuestionsofSubject = (classLevelId, subjectId) => {
    let formData = new FormData();
    formData.append("classLevelId", classLevelId);
    formData.append("subjectId", subjectId);

    return new Promise((resolve, reject) => {
      this.post(links.questionsOfSubject, formData)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  getAQuestion = (questionId) => {
    return new Promise((resolve, reject) => {
      this.get(`${links.question}?id=${questionId}`)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  insertAQuestion = (classLevelName, subjectId, chapterId, questionStatement, questionType) => {
    let formData = new FormData();
    formData.append("classLevelName", classLevelName);
    formData.append("subjectId", subjectId);
    formData.append("chapterId", chapterId);
    formData.append("questionStatement", questionStatement);
    formData.append("questionType", questionType);

    return new Promise((resolve, reject) => {
      this.post(links.question, formData)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  insertManyQuestion = (classLevelName, subjectId, chapterId, questions) => {
    let data = {
      classLevelName: classLevelName,
      subjectId: subjectId,
      chapterId: chapterId,
      questions: questions
    }

    return new Promise((resolve, reject) => {
      this.post(links.questions, data)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  updateAQuestion = (questionId, statement, questionType) => {
    let formData = new FormData();
    formData.append("id", questionId);
    formData.append("statement", statement);
    formData.append("type", questionType);

    return new Promise((resolve, reject) => {
      this.post(links.question, formData)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  deleteAQuestion = (questionId) => {
    let formData = new FormData();
    formData.append("questionId", questionId);

    return new Promise((resolve, reject) => {
      this.delete(`${links.question}?id=${questionId}`)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  // QUESTION END
  // CLASS START
  getClasses = () => {
    return new Promise((resolve, reject) => {
      this.get(links.classes)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  insertAClass = (classLevel) => {
    let body = {
      "classLevelData":{"level": classLevel}
  }
    return new Promise((resolve, reject) => {
      this.post(links.classLevel, body)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  updateAClass = (classLevel) => {
    let body = {
      "classLevelData":{"level": classLevel}
  }
    return new Promise((resolve, reject) => {
      this.post(links.classLevel, body)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  deleteAClass = (classLevelId,classLevelName) => {
    let formData = new FormData();
    formData.append("classLevelId", classLevelId);
    formData.append("classLevelName", classLevelName);

    return new Promise((resolve, reject) => {
      this.delete(links.classLevel, formData)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  // CLASS END
  // SUBJECT START
  insertASubject = (classLevelId, subjectName) => {
    let formData = new FormData();
    formData.append("classLevelId", classLevelId);
    formData.append("subjectName", subjectName);

    return new Promise((resolve, reject) => {
      this.post(links.subject, formData)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  updateASubject = (classLevelId, subjectName) => {
    let formData = new FormData();
    formData.append("classLevelId", classLevelId);
    formData.append("subjectName", subjectName);

    return new Promise((resolve, reject) => {
      this.put(links.subject, formData)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  deleteASubject = (subjectId) => {
    let formData = new FormData();
    formData.append("subjectId", subjectId);

    return new Promise((resolve, reject) => {
      this.delete(links.subject, formData)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  // SUBJECT END

  getSubjects = (classLevelId) => {
    return new Promise((resolve, reject) => {
      this.get(`${links.subjectsOfClass}?classLevelId=${classLevelId}`)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  // CHAPTER START
  getChapters = (classLevelId, subjectId) => {
    return new Promise((resolve, reject) => {
      this.get(`${links.chaptersOfSubject}?classLevelId=${classLevelId}&subjectId=${subjectId}`)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  insertAChapter = (classLevelName, subjectId, chapterNo, chapterName) => {
    let formData = new FormData();
    formData.append("classLevelName",classLevelName);
    formData.append("subjectId",subjectId);
    formData.append("chapterNo",chapterNo);
    formData.append("chapterName",chapterName);

    return new Promise((resolve, reject) => {
      this.post(links.chapter, formData)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  updateAChapter = (chapterId, chapterNo, chapterName) => {
    let formData = new FormData();
    formData.append("chapterId", chapterId);
    formData.append("chapterNo", chapterNo);
    formData.append("chapterName", chapterName);

    return new Promise((resolve, reject) => {
      this.put(links.chapter, formData)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  deleteAChapter = (chapterId) => {
    let formData = new FormData();
    formData.append("chapterId", chapterId);

    return new Promise((resolve, reject) => {
      this.delete(links.chapter, formData)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
   // CHAPTER END
  //  APPROVE START
  getApprovals = () => {
    return new Promise((resolve, reject) => {
      this.get(links.approvalQuestions)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  approveAQuestion = (questionId) => {
    return new Promise((resolve, reject) => {
      this.post(`${links.approvalQuestions}/${questionId}`)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  rejectAQuestion = (questionId) => {
    return new Promise((resolve, reject) => {
      this.delete(`${links.approvalQuestions}/${questionId}`)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  updateApprovalQuestion = (questionId) => {
    return new Promise((resolve, reject) => {
      this.put(`${links.approvalQuestions}/${questionId}`)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
  // APPROVE END
}

let adminServices = new AdminServices(APIAdmin);
export default adminServices;