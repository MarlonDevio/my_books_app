import icons from '../../img/icons.svg';

class BookView {
  _parentElement = document.querySelector('.book');
  _data;
  _errorMessage = 'We could not find that book. Please try another one!';
  _message = '';

  render(data) {
    // book gets stored in the state object, then gets passed as the data argument
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  //publisher subscriber pattern => addHandlerRender is the publisher,
  // handler is the subscriber
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  renderSpinner() {
    const markup = `
  <div class='spinner'>
  <svg>
    <use href='${icons}#icon-loader'></use>
  </svg>
</div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(message = this._errorMessage) {
    const markup = `
    <div class='error'>
      <div>
        <svg>
          <use href='${icons}#icon-alert-triangle'></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class='message'>
      <div>
        <svg>
          <use href='${icons}#icon-smile'></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return `
 <figure class='book__fig'>
      <img src='${this._data.image}' alt='Tomato' class='book__img' />
      <h1 class='book__title'>
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class='book__details'>
      <div class='book__info'>
        <svg class='book__info-icon'>
          <use href='src/img/icons.svg#icon-clock'></use>
        </svg>
        <span class='book__info-data book__info-data--rating'>${this._data.avgRating}</span>
        <span class='book__info-text'>rating</span>
      </div>
      <div class='book__info'>
        <svg class='book__info-icon'>
          <use href='src/img/icons.svg#icon-users'></use>
        </svg>
        <span class='book__info-data book__info-data--people'>4</span>
        <span class='book__info-text'>servings</span>

        <div class='book__info-buttons'>
          <button class='btn--tiny btn--increase-servings'>
            <svg>
              <use href='src/img/icons.svg#icon-minus-circle'></use>
            </svg>
          </button>
          <button class='btn--tiny btn--increase-servings'>
            <svg>
              <use href='src/img/icons.svg#icon-plus-circle'></use>
            </svg>
          </button>
        </div>
      </div>

      <div class='book__user-generated'>
        <svg>
          <use href='src/img/icons.svg#icon-user'></use>
        </svg>
      </div>
      <button class='btn--round'>
        <svg class=''>
          <use href='src/img/icons.svg#icon-bookmark-fill'></use>
        </svg>
      </button>
    </div>

    <div class='book__categories'>
      <h2 class='heading--2'>book categories</h2>
      <ul class='book__categorie-list'>
      ${this._data.categories.map(this._generateMarkupCategorie)
      .join('')}
      </ul>
    </div>

    <div class='book__description'>
      <h2 class='heading--2'>Description</h2>
      <p class='book__description-text'>
        This book was written by ${this._data.authors} and published by
        <span class='book__publisher'>${this._data.publisher}</span>. Please check out
        description at their website.
      </p>
      <a
        class='btn--small book__btn'
        href='${this._data.previewLink}'
        target='_blank'
      >
        <span>description</span>
        <svg class='search__icon'>
          <use href='src/img/icons.svg#icon-arrow-right'></use>
        </svg>
      </a>
    </div>`;
  }

  _generateMarkupCategorie(cat) {
    return `
      <li class='book__categorie'>
       <svg class='book__icon'>
         <use href='src/img/icons.svg#icon-check'></use>
       </svg>
       <div class='book__quantity'>${cat}</div>
     </li>
`;
  }
}

export default new BookView();