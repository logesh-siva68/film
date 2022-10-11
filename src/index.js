const express = require('express')
const logger = require('./utils/logger')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3001



require('dotenv')
app.use(express.json({ limit: 500 }))
app.use(express.urlencoded({ extended: true }))

app.use('/', require('./routes'))

app.use('/', (req, res) => {
  res.status(404).json({ status: 'error', message: 'not found' })
})

app.listen(port, () => {
  logger.info('app is up and running in port', port)
})
