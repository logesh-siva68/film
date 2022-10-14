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
           JSON.stringify(body.casts),
            body.genre,
            body.releaseDate,
            user.id
        ])
    }catch(err){
        throw Error(err)
    }
}

ex.getMovies = async()=>{
    try{
        return await db.any('select id, name, rating, casts, genre, release_date from movies');
    }catch(err){
        throw Error(err)
    }
}