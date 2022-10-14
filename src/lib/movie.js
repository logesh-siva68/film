const Joi = require("joi")
const db = require("../data/movie")
const ex = module.exports

ex.addMovie = async(req,res)=>{
    try{
        await db.addMovie(req.body, req.user);
        res.status(201).json({"status":"ok", result:"Movie Added!"})
    }catch(err){
        res.status(err.httpStatusCode || 500).json({status:'error', error: err.message || "internal server error"})
    }
}

ex.validateAddMovie = async(req)=>{
    const schema = Joi.object({
        name : Joi.string().required(),
        rating: Joi.number(),
        casts:Joi.array().required(),
        genre:Joi.string(),
        releaseDate:Joi.date(),
        token: Joi.string().required()
    }).validate(req.body, {allowUnknown:true})
    return schema
}

ex.getMovies = async(req,res)=>{
     try{
        res.status(201).json({"status":"ok", result:await db.getMovies()})
    }catch(err){
        res.status(err.httpStatusCode || 500).json({status:'error', error: err.message || "internal server error"})
    }
}