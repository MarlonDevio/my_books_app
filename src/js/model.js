import { API_KEY } from '../../env.js';
import { API_URL } from './config.js';
import {getJSON} from './helpers.js';

export const state = {
  volumeInfo: {},
};

// Change our state object, live connection between exports and imports (
// controller imports state, model exports state)
export const loadBook = async function(id) {
  try {
    const data = await getJSON(`${API_URL}${id}?key=${API_KEY}`);

    const { volumeInfo } = data;
    state.volumeInfo = {
      id: data.id,
      title: volumeInfo.title,
      authors: volumeInfo.authors[0],
      publisher: volumeInfo.publisher,
      publishedDate: volumeInfo.publishedDate,
      description: volumeInfo.description,
      selfLink: data.selfLink,
      previewLink: volumeInfo.previewLink,
      industryIdentifiers: volumeInfo.industryIdentifiers,
      pageCount: volumeInfo.pageCount,
      dimensions: volumeInfo.dimensions,
      categories: volumeInfo.categories,
      avgRating: volumeInfo.averageRating,
      image: volumeInfo.imageLinks.thumbnail,
    };

    console.log(state.volumeInfo);
  } catch (err) {
    // temp error handling
    console.error(`${err} 💥💥💥`);
    throw err;
  }
};