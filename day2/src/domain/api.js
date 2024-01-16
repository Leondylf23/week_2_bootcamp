import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1"

export const callApi = async (endpoint, method, headers = {}, params = {}, data ={}) => {
    const options = {
        url: baseUrl + endpoint,
        method,
        headers,
        params,
        data
      }
    
      return axios(options).then((res) => {
        const responseData = res?.data;
        return responseData;
      })
};