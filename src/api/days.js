import axios from 'axios';


export const getDays = async () => {
  const response = await axios.get('https://www.atequeelevenha.com/api/days');
  return response.data;
}