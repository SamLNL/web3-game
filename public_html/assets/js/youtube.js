function handleYoutubeGDPR(event) {
  if (!event.preventDefault()) {
    event.returnValue = false;
  }

  let request;

  if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  }

  request.open('POST', '/actions/gdpr/site/cookies', true);
  let formData = new FormData(event.target);
  request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  request.send(formData); // param string only used for POST

  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      let response = JSON.parse(request.response);

      if (typeof response.cookies !== 'undefined') {
        if (response.cookies.youtube) {
          // Get all the youtube videos on this page
          let youtubeVideos = document.querySelectorAll('.js-youtube'); // Let's find the video and add the autoplay before loading the youtube api

          for (let j = 0; j < youtubeVideos.length; j++) {
            if (youtubeVideos[j].getAttribute('data-url') === event.target.getAttribute('data-youtubeid')) {
              youtubeVideos[j].setAttribute('data-autoplay', 'true');
            }
          }

          let tag = document.createElement('script');
          tag.src = '//www.youtube.com/iframe_api';
          let firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          let overlays = document.querySelectorAll('.c-youtube__player__overlay');
          let gdprs = document.querySelectorAll('.c-youtube__player__gdpr');
          [].forEach.call(overlays, el => {
            el.remove();
          });
          [].forEach.call(gdprs, el => {
            el.remove();
          });
        }
      }
    }
  };
}

function addYoutubeGdprListener(element) {
  element.addEventListener('submit', handleYoutubeGDPR);
}

let youtubeGdprForms = document.querySelectorAll('.js-youtube-gdpr-form');

if (youtubeGdprForms.length) {
  for (let i = 0; i < youtubeGdprForms.length; i++) {
    addYoutubeGdprListener(youtubeGdprForms[i]);
  }
}
