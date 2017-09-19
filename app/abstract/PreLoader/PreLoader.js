/* global TweenLite */

function PreLoader () {
  const $dom = document.getElementById('loader');
  const $body = document.getElementsByTagName('body')[0];

  function show () {
    return new Promise((resolve) => {
      mouseLoading(true);
      $dom.style.display = 'block';
      resolve();
    });
  }

  function mouseLoading (bool) {
    bool ? $body.classList.add('progress') : $body.classList.remove('progress');
  }

  function hide () {
    return new Promise((resolve) => {
      $dom.style.display = 'none';
      mouseLoading(false);
      resolve();
    });
  }

  return {
    show,
    hide
  }
}

export default PreLoader();
