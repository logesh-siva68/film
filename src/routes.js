const router = require('express').Router()
const schemaValidation = require('./utils/validateFn')
const auth = require('./lib/auth')

router.post('/login', schemaValidation(auth.loginValidate), auth.login)
router.post('/register', schemaValidation(auth.registerValidate), auth.register)

module.exports = router
