const { param } = require('../routes')
const db = require('./pg')
const ex = module.exports

ex.getUserById = async(id)=>{
    try{
        return db.any('select name, email, password from users where id = $1', [id])
    }catch(err){
        throw Error(err)
    }
}

ex.getUserByEmail = async(email)=>{
    try{
        return db.any('select name, email, password from users where id = $1', [email])
    }catch(err){
        throw Error(err)
    }
}
