import * as model from './model.js';
import bookView from './views/bookView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js'
import addBookView from './views/addBookView.js';

//TT controlling the book view
const controlBooks = async function() {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    bookView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1) Update bookmarks view
    bookmarksView.update(model.state.bookmarks)

    // 2) Loading book (here we get acces to the state object)
    await model.loadBook(id);

    // 3) Rendering book
    bookView.render(model.state.volumeInfo);


  } catch (err) {
    bookView.renderError();
  }
};

//TT controlling the search results
const controlSearchResults = async function() {
  // we only want to listen for this event after the page has loaded and then listen for the event => publisher
  // subscriber pattern
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);

  } catch (err) {
    console.log(err);
  }
};
//TT controlling the pagination
const controlPagination = function(goToPage) {
  /* controlPagination is the controller function for the pagination buttons
   (next, prev, etc) => it will be called by the event listener in the
   paginationView module
   the goToPage argument is the page number that is clicked o
   */

  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

//TT controlling the quantity
const controlQuantity = function(newQuantity) {
  // update the quantity in the state
  //! we don't manipulate data in the controller => delegate to the model
  model.updateQuantity(newQuantity);

  // update the book view
  bookView.update(model.state.volumeInfo);
};

//TT Contoller for the add bookmarks
const controlAddBookmark = function() {
  // 1) Add/remove bookmark
  if (!model.state.volumeInfo.bookmarked) model.addBookmark(
    model.state.volumeInfo);
  else  model.deleteBookmark(
    model.state.volumeInfo.id);

  // 2) Update bookView
  bookView.update(model.state.volumeInfo);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks)
};

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks)
}

const controlAddBook = function(newBook) {
 model.uploadBook(newBook)
}
//TT initializing the app and it's functionality
const init = function() {
  // rendering bookmarks
  bookmarksView.addHandlerRender(controlBookmarks);

  // rendering book
  bookView.addHandlerRender(controlBooks);

  // updating quantity and price
  bookView.addHandlerUpdateQuantity(controlQuantity);

  // adding bookmarks
  bookView.addHandlerAddBookmark(controlAddBookmark);

  // handlerSearch listens to the submit event on the parent element (form)
  searchView.addHandlerSearch(controlSearchResults);

  // handlerClick listens to the click event on the parent element (button)
  paginationView.addHandlerClick(controlPagination);

  //
  addBookView.addHandlerUpload(controlAddBook);
};
init();