import axios from 'axios';

const http = {
  
  request() {
    return axios.request({
      url,
      params,
      data,
      method: method.toLowerCase()
    })
  }, 

  get(url, params = {}) {
    return this.request('get', url, params, {});
  },

  post(url, params = {}, data = {}) {
    return this.request('post', url, params, data)
  },

  put(url, params = {}, data = {}) {
    return this.request('put', url, params, data)
  },

  delete(url, params = {}, data = {}) {
    return this.request('delete', url, params, data)
  },

  init(baseUrl) {
    axios.defaults.baseURL = baseUrl;
  }

};

export default http;