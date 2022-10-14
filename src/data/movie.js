const db = require('./pg')
const ex = module.exports

ex.addMovie = async(body, user)=>{
    try{
        return await db.any(`insert into movies
         (name, rating, casts, genre, release_date, added_by , modified_by)
         values($1,$2,$3,$4,$5,$6,$6)
         `,
        [
            body.name,
            body.rating,
            JSON.stringify(body.casts) || null,
            body.genre,
            body.releaseDate,
             1
        ])
    }catch(err){
        throw Error(err)
    }
}

ex.getMovies = async()=>{
    try{
        return await db.any(`Select name, rating, casts, genre, release_date , id from movies`);
    }catch(err){
        throw Error(err)
    }
}

ex.updateMovie = async(body, user)=>{
    try{
        return await db.any(`update movies
         set 
         name = $2, rating = $3, casts = $4, genre = $5, release_date = $6, modified_by = $7
         where id = $1
         `,
        [
            body.id,
            body.name,
            body.rating,
             JSON.stringify(body.casts) || null,
            body.genre,
            body.releaseDate,
            user.id
        ])
    }catch(err){
        throw Error(err)
    }
}