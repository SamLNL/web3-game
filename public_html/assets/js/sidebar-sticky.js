// This Sidebar needs a data-wrapper element. Data-offset is not required
let sidebar = document.querySelector('.js-sidebar-sticky');
let sidebarWrapper, startPos, sidebarOffset;
let sidebarUsps = document.querySelector('.js-sidebar-usps');

function watchSidebar() {
  const currentScrollPos = window.pageYOffset;

  if (startPos <= currentScrollPos) {
    sidebar.classList.add('sticky');
  } else {
    sidebar.classList.remove('sticky');
  }
}

(function () {
  if (sidebar) {
    sidebarOffset = sidebar.getAttribute('data-offset');

    if (!(sidebarOffset.length > 0)) {
      sidebarOffset = 0;
    } else {
      sidebarOffset = parseInt(sidebarOffset);
    }

    if (sidebar.offsetHeight + sidebarOffset >= window.innerHeight) {
      sidebarUsps.classList.add('d-none');
    }

    const sidebarWrapperSelector = sidebar.getAttribute('data-wrapper');

    if (sidebarWrapperSelector.length > 0) {
      sidebarWrapper = document.querySelector(sidebar.getAttribute('data-wrapper'));
      startPos = sidebarWrapper.offsetTop - sidebarOffset;
      watchSidebar();
      window.addEventListener('scroll', () => {
        watchSidebar();
      });
    }
  }
})();
