const API_KEY = 'AIzaSyDeiVRyinvLIcdX_XWOlo2N7VgFACON_3E';
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
  bookmarks: [],
};

/*
Loading a single book
 */
export const loadBook = async function(id) {
// Change our state object, live connection between exports and imports (
// controller imports state, model exports state)
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
      //TODO ==> Salebility check if for sale or not
      price: data.saleInfo.listPrice?.amount,
      currency: data.saleInfo.listPrice?.currencyCode,
      quantity: 1,

    };
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.volumeInfo.bookmarked = true;
    else state.volumeInfo.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

/*
Loading search results
 */
export const loadSearchResults = async function(query) {
  // TODO => make sure that no double books are shown, as is now the case
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
    // reset the search results to page 1
    state.search.page = 1;
  } catch (err) {
    console.error(`${err} error`);
    throw err;
  }
};

/*
Pagination
 */
export const getSearchResultsPage = function(page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; //0;
  const end = page * state.search.resultsPerPage; //9; // slice doesnt include the last
  // (so 9)
  return state.search.results.slice(start, end);
};

export const updateQuantity = function(newQuantity) {
// reach into the state (book pricing) and then change the price in the book view
  const oldQt = state.volumeInfo.quantity;
  state.volumeInfo.price = (state.volumeInfo.price * newQuantity) / oldQt;
  state.volumeInfo.quantity = newQuantity;
  // newQt = oldQt * newQt / oldQt
};

//TT local storage
const persistBookmarks = function() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

//TT adding bookmarks
export const addBookmark = function(book) {
  // Add bookmark
  state.bookmarks.push(book);

  // Mark current book as bookmark
  if (book.id === state.volumeInfo.id) state.volumeInfo.bookmarked = true;

  persistBookmarks();
};

//TT removing bookmarks
export const deleteBookmark = function(id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current book as NOT bookmarked
  if (id === state.volumeInfo.id) state.volumeInfo.bookmarked = false;

  persistBookmarks();
};

const init = function() {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

// only during development
const clearBookmarks = function() {
  localStorage.clear('bookmarks');
}

export const uploadBook = async function(newBook) {
  console.log(newBook);
  const categories = Object.entries(newBook).filter(
entry => entry[0].startsWith('category') && entry[1] !== '',
  ).map(cat => {
    const [quantity, test, description] = cat[1].replaceAll(' ', '').split(',');
    return { quantity, test, description };

  })
  console.log(categories);
}
