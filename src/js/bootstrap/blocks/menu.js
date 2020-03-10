(function() {
    const toggle = document.querySelector('.navbar-toggler');
    const close = document.querySelector('.navbar-side-close');

    if(toggle) {
        toggle.addEventListener('click', function(e){
            e.preventDefault();
            let sidebar = document.querySelector('.navbar-side');
            if(sidebar){
                sidebar.classList.toggle('show');
            }
        });
    }

    if(close) {
        close.addEventListener('click', function(e){
            e.preventDefault();
            let sidebar = document.querySelector('.navbar-side');
            if(sidebar){
                sidebar.classList.remove('show');
            }
        });
    }
})();
