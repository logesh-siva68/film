const jwt = require('jsonwebtoken')

const ex = module.exports

ex.createToken = async (data, secret, expIn) => {
  try {
    const singData = {
      data
    }
    if (expIn) { return await jwt.sign(singData, secret, { expiresIn: expIn }) } else return await jwt.sign(singData, secret)
  } catch (err) {
    throw Error(err)
  }
}

ex.decodeToken = async (token, secret) => {
  try {
    return await jwt.verify(token, secret)
  } catch (err) {
    throw Error(err)
  }
}
