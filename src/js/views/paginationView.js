import icons from '../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  // publisher-subscriber pattern
  // handler is the controller function
  // the handler is called in the controller module
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      // convert string to number
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }


  // TODO: refactor code. Button method is not DRY
  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage);

    // page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return `
      <button data-goto='${currentPage + 1}' class='btn--inline pagination__btn--next'>
        <span>page ${currentPage + 1}</span>
        <svg class='search__icon'>
          <use href='${icons}#icon-arrow-right'></use>
        </svg>
      </button>;
      `;
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return `
      <button data-goto='${currentPage - 1}' class='btn--inline pagination__btn--prev'>
        <svg class='search__icon'>
           <use href='${icons}#icon-arrow-left'></use>
        </svg>
        <span>page ${currentPage - 1}</span>
      </button>
      `;
    }

    // Other page
    if (currentPage < numPages) {
      return `
      <button data-goto='${currentPage - 1}' class='btn--inline pagination__btn--prev'>
        <svg class='search__icon'>
           <use href='${icons}#icon-arrow-left'></use>
        </svg>
        <span>page ${currentPage - 1}</span>
      </button>
      
      <button data-goto='${currentPage + 1}' class='btn--inline pagination__btn--next'>
        <span>page ${currentPage + 1}</span>
        <svg class='search__icon'>
          <use href='${icons}#icon-arrow-right'></use>
        </svg>
      </button>;
      `;
    }

    // page 1, and NO other pages
    return '';
  }
}

export default new PaginationView();