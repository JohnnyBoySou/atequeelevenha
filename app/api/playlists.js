import axios from 'axios';

export const getPlaylists = async () => {
  const res = await axios.get('https://www.atequeelevenha.com/api/playlists');
  return res.data;
}

export const getPlaylistsTop = async () => {
  const res = await axios.get('https://www.atequeelevenha.com/api/playlists?type=top');
  return res.data;
}

export const getPlaylistsRecent = async () => {
  const res = await axios.get('https://www.atequeelevenha.com/api/playlists?type=recent');
  return res.data;
}