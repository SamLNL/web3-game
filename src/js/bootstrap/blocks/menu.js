(function() {
console.log('hallo');
    const toggle = document.querySelector('.navbar-toggler');
    const close = document.querySelector('.navbar-side');

    if(toggle) {
        toggle.addEventListener('click', function(e){
          console.log('1');
            e.preventDefault();
            let sidebar = document.querySelector('.navbar-collapse');
            if(sidebar){
                sidebar.classList.toggle('show');
            }
        });
    }

    if(close) {
        close.addEventListener('click', function(e){
            e.preventDefault();
            let sidebar = document.querySelector('.navbar-collapse');
            if(sidebar){
                sidebar.classList.remove('show');
            }
        });
    }
})();
