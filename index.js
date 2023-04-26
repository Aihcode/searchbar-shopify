class PredictiveSearch extends HTMLElement {
  constructor() {
    super();

    this.input = document.querySelector('.search-bar input[type="search"]');
    this.predictiveSearchResults = document.querySelector('.ajax-search-result2.dropdown-menu');

    this.input.addEventListener('input', this.debounce((event) => {
      this.onChange(event);
    }, 300).bind(this));
  }

  onChange() {
    const searchTerm = this.input.value.trim();

    if (!searchTerm.length) {
      this.close();
      return;
    }

    this.getSearchResults(searchTerm);
  }

  getSearchResults(searchTerm) {
    fetch(`/search?q=${searchTerm}`)
      .then((response) => {
        if (!response.ok) {
          var error = new Error(response.status);
          this.close();
          throw error;
        }

        return response.text();
      })
      .then((text) => {
        //const resultsMarkup = new DOMParser().parseFromString(text, 'text/html').querySelector('#shopify-section-predictive-search').innerHTML;
        //this.predictiveSearchResults.innerHTML = resultsMarkup;

        //collect results
        const resultsMarkup = new DOMParser().parseFromString(text, 'text/html').querySelectorAll('.grid-uniform .product-item-wrap');
        let returnHTML = "";
        resultsMarkup.forEach(item => {

          const url = item.querySelector('a.product.photo.product-item-photo').href;
          const image = item.querySelector('.cust-img-srch');
          const name = item.querySelector('a.product-item-name.itm-nam-srch.tit-prod-thrd').innerText;
          
          if (image.dataset.vdchecker !== "Vanna Belt") {
            const listItem = document.createElement('li');
          const divBlockImage = document.createElement('div');
          divBlockImage.className = "img-block";
          const divBlockInfo = document.createElement('div');
          divBlockInfo.className = "info-block";
          const linkItemOne = document.createElement('a');
          const linkItemTwo = document.createElement('a');
          const imageItem = document.createElement('img');
          imageItem.src = image.src;
          imageItem.className = "img-responsive";
          linkItemTwo.href = url;
          linkItemOne.href = url;
          linkItemOne.append(imageItem);
          linkItemTwo.innerText = name;
          divBlockImage.append(linkItemOne);
          divBlockInfo.append(linkItemTwo);
          listItem.appendChild(divBlockImage);
          listItem.appendChild(divBlockInfo);

          returnHTML += listItem.outerHTML;
          }

        });

        this.predictiveSearchResults.innerHTML = `<ul>${returnHTML}</ul>`;

        this.open();
      })
      .catch((error) => {
        this.close();
        throw error;
      });
  }

  open() {
    this.predictiveSearchResults.style.display = 'block';
  }

  close() {
    this.predictiveSearchResults.style.display = 'none';
  }

  debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }
}
customElements.define('predictive-search', PredictiveSearch);
new PredictiveSearch();



// MOBILE
class PredictiveSearchMobile extends HTMLElement {
  constructor() {
    super();

    this.input = document.querySelector('.hed-srch-mob .search-bar input[type="search"]');
    this.predictiveSearchResults = document.querySelector('.ajax-search-result2.dropdown-menu.mobile');

    this.input.addEventListener('input', this.debounce((event) => {
      this.onChange(event);
    }, 300).bind(this));
  }

  onChange() {
    const searchTerm = this.input.value.trim();

    if (!searchTerm.length) {
      this.close();
      return;
    }

    this.getSearchResults(searchTerm);
  }

  getSearchResults(searchTerm) {
    fetch(`/search?q=${searchTerm}`)
      .then((response) => {
        if (!response.ok) {
          var error = new Error(response.status);
          this.close();
          throw error;
        }

        return response.text();
      })
      .then((text) => {
        //const resultsMarkup = new DOMParser().parseFromString(text, 'text/html').querySelector('#shopify-section-predictive-search').innerHTML;
        //this.predictiveSearchResults.innerHTML = resultsMarkup;

        //collect results
        const resultsMarkup = new DOMParser().parseFromString(text, 'text/html').querySelectorAll('.grid-uniform .product-item-wrap');
        let returnHTML = "";
        resultsMarkup.forEach(item => {

          const url = item.querySelector('a.product.photo.product-item-photo').href;
          const image = item.querySelector('.cust-img-srch');
          const name = item.querySelector('a.product-item-name.itm-nam-srch.tit-prod-thrd').innerText;
          
          if (image.dataset.vdchecker !== "Vanna Belt") {
            const listItem = document.createElement('li');
          const divBlockImage = document.createElement('div');
          divBlockImage.className = "img-block";
          const divBlockInfo = document.createElement('div');
          divBlockInfo.className = "info-block";
          const linkItemOne = document.createElement('a');
          const linkItemTwo = document.createElement('a');
          const imageItem = document.createElement('img');
          imageItem.src = image.src;
          imageItem.className = "img-responsive";
          linkItemTwo.href = url;
          linkItemOne.href = url;
          linkItemOne.append(imageItem);
          linkItemTwo.innerText = name;
          divBlockImage.append(linkItemOne);
          divBlockInfo.append(linkItemTwo);
          listItem.appendChild(divBlockImage);
          listItem.appendChild(divBlockInfo);

          returnHTML += listItem.outerHTML;
          }

        });

        this.predictiveSearchResults.innerHTML = `<ul>${returnHTML}</ul>`;

        this.open();
      })
      .catch((error) => {
        this.close();
        throw error;
      });
  }

  open() {
    this.predictiveSearchResults.style.display = 'block';
  }

  close() {
    this.predictiveSearchResults.style.display = 'none';
  }

  debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }
}
customElements.define('predictive-search-mobile', PredictiveSearchMobile);
new PredictiveSearchMobile();