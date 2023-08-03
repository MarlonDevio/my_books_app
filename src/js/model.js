import { API_KEY } from '../../env.js';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  volumeInfo: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
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
      previewLink: volumeInfo.previewLink,
      industryIdentifiers: volumeInfo.industryIdentifiers,
      pageCount: volumeInfo.pageCount,
      dimensions: volumeInfo.dimensions,
      categories: volumeInfo.categories,
      avgRating: volumeInfo.averageRating,
      image: volumeInfo.imageLinks.thumbnail,
    };

  } catch (err) {
    throw err;
  }
};

/*
Loading search results
 */

export const loadSearchResults = async function(query) {
  try {
    state.search.query = query;
    const data = await getJSON(
      `https://www.googleapis.com/books/v1/volumes?q=${query}+intitle:${query}&printType=books&maxResults=40&key=${API_KEY}`,
    );
    // later on the id of the results gets stored in the hash on the html.
    // this way, on refresh/click/hashchange it will trigger the loadBook function!
    // the loadBook will then run it's own API call, based on the data above

    //TODO => adjust the object, too much that that won't be used. Performance
    state.search.results = data.items.map((item) => {
      return {
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors?.[0],
        publisher: item.volumeInfo.publisher,
        description: item.volumeInfo.description,
        previewLink: item.volumeInfo.previewLink,
        industryIdentifiers: item.volumeInfo.industryIdentifiers,
        categories: item.volumeInfo.categories,
        image: item.volumeInfo.imageLinks?.thumbnail,
      };
    });
  } catch (err) {
    console.error(`${err} error`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
state.search.page = page;
 const start = (page-1) * state.search.resultsPerPage //0;
 const end = page * state.search.resultsPerPage //9; // slice doesnt include the last
  // (so 9)
  return state.search.results.slice(start, end)
}