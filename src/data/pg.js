const pgpLib = require('pg-promise')
const monitor = require('pg-monitor')
const promise = require('bluebird')
const logger = require('../utils/logger')

let ssl = {rejectUnauthorized: false}
// db config
const pgconfig = {
  connectionString: process.env.DBCS,
   max: 30,
   ssl:ssl
}


const options = {
  promiseLib: promise
}

monitor.attach(options) // attaching to all events;
monitor.setTheme('matrix') // changing default theme;

const pgp = pgpLib(options) // initializing pg-promise;
pgp.pg.defaults.poolSize = 100

const db = pgp(pgconfig)
module.exports = db
