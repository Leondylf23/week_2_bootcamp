import axios from "axios";

const baseUrllocal = import.meta.env.VITE_ENDPOINT_URL_LOCAL ?? "";

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