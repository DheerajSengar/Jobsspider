import axios from 'axios';

const serverURL = process.env.REACT_APP_SERVER_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000');

const getAuthHeaders = () => {
  const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const postData = async (url, body) => {
  try {
    const fullUrl = url.startsWith('http') ? url : `${serverURL}/${url.replace(/^\//, '')}`;
    const response = await axios.post(fullUrl, body, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (e) {
    console.error(`Error in postData [${url}]:`, e);
    return e.response?.data || { status: false, message: e.message || 'Network Error' };
  }
};

const getData = async (url) => {
  try {
    const fullUrl = url.startsWith('http') ? url : `${serverURL}/${url.replace(/^\//, '')}`;
    const response = await axios.get(fullUrl, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (e) {
    console.error(`Error in getData [${url}]:`, e);
    return e.response?.data || { status: false, message: e.message || 'Network Error' };
  }
};

const passwordGenerator = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const generateOtp = () => {
  const ot = Math.floor(100000 + Math.random() * 900000);
  console.log('Generated OTP:', ot);
  return ot;
};

export { serverURL, generateOtp, postData, getData, passwordGenerator, getAuthHeaders };