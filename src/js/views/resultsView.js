import View from './View.js';
import icons from '../../img/icons.svg';

//TODO error rendering in the search
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No books found. Please try again! ;)';
  _successMessage= '';

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generateMarkupPreview)
      .join('');
  }

  _generateMarkupPreview(result) {
    return `
    <li class='preview'>
      <a class='preview__link ' href='#${result.id}'>
        <figure class='preview__fig'>
          <img src='${result.image}' alt='${result.title}' />
        </figure>
        <div class='preview__data'>
          <h4 class='preview__title'>${result.title}</h4>
          <p class='preview__publisher'>${result.publisher}</p>
        </div>
      </a>
    </li>
`;
  }
}


export default new ResultsView();