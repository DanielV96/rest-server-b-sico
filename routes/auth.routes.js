const { Router } = require('express')
const { check } = require('express-validator')
const { login } = require('../controllers/auth.controller')

const { emailExist } = require('../helpers/db-validator')
const { validateFields } = require('../middlewares/validate-fields')

const router = Router()

router.post(
  '/login',
  [
    check('email', 'el email es requerido').not().isEmpty(),
    check('password', 'el password es requerido').not().isEmpty(),
    validateFields,
  ],
  login
)

module.exports = router
