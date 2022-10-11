const express = require('express')
const logger = require('./utils/logger')
const app = express()

const port = process.env.PORT || 3000

require('dotenv').config()

require('dotenv')
app.use(express.json({ limit: 500 }))
app.use(express.urlencoded({ extended: true }))

app.use('/api', require('./routes'))

app.use('/', (req, res) => {
  res.status(404).json({ status: 'error', message: 'not found' })
})

app.listen(port, () => {
  logger.info('app is up and running in port', port)
})
