import React, { Component } from 'react'

class CustomComponent extends Component {
  assetsToPreload = []

  bindFuncs (funcs) {
    funcs.forEach((func) => {
      this[func] = this[func].bind(this);
    });
  }

  fakeRef (props) {
    return {
      current: props
    }
  }

  createRefs (name, length) {
    this[name] = []
    for (let i = 0; i < length; i++) {
      this[name][i] = React.createRef()
    }
  }

  computeOffset (element) {
    var top = 0, left = 0
    do {
        top += element.offsetTop  || 0
        left += element.offsetLeft || 0
        element = element.offsetParent
    } while(element)

    return {
        top: top,
        left: left
    }
  }

  preload () {
    const start = Date.now()
    return this.loadAssets(this.assetsToPreload).then(() => console.log('[Preload time] ', Date.now() - start))
  }


  loadAssets (assets) {
    const promises = []
    assets.forEach(asset => promises.push(
      this.loadAsset(asset)
    ))
    return Promise.all(promises)
  }

  loadAsset (url) {
    return new Promise((resolve, reject) => {
      let asset
      if (url.match(/(.mp4|.webm)/)) {
        asset = document.createElement('video')
        asset.src = url
        asset.oncanplay = resolve
      }
      else if (url.match(/(.mp3)/)) {
        asset = document.createElement('audio')
        asset.src = url
        asset.oncanplay = resolve
      }
      else if (url.match(/(.jpg|.png|.webp|.gif)/)) {
        asset = document.createElement('img')
        asset.src = url
        asset.onload = resolve
      }
      else reject()
    })
  }
}

export default CustomComponent
