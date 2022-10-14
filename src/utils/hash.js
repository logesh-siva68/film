const ex = module.exports
const bcrypt = require('bcryptjs')

const saltUint = require('../config').salt

ex.hashStr = async (str) => {
  try {
    const salt = await bcrypt.genSalt(saltUint)
    const hash = await bcrypt.hash(str, salt)
    return hash
  } catch (err) {
    throw Error(err)
  }
}

ex.checkHashedStr = async (str,hash) => {
  try {
    return await bcrypt.compare(str, hash)
  } catch (err) {
    throw Error(err)
  }
}
