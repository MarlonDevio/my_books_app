import * as model from './model.js';
import bookView from './views/bookView.js';
import searchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import resultsView from './views/resultsView.js';

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
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
}
const init = function() {
  bookView.addHandlerRender(controlBooks);
  searchView.addHandlerSearch(controlSearchResults);
}
init();