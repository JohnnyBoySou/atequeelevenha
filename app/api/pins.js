import axios from 'axios';
export const getPins = async () => {
  const response = await axios.get('https://www.atequeelevenha.com/api/pins');
  return response.data;
}
export const FILTERS = ["Tudo", "Deus", "Inspiração", "Bom dia", "Papel de Parede", "Motivação", "Versículos", "Ensinamentos"];
