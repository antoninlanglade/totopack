const php = require('..')
const server = php({ host: 'impossible', autorestart: true })

server.on('start', err => {
  console.log('Server started')
})

server.on('error', err => {
  console.log('ERROR:', err)
})

server.on('close', err => {
  console.log('Server closed')
})

server.start()
