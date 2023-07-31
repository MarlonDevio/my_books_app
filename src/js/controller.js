import { API_URL, API_KEY } from '../../env.js';

const bookContainer = document.querySelector('.book');


/*  LOOKING FOR A SINGLE BOOK*/
// const url = `https://www.googleapis.com/books/v1/volumes/OpzujwEACAAJ?key=${API_KEY}`;

const url = `https://www.googleapis.com/books/v1/volumes/8auMEAAAQBAJ?key=${API_KEY}`;


/*  LOOKING FOR A SERIES OF BOOKS*/
// const url =
// 'https://www.googleapis.com/books/v1/volumes?q=rich+intitle:rich&key=${API_KEY}';

const renderSpinner = function(parentEl) {
  const markup = `
  <div class='spinner'>
  <svg>
    <use href='src/img/icons.svg#icon-loader'></use>
  </svg>
</div>`;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};


const showBook = async function() {

  try {


    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    renderSpinner(bookContainer);
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`);
    const data = await res.json();

    if (!res.ok) throw new Error(`${res.status} ${data.error.message} `);
    console.log(data);
    let { volumeInfo } = data;
    volumeInfo = {
      id: data.id,
      title: volumeInfo.title,
      authors: volumeInfo.authors[0],
      publisher: volumeInfo.publisher,
      publishedDate: volumeInfo.publishedDate,
      description: volumeInfo.description,
      selfLink: data.selfLink,
      previewLink: volumeInfo.previewLink,
      industryIdentifiers: volumeInfo.industryIdentifiers,
      pageCount: volumeInfo.pageCount,
      dimensions: volumeInfo.dimensions,
      categories: volumeInfo.categories,
      avgRating: volumeInfo.averageRating,
      image: volumeInfo.imageLinks.thumbnail,
    };

    console.log(volumeInfo);

    const markup =
      ` <figure class='book__fig'>
      <img src='${volumeInfo.image}' alt='Tomato' class='book__img' />
      <h1 class='book__title'>
        <span>${volumeInfo.title}</span>
      </h1>
    </figure>

    <div class='book__details'>
      <div class='book__info'>
        <svg class='book__info-icon'>
          <use href='src/img/icons.svg#icon-clock'></use>
        </svg>
        <span class='book__info-data book__info-data--rating'>${volumeInfo.avgRating}</span>
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
      ${volumeInfo.categories.map(cat => {
          return (
            `
      <li class='book__categorie'>
       <svg class='book__icon'>
         <use href='src/img/icons.svg#icon-check'></use>
       </svg>
       <div class='book__quantity'>${cat}</div>
     </li>
`);
        })
        .join('')}
      </ul>
    </div>

    <div class='book__description'>
      <h2 class='heading--2'>Description</h2>
      <p class='book__description-text'>
        This book was written by ${volumeInfo.authors} and published by
        <span class='book__publisher'>${volumeInfo.publisher}</span>. Please check out
        description at their website.
      </p>
      <a
        class='btn--small book__btn'
        href='${volumeInfo.previewLink}'
        target='_blank'
      >
        <span>description</span>
        <svg class='search__icon'>
          <use href='src/img/icons.svg#icon-arrow-right'></use>
        </svg>
      </a>
    </div>`;

    bookContainer.innerHTML = '';
    bookContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    alert(err);
    console.log(err);
  }
};

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showBook));
