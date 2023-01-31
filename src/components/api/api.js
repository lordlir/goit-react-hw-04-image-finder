import axios from 'axios';

const BASE_URL = `https://pixabay.com/api/`;
const KEY_API = '32440929-cc1adcbe77972722d22b2e7bd';

export const dataImages = async (query = 'news', page = 1) => {
  const { data } = await axios.get(
    `${BASE_URL}?q=${query}&page=${page}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return data;
};
