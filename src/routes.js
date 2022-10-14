const router = require('express').Router()
const schemaValidation = require('./utils/validateFn')
const auth = require('./lib/auth')
const movie = require('./lib/movie')
const jwt = require('./utils/jwt')
const config = require('./config')

router.post('/login', schemaValidation(auth.loginValidate), auth.login)
router.post('/register', schemaValidation(auth.registerValidate), auth.register)
router.use('/',authUser)
router.post('/add-movie', schemaValidation(movie.validateAddMovie), movie.addMovie)
router.get('/moveis',movie.getMovies)


async function authUser(req,res,next){

    try{
        const decode = await jwt.decodeToken(req.body.token || req.query.token, config.jwtUserSec)
        req.user = decode
        console.log("in auth function")
        next()
    }catch(err){
        res.status(403).json({"status":"error", message:"forbidden !!"})
    }
}
module.exports = router
