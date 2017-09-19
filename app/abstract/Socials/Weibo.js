/* global WB2 */
import Log from 'tools/Log';

let isUsed = false;
let isConnected = false;

function login () {
  return new Promise((resolve, reject) => {
    if (isConnected) resolve();
    else {
      WB2.login(function () {
        resolve();
      });
    }
  });
}

function checkStatus () {
  isConnected = WB2.checkLogin();
}

function append (config) {
  return new Promise((resolve) => {
    console.log(window.location.protocol);
    async(`//tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=${config.weiboID}&debug=true`, () => {
      Log('Weibo', 'append succeed');
      resolve();
    });
  });
}

function use (config) {
  return new Promise((resolve) => {
    if (isUsed) {
      resolve(config);
    } else {
      append(config)
      // .then(() => checkStatus())
      .then(() => {
        isUsed = true;
        Log('Weibo', 'init succeed');
        resolve(config);
      });
    }
  });
}

function async (url, callback) {
  const output = document.createElement('script');
  const scripts = document.getElementsByTagName('script')[0];
  output.src = url;
  if (callback) { output.addEventListener('load', function (e) { callback(null, e); }, false); }
  scripts.parentNode.insertBefore(output, scripts);
}

function getFriends (uid) {
  return new Promise((resolve) => {
    WB2.anyWhere(function (W) {
      W.parseCMD('/friendships/friends.json', function (sResult, bStatus) {
        console.log(sResult);
        resolve(sResult);
      },
        { uid: WB2._config.uid },
        { method: 'get' }
      );
    });
  });
}

function getUser () {
  return new Promise((resolve) => {
    WB2.anyWhere(function (W) {
      W.parseCMD('/users/show.json', function (sResult, bStatus) {
        resolve(sResult);
      },
        { uid: WB2._config.uid },
        { method: 'get' }
      );
    });
  });
}

function getUserID () {
  return WB2 && WB2._config.uid;
}

export default {
  login,
  use,
  getFriends,
  getUser,
  getUserID
}
