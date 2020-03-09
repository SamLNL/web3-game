(function() {

    const toggle = document.querySelector('[data-id="menu-sidebar-toggle"]');
    const close = document.querySelector('[data-id="menu-sidebar-close"]');

    if(toggle) {
        toggle.addEventListener('click', function(e){
            e.preventDefault();
            let sidebar = document.querySelector('#menu-sidebar');
            if(sidebar){
                sidebar.classList.toggle('show');
            }
        });
    }

    if(close) {
        close.addEventListener('click', function(e){
            e.preventDefault();
            let sidebar = document.querySelector('#menu-sidebar');
            if(sidebar){
                sidebar.classList.remove('show');
            }
        });
    }

})();
