const NODE_ENV = process.env.NODE_ENV || 'development'
const IS_DEV = (NODE_ENV === 'development')

const env = {
  NODE_ENV,
  IS_DEV
}

module.exports = env
