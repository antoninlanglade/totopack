import Config from 'config/index';

const COLORS = {
  successLog: 'background: green; color: white; display: block;',
  errorLog: 'background: red; color: white; display: block;',
  defaultLog: 'background: white; color: black; display: block;',
}

export default function Log (component = 'Global', message, type = 'default') {
  if (!Config.isDev) return false;

  const TYPES = {
    DEFAULT: 'default',
    ERROR: 0,
    SUCCESS: 1
  };

  let style;

  if (type === TYPES.DEFAULT) {
    style = COLORS.defaultLog
  } else if (type === TYPES.SUCCESS) {
    style = COLORS.successLog
  } else if (type === TYPES.ERROR) {
    style = COLORS.errorLog
  }

  console.log(`%c[${component}] ${message}`, style);
}
