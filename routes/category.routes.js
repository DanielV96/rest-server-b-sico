const { Router } = require('express')
const { check } = require('express-validator')
const { validationResult } = require('express-validator')
const {
  getCategories,
  createCategory,
} = require('../controllers/category.contoller')
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')
const router = Router()

router.get("/",getCategories)

router.get('/:id')

router.post('/', 
[
  validateJWT,
check("name","El nombre es obligatorio").not().isEmpty(),
validateFields,
],
createCategory)

router.put('/:id')

router.delete('/:id')

module.exports = router
