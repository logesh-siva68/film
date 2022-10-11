const ex = module.exports
const { string } = require('joi')
const JOI = require('joi')

ex.login = async (req, res) => {
  res.status(200).json({ status: 'ok', result: 'login success' })
}

ex.loginValidate = (req) => {
  const schema  = JOI.object({
    email: JOI.email().required(),
    password: JOI.string().required()
  }).validate(req.body, {allowUnknown:true})
  return schema
}

ex.register = async (req, res) => {
  res.status(200).json({ status: 'ok', result: 'register success' })
}

ex.registerValidate = (req) => {
  const schema = JOI.object({
    name:JOI.string().required(),
    address:JOI.object(),
    email:JOI.email().required(),
    password: JOI.string().max(16).min(8).required()  }).validate(req.body, {allowUnknown:true})
    return schema
}
