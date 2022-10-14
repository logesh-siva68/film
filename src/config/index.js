require('dotenv').config()

const config = {
  salt: 10,
  jwtUserSec : process.env.secret
}
module.exports = config
