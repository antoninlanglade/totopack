import { createStore } from './state'

const store = createStore({
  // Utils
  size: { w: 0, h: 0 },
  cursorDown: { x: 0, y: 0 },
  cursorMove: { x: 0, y: 0 },
  cursorUp: { x: 0, y: 0 },

  // Signal
  fontLoaded: false,

  // GA
  ga: false

  // UI
})

export default store
