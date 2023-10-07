import axios from 'axios';
import { getCountryCode } from './helpers';

const API_URL = import.meta.env.VITE_APP_API_URL;

export const get = async (path: string): Promise<any> => {
  try {
    const res = await axios.get(`${API_URL}${path}`);
    return res.data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const post = async (path: string, body: any): Promise<any> => {
  try {
    const countryCode = await getCountryCode();
    const res = await axios.post(`${API_URL}${path}`, { ...body, countryCode });
    return res.data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const del = async (path: string): Promise<any> => {
  try {
    const res = await axios.delete(`${API_URL}${path}`);
    return res.data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const put = async (path: string, body: any): Promise<any> => {
  try {
    const res = await axios.put(`${API_URL}${path}`, body);
    return res.data;
  } catch (err: any) {
    throw err.response.data;
  }
};
