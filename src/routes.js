const router = require('express').Router()
const schemaValidation = require('./utils/validateFn')
const auth = require('./lib/auth')
const movie = require('./lib/movie')
const jwt = require('./utils/jwt')
const config = require('./config')

router.post('/login', schemaValidation(auth.loginValidate), auth.login)
router.post('/register', schemaValidation(auth.registerValidate), auth.register)
router.use('*',authUser)
router.post('/add-movie', schemaValidation(movie.validateAddMovie), movie.addMovie)
router.put('/update-movie', schemaValidation(movie.validateUpdateMovie), movie.updateMovie)
router.get('/movies',movie.getMovies)


async function authUser(req,res,next){

    try{
        console.log("token------>",req.body.token || req.query.token)
        const decode = await jwt.decodeToken((req.body.token || req.query.token), config.jwtUserSec)
        req.user = decode.data
        console.log("in auth function", req.user)
        next()
    }catch(err){
        
        res.status(403).json({"status":"error", message:"forbidden !!"})
    }
}
module.exports = router
