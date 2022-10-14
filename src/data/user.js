const db = require('./pg')
const ex = module.exports

ex.getUserById = async(id)=>{
    try{
        return await db.any('select name, email, password from users where id = $1', [id])
    }catch(err){
        throw Error(err)
    }
}

ex.getUserByEmail = async(email)=>{
    try{
        return await db.any('select id,name, email, password from users where email = $1', [email])
    }catch(err){
        throw Error(err)
    }
}


ex.addUser = async(body)=>{
    try{
        return await db.any('insert into users(name,email,password, address) values ($1, $2, $3, $4)', [body.name, body.email, body.password, body.address || null])
    }catch(err){
        throw Error(err)
    }
}
