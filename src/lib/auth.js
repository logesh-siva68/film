const ex = module.exports
const JOI = require('joi')
const db = require('../data/user')
const hash = require('../utils/hash')
const jwt = require('../utils/jwt')
const config  =require('../config')

ex.login = async (req, res) => {

  try{
    const getUser = await verifyUser(req.body)
    if(getUser.isAuthUser){
      const token = await jwt.createToken(getUser.data,  config.jwtUserSec, '3h')
      res.status(200).json({status:'ok', result:{token:token, ...getUser.data}})
    } else throw "somwthing wrong"
  }catch(err){
    res.status(err.httpStatusCode || 500).json({status:'error', error: err.message || "internal server error"})
  }
  
}

ex.loginValidate = (req) => {
  const schema  = JOI.object({
    email: JOI.string().email().required(),
    password: JOI.string().required()
  }).validate(req.body, {allowUnknown:true})
  return schema
}

ex.register = async (req, res) => {
  try{
    req.body.password = await hash.hashStr(req.body.password)
    await db.addUser(req.body)
    res.status(201).json({"status":"ok", result:"Registration done!"})
  }catch(err){
    res.status(err.httpStatusCode || 500).json({status:'error', error: err.message || "internal server error"})
  }
  
}

ex.registerValidate = (req) => {
  const schema = JOI.object({
    name:JOI.string().required(),
    address:JOI.object(),
    email:JOI.string().email().required(),
    password: JOI.string().max(16).min(8).required()  }).validate(req.body, {allowUnknown:true})
    return schema
}

async function verifyUser(user){
  try{
    let getUser = await db.getUserByEmail(user.email);
  if(getUser && await hash.checkHashedStr(user.password, getUser[0].password)){
    delete getUser[0].password;
    return {data: getUser[0], isAuthUser: true}
  }
  return {isAuthUser:false}
  } catch (err){
    throw Error(err)
  }
}