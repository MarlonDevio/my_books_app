// this class is not going to render anything, only getting the input
class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    // we put this code here because it's the only place where we have access to because it has to do with the dom
    const query = this._parentElement.querySelector('.search__field').value;
    this.clearInput();
    return query;

  }

  clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }


  //publisher ==> controlSearchResults is subscriber
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function(e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();