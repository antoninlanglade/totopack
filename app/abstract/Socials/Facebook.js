/* global FB */
import Log from 'tools/Log';
import assign from 'lodash/assign';

let authResponse;
let isUsed = false;
let isConnected = false;

function append () {
  (function (d, s, id) {
    let js;
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  Log('FB', 'FB script append');
}

function init (id) {
  return new Promise((resolve, reject) => {
    append();
    window.fbAsyncInit = function () {
      FB.init({
        appId: id,
        cookie: true,
        xfbml: true,
        version: 'v2.8'
      });
      Log('FB', 'FB init succeed');
      resolve();
    };
  }).catch((err) => {
    throw new Error(err);
  });
}
function checkStatus () {
  return new Promise((resolve) => {
    FB.getLoginStatus(function (response) {
      authResponse = response.authResponse;
      if (response.status === 'connected') {
        Log('FB', 'FB already connected');
        isConnected = true;
        resolve();
      } else {
        Log('FB', 'FB aren\'t connected');
        isConnected = false;
        resolve();
      }
    });
  });
}

function login (scope) {
  return new Promise((resolve, reject) => {
    // if (isConnected) {
    //   checkStatus().then(resolve);
    // } else {
    FB.login(function (response) {
      if (response.status) {
        Log('FB', 'FB connection succeed', 1);
        checkStatus().then(resolve);
      } else {
        reject(new Error('fb-not-connected'));
      }
    }, scope);
    // }
  }).catch((err) => { throw new Error(err); });
}

function use (config) {
  return new Promise((resolve) => {
    if (isUsed) {
      resolve(config);
    } else {
      Log('FB', 'use FB');
      init(config.facebookID)
        // .then(() => checkStatus())
        .then(() => {
          isUsed = true;
          resolve(config);
        });
    }
  }).catch((err) => { throw new Error(err); });
}

function logout () {
  return new Promise((resolve) => {
    FB.getLoginStatus(function (response) {
      if (response.status === 'connected') {
        FB.logout(function (response) {
          Log('FB', 'FB logout succeed', 1);
          resolve();
        });
      } else {
        Log('FB', 'FB already logout');
      }
    });
  }).catch((err) => { throw new Error(err); });
}

function api (path, method, params) {
  return new Promise((resolve) => {
    FB.api(path, method, params, resolve);
  }).catch((err) => { throw new Error(err); });
}

function getUserID () {
  return authResponse && authResponse.userID;
}

function getAccessToken () {
  return authResponse && authResponse.accessToken;
}

function share (params) {
  FB.ui(
    assign({ method: 'feed' }, params)
  );
}

export default {
  init,
  login,
  logout,
  api,
  getUserID,
  getAccessToken,
  use,
  share
};
