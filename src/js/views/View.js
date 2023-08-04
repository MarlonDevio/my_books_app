import icons from '../../img/icons.svg';

export default class View {
// we will not create another instance of this class, we will only use it as a parent class. That is why we export
// it as default and not as a named export or as a new instance.
  _data;

  render(data, render = true) {
    // guard clause
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    // book gets stored in the state object, then gets passed as the data argument
    this._data = data;
    const markup = this._generateMarkup();

    if(!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // DOM updating algorithm
  update(data) {

    this._data = data;
    // entire markup as if we wanted to render a new view. But we still need
    // the entire markup because we need to compare it with the old markup
    // create new markup, but not render it, compare new html to current
    // html and only change text and attributes that are different from the old html
    const newMarkup = this._generateMarkup();

    // will convert the string into real DOM objects (virtual dom) ==> lives
    // in our memory. We can then compare the virtual dom with the real dom
    const newDOM = document.createRange()
      .createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    // we will see all the elements that will be contained in the new markup
    // if we console.log it
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    // we will loop over the new elements array and compare each element
    // with the old element. If the element is different, we will update the
    // text and the attributes of the old element with the new element values
    // comparing 2 arrays
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // first child is the text, the element is just an element

      // Update changed TEXT
      if (
        !newEl.isEqualNode(
          curEl) && newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes)
          .forEach(attr => curEl.setAttribute(attr.name, attr.value),
          );
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
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
}