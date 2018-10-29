import waterfall from 'run-waterfall';

export default class Main {
  constructor (conf) {
    this.bundles = [];
    this.config = conf;
  }

  use (bundle) {
    this.bundles.push(
      (next) => {
        if (bundle.use) bundle.use(this.config).then(() => next());
        else if (bundle.then) bundle().then(() => next());
        else next();
      }
    );
    return this;
  }

  start (cb) {
    waterfall(this.bundles, cb);
  }
}
