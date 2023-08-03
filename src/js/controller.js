import * as model from './model.js';
import bookView from './views/bookView.js';
import searchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

const controlBooks = async function() {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    bookView.renderSpinner();

    // 1) Loading book (here we get acces to the state object)
    await model.loadBook(id);

    // 2) Rendering book
    bookView.render(model.state.volumeInfo);

  } catch (err) {
    bookView.renderError();
  }
};

const controlSearchResults = async function () {
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

// controlPagination is the controller function for the pagination buttons
// (next, prev, etc) => it will be called by the event listener in the
// paginationView module
// the goToPage argument is the page number that is clicked on
const controlPagination = function(goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
}

const init = function() {
  bookView.addHandlerRender(controlBooks);
  searchView.addHandlerSearch(controlSearchResults);
  // handlerClick listens to the click event on the parent element (button)
  paginationView.addHandlerClick(controlPagination)
}
init();