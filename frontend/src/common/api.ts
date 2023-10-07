import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

export const get = async (path: string): Promise<any> => {
  try {
    const res = await axios.get(`${API_URL}${path}`);
    return res.data;
  } catch (err: any) {
    // console.log(err);
    throw err.response.data;
  }
};
