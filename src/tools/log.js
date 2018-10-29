import Config from 'utils/Config';

export default function Log (component = 'Global', message, type = 'default') {
  if (!Config.isDev) return false;

  const TYPES = {
    DEFAULT: 'default',
    ERROR: 0,
    SUCCESS: 1
  };

  let style;

  if (type === TYPES.DEFAULT) {
    style = Config.defaultLog
  } else if (type === TYPES.SUCCESS) {
    style = Config.successLog
  } else if (type === TYPES.ERROR) {
    style = Config.errorLog
  }

  console.log(`%c[${component}] ${message}`, style);
}
