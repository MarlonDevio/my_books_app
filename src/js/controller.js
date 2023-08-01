import * as model from './model.js';
import bookView from './views/bookView.js';

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

const init = function() {
  bookView.addHandlerRender(controlBooks);
}
init();