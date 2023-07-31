import { API_URL, API_KEY } from '../../.env.js';
import { getJSON } from './helpers.js';

export const state = {
  book: {},
}
/* //////////
Load book
////////// */
export const loadBook = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}&key=${API_KEY}`);

    const { volumeInfo } = data;

    state.book = {
      id: data.id,
      selfLink: data.selfLink,
      title: volumeInfo.title,
      authors: volumeInfo.authors[0],
      publisher: volumeInfo.publisher,
      publishedDate: volumeInfo.publishedDate,
      description: volumeInfo.description,
      pageCount: volumeInfo.pageCount,
      dimensions: volumeInfo.dimensions,
      avgRating: volumeInfo.averageRating,
      imgLinks: volumeInfo.imageLinks,
    }

    console.log(state.book);

  } catch (error) {
    console.error(`${error} 💣💣💣💣 `);
    throw error;
  }

};

loadBook('buc0AAAAMAAJ');

