import View from './View.js';
import previewView from './previewView.js';
import icons from '../../img/icons.svg';

//TODO error rendering in the search
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Look for your favourite book and bookmark them!';
  _successMessage = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data.map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}


export default new BookmarksView();
