import axios from 'axios';


export const getShorts = async () => {
  const res = await axios.get('https://www.atequeelevenha.com/api/shorts');
  return res.data;
}


export const getShortsRecents = async () => {
  const res = await axios.get('https://www.atequeelevenha.com/api/shorts');
  return res.data;
}

export const getShortsPopular = async () => {
  const res = await axios.get('https://www.atequeelevenha.com/api/shorts');
  return res.data;
}