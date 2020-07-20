/**==========================================================================
 # Name: Slider
 # Date: jan 2019
 # Author: sam
 # Description:
 Load more is used on overview pages. It let us receive new items through http request
 ========================================================================== */

let loadMoreWrapper = document.querySelector('.js-load-more-wrapper');
let loadMoreButton = document.querySelector('.js-load-more-button');
let loadMoreNextPageSelector = '.js-load-more-next-page';

let loadMoreSearchForm = document.querySelector('.js-load-more-search-form');
let loadMoreSearchInput = document.querySelector('.js-load-more-search-input');
let loadMoreSearchUrl = document.querySelector('.js-load-more-search-url');

const paging = {

  more: function() {

    // Show the loader
    paging.showLoader();

    // Disable the button
    paging.disableButton();

    // Grab and set the next-url
    var next = paging.next();

    // If the next-url is defined, load more elements
    if (next) {

      fetch(next, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'GET',
      }).then(response => response.text()).then(data => {
        loadMoreWrapper.innerHTML += data;

        // Enable the button
        paging.enableButton();

        // Hide the button if the end is reached
        paging.hideButtonOnEnd();
      });
    }
  },

  // Display the loader inside the button
  showLoader: function() {

    // Add the loading-class to the button
    loadMoreWrapper.classList.add('loading');
  },

  // Display the loader inside the button
  hideLoader: function() {

    // Add the loading-class to the button
    loadMoreWrapper.classList.remove('loading');
  },

  // Disable the load-more-button
  disableButton: function() {
    loadMoreButton.setAttribute('disabled', true);
  },

  // Enable the load-more-button
  enableButton: function() {
    loadMoreButton.setAttribute('disabled', false);
  },

  // Get the next url
  next: function() {

    let nextPage = document.querySelectorAll(loadMoreNextPageSelector);
    nextPage = nextPage[nextPage.length - 1].getAttribute('data-next-page').split('?')[0];
    let searchValue = loadMoreSearchInput.value;

    if (nextPage) {
      if(searchValue){
        return nextPage + '?q=' + searchValue;
      }
      return nextPage;
    }

    // The next-url is empty
    return null;
  },

  // Hide the button if the end is reached
  hideButtonOnEnd: function() {

    // Refetch the next-url to check if this is set
    let next = paging.next();

    // Hide the button
    if (!next) {

      // Hide the load-more button
      loadMoreButton.classList.add('hide');

    } else {

      // Show the load-more button
      loadMoreButton.classList.remove('hide');

    }
  },
};

var searching = {

  search: function () {
    searching.showLoader();

    window.location.href = searching.searchUrl();
  },

  // Display the loader inside the button
  showLoader: function () {

    // Add the loading-class to the button
    loadMoreSearchForm.classList.add('loading');
  },

  // Get the next url
  searchUrl: function () {
    let currentUrl = loadMoreSearchUrl.getAttribute('data-url');
    let searchValue = loadMoreSearchInput.value;

    if (currentUrl) {
      if(searchValue){
        return currentUrl + '?q=' + searchValue;
      }
      return currentUrl;
    }

    // The next-url is empty
    return null;
  }
};

(function() {

  if(loadMoreButton) {
    // Handle clicking on the load-more button
    loadMoreButton.addEventListener('click', (e) => {
      // Prevent default behavior
      if (e.preventDefault) {
        e.preventDefault();
      }

      // Handle loading more items
      paging.more();
    });

    // On page load: check if the load-more button must be enabled
    paging.hideButtonOnEnd();

    if(loadMoreSearchForm) {
      loadMoreSearchForm.addEventListener('submit', (e) => {
        // Prevent default behavior
        if (e.preventDefault) {
          e.preventDefault();
        }

        // Handle search
        searching.search();
      });
    }
  }
})();
