import fetch from "node-fetch";

import {API_URL} from "constants/Environment";

import AuthService from "./AuthService";

const queryString = (params) => {
  let result = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  return result.length === 0 ? '' : '?' + result;
};

class DataService {
  static async get(path, queryParam = {}) {
    const response = await fetch(API_URL + path + queryString(queryParam), {
      headers: {
        'Authorization': 'Bearer ' + AuthService.getAuthToken()
      }
    });
    return await response.json();
  }

  static async download(path, filename) {
    const response = await fetch(API_URL + path, {
      headers: {
        'Authorization': 'Bearer ' + AuthService.getAuthToken()
      }
    });
    const header = response.headers.get("content-disposition");
    if (header === null && typeof filename === 'undefined') {
      console.error("can't describe filename", header);
      return false;
    }
    if (typeof filename === 'undefined') {
      filename = header.split("filename=")[1];
    }
    const blob = await response.blob();
    const virtualDom = document.createElement('a');
    virtualDom.href = window.URL.createObjectURL(blob);
    virtualDom.setAttribute('download', filename);
    virtualDom.click();
  }

  static async post(path, payload = {}) {
    const response = await fetch(API_URL + path, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + AuthService.getAuthToken()
      },
      body: JSON.stringify(payload)
    });
    return await response.json();
  }

  static async upload(path, file, payload = {}) {
    var data = new FormData();
    data.append('file', file);
    for (let key in payload) data.append(key, payload[key]);

    const response = await fetch(API_URL + path, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + AuthService.getAuthToken()
      },
      body: data,
    });

    return await response.json();
  }

  static async put(path, payload = {}) {
    const response = await fetch(API_URL + path, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + AuthService.getAuthToken()
      },
      body: JSON.stringify(payload)
    });
    return await response.json();
  }

  static async delete(path) {
    const response = await fetch(API_URL + path, {
      method: "DELETE",
      headers: {
        'Authorization': 'Bearer ' + AuthService.getAuthToken()
      }
    });
    return await response.json();
  }
}

export default DataService;
