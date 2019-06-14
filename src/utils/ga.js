import config from 'config'
import globals from 'store/globals'
import { getGAExpire } from 'utils/cookies'

function event (action, cat, label) {
  if (!window.gtag) return
  if (globals.ga.get() === false || typeof window === 'undefined') return

  window.gtag('event', action, {
    'event_category': cat,
    'event_label': label
  })
}

function pageview (title, path) {
  if (!window.gtag) return
  if (globals.ga.get() === false || typeof window === 'undefined') return

  window.gtag('config', config.GA, {
    'page_title': title,
    'page_path': path
  });
}

function init () {
  if (!window.gtag) return
  window.gtag('js', new Date());
  window.gtag('config', `${config.GA}`, {
    'cookie_expires': getGAExpire(),
    'anonymize_ip': true,
    'forceSSL': true
  })
}

function toggle (state) {
  state ? enable() : disable()
}

globals.ga.listen(toggle)

function disable () {
  if (typeof window !== 'undefined') window[`ga-disable-${config.GA}`] = true
}

function enable () {
  if (typeof window !== 'undefined') window[`ga-disable-${config.GA}`] = false
}

export default {
  init,
  event,
  disable,
  enable,
  pageview
}
