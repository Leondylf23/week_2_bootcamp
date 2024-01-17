import axios from "axios";

const baseUrl = import.meta.env.VITE_ENDPOINT_URL ?? "";
const baseUrllocal = import.meta.env.VITE_ENDPOINT_URL_LOCAL ?? "";

export const callApi = async (endpoint, method, headers = {}, params = {}, data ={}) => {
    const options = {
        url: baseUrl + endpoint,
        method,
        headers,
        params,
        data
      };
    
      return axios(options).then((res) => {
        const responseData = res?.data;
        return responseData;
      });
};

export const callApiLocal = async (endpoint, method, headers = {}, params = {}, data ={}) => {
  const options = {
      url: baseUrllocal + endpoint,
      method,
      headers,
      params,
      data
    };
  
    return axios(options).then((res) => {
      const responseData = res?.data;
      return responseData;
    });
};