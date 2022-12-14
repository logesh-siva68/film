const schemaValidation = validationFn => {
  return (req, res, next) => {
    const result = validationFn(req)
    console.log("result------>",result)
    if (result && result.error) {
      const error = new Error(result.error)
      res.status(400).json({ status: 'error', message: error.message }).send()
    } else next()
  }
}
module.exports = schemaValidation
