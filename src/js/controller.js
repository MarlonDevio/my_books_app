import * as model from './model';
import bookView from './views/bookView';

const controlBook = async function (id) {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;

    bookView.renderSpinner();

    await model.loadBook(id);
    console.log(model.loadBook(id));

    bookView.render(model.state);
    console.log(model.state);
  } catch (error) {
    bookView.renderError();
  }
};

const init = function () {
  bookView.addHandlerRender(controlBook);
};
console.log(model.state.book)
init();