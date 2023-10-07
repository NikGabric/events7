import axios from 'axios';

const IP_API_URL = 'http://ip-api.com/json?fields=countryCode';

export const getCountryCode = async (): Promise<any> => {
  try {
    const ipRes = await axios.get(IP_API_URL);
    const countryCode = ipRes.data.countryCode;
    return countryCode;
  } catch (err: any) {
    throw err.response.data;
  }
};
