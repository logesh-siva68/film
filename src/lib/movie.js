const JOI = require("joi")
const db = require("../data/movie")
const ex = module.exports
const moment = require('moment')
ex.addMovie = async(req,res)=>{
    if(!req.user) req.user = {};
    req.user.id = 1
    try{
        await db.addMovie(req.body, req.user);
        res.status(201).json({"status":"ok", result:"Movie Added!"})
    }catch(err){
        res.status(err.httpStatusCode || 500).json({status:'error', error: err.message || "internal server error"})
    }
}

ex.validateAddMovie = (req)=>{
    if(!req.body.releaseDate)
    req.body.releaseDate = req.body.release_date 
   
    console.log(req.body);
    const schema = JOI.object({
        name : JOI.string().required(),
        rating: JOI.number().required(),
       // casts:JOI.array().required(),
        genre:JOI.string(),
        releaseDate:JOI.date(),
        token: JOI.string().required()
    }).validate(req.body, {allowUnknown:true})
    return schema
}



ex.getMovies = async(req,res)=>{
     try{
        const result = await db.getMovies()
        result.forEach((i)=>{
            i.release_date = moment(i.release_date).format('YYYY/MM/DD')
        })
        res.status(201).json({"status":"ok", result:result})
    }catch(err){
        res.status(err.httpStatusCode || 500).json({status:'error', error: err.message || "internal server error"})
    }
}


ex.updateMovie = async(req,res)=>{
    try{
        await db.updateMovie(req.body, req.user);
        res.status(201).json({"status":"ok", result:"Movie updated!"})
    }catch(err){
        res.status(err.httpStatusCode || 500).json({status:'error', error: err.message || "internal server error"})
    }
}


ex.validateUpdateMovie = (req)=>{
    if(!req.body.releaseDate)
    req.body.releaseDate = req.body.release_date
    const schema = JOI.object({
        id: JOI.number().required(),
        name : JOI.string().required(),
        rating: JOI.number(),
        casts:JOI.array().required(),
        genre:JOI.string(),
        releaseDate:JOI.date(),
        token: JOI.string().required()
    }).validate(req.body, {allowUnknown:true})
    return schema
}