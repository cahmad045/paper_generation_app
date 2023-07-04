// import APIuser from "APIuser";
// APIuser.defaults.baseURL = "http://localhost:8080/bespoke"
// APIuser.defaults.headers.common["token"] = localStorage.getItem("token");
import { APIuser, APIGeneration } from "./APIS";
import axios from "axios";
export default class GenericServices {
  constructor(baseAPI) {
    this.baseAPI = baseAPI
  }

  get = (url) => {
    console.log("get=", `${this.baseAPI.defaults.baseURL}/${url}`)
    return new Promise((resolve, reject) => {
      this.baseAPI
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err?.response?.data || err);
        });
    });
  };

  post = (url, data) => {
    console.log("post=", `${this.baseAPI.defaults.baseURL}/${url}`)
    return new Promise((resolve, reject) => {
      this.baseAPI
        .post(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err?.response?.data || err);
        });
    });
  };
  post_file = (
    url,
    data,
    ) => {
    console.log("post=", `${this.baseAPI.defaults.baseURL}/${url}`)
    return new Promise((resolve, reject) => {
      this.baseAPI
        .post(url, data,  {headers: {
          'Content-Type': 'multipart/form-data',
        }})
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err?.response?.data || err);
        });
    });
  };

  put = (url, data) => {
    console.log("put=", `${this.baseAPI.defaults.baseURL}/${url}`)
    return new Promise((resolve, reject) => {
      this.baseAPI
        .put(url, data).then((res) => {
          resolve(res.data);
        }).catch((err) => {
          reject(err?.response?.data || err);
        })
    });
  };

  delete = (url, data) => {
    console.log("delete=", `${this.baseAPI.defaults.baseURL}/${url}`)
    return new Promise((resolve, reject) => {
      this.baseAPI
        .delete(url, data).then((res) => {
          resolve(res.data);
        }).catch((err) => {
          reject(err?.response?.data || err);
        })
    });
  };

}
// export default UserGenericServices;


