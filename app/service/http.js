import axios from 'axios';

export default {
  
  request(method, url, params, data) {
    return axios.request({
      url,
      params,
      data,
      method: method.toLowerCase()
    });
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

  init(config = {}) {
    axios.defaults.baseURL = config.baseUrl;

    //Request middleware
    axios.interceptors.request.use((config) => {
      console.debug('[HTTP] requesting', config);
      return config;
    });

    //Response middleware
    axios.interceptors.response.use(function (response) {
      console.debug('[HTTP] receiving', response);
      return response;
    });
  }

};