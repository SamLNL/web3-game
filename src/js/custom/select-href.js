const selectHref = document.querySelectorAll('.js-select-href');

[].forEach.call(selectHref, function(el) {
  el.addEventListener('change', (el) => {

    const url = el.currentTarget.options[el.currentTarget.selectedIndex].value;
    if(url.length > 0) {
      window.location.href = url;
    }
  });
});
