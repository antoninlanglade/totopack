import assign from 'lodash/assign';
import without from 'lodash/without';

const $html = document.getElementsByTagName('html')[0];
let mobile;
let tablet;
let device;
let desktop;
let ie;
let safari9;
let safari;

if ($html.classList.contains('ie') || $html.classList.contains('ie11') || $html.classList.contains('edge')) {
  ie = true;
}

if ($html.classList.contains('safari')) {
  safari = true;
}

if ($html.classList.contains('safari9')) {
  safari9 = true;
}

if ($html.classList.contains('mobile')) {
  mobile = true;
  device = true;
} else if ($html.classList.contains('tablet')) {
  tablet = true;
  device = true;
} else if ($html.classList.contains('desktop')) {
  desktop = true;
}

const Config = assign({
  mobile,
  tablet,
  desktop,
  device,
  ie,
  safari,
  safari9,
  locales: window.locales,
  files: [],
  path: window.path,
  securityLang: false,
  baseDir: window.location.origin + (window.path ? window.path : '')
}, window.conf);

function getLocaleFromUrl () {
  return without(window.location.href.replace(Config.baseDir, '').split('/'), '')[0];
}

Config.urlLocale = getLocaleFromUrl();

export default Config;
