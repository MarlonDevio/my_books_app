import View from "./View";

class BookView extends View {
  _parentElement = document.querySelector('.book');
  _errorMessage = "We couldn't find that book! Please try again!";
  _message = '';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach((ev) => window.addEventListener(ev, handler));
  }

  _generateMarkup() {
    return ` 
    

      
	  <figure class="book__fig">
		<img src="src/img/test-1.jpg" alt="Tomato" class="book__img" />
		<h1 class="book__title">
		  <span>Pasta with tomato cream sauce</span>
		</h1>
	  </figure>

	  <div class="book__details">
		<div class="book__info">
		  <svg class="book__info-icon">
			<use href="src/img/icons.svg#icon-clock"></use>
		  </svg>
		  <span class="book__info-data book__info-data--minutes">45</span>
		  <span class="book__info-text">minutes</span>
		</div>
		<div class="book__info">
		  <svg class="book__info-icon">
			<use href="src/img/icons.svg#icon-users"></use>
		  </svg>
		  <span class="book__info-data book__info-data--people">4</span>
		  <span class="book__info-text">servings</span>

		  <div class="book__info-buttons">
			<button class="btn--tiny btn--increase-servings">
			  <svg>
				<use href="src/img/icons.svg#icon-minus-circle"></use>
			  </svg>
			</button>
			<button class="btn--tiny btn--increase-servings">
			  <svg>
				<use href="src/img/icons.svg#icon-plus-circle"></use>
			  </svg>
			</button>
		  </div>
		</div>
    `;
  }
}

export default new BookView();