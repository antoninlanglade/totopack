import PIXI from 'tools/PixiMiddleware';
import without from 'lodash/without';
import forEach from 'lodash/forEach';

export default class PixiContainer extends PIXI.Container {
  constructor () {
    super();
    this.displayObjects = [];
    this.resize = this.resize.bind(this);
    this.update = this.update.bind(this);
    this.dispose = this.dispose.bind(this);
  }

  addDisplayObject (child) {
    this.displayObjects.push(child);
  }

  removeChild (child) {
    super.removeChild(child);
    if (child) {
      child.dispose && child.dispose();
      this.displayObjects = without(this.displayObjects, child);
    }
  }

  removeChildAt (index) {
    let child = this.getChildAt(index);
    super.removeChildAt(index);
    if (child) {
      child.dispose && child.dispose();
      this.displayObjects = without(this.displayObjects, child);
    }
  }

  draw () {
    forEach(this.displayObjects, (object) => {
      object.draw && object.draw();
    });
  }

  update () {
    forEach(this.displayObjects, (object) => {
      object.update && object.update();
    });
  }

  resize (size) {
    forEach(this.displayObjects, (object) => {
      object.resize && object.resize(size);
    });
  }

  dispose () {
    forEach(this.displayObjects, (object) => {
      this.removeChild(object);
    });
    this.displayObjects = [];
    this.destroy();
  }
}
