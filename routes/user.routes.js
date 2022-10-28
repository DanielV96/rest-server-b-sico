const { Router } = require('express')
const { check } = require('express-validator')
const {
  isValiRole,
  emailExist,
  userByIdExists,
} = require('../helpers/db-validator')

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUsersById,
} = require('../controllers/user.controller')

const { isRole, validateFields, validateJWT } = require('../middlewares')

const router = Router()

router.get('/:id', getUsersById)

router.get('/', getUsers)

router.post(
  '/',
  [
    check('name', 'Nombre es requerido').not().isEmpty(),
    check('email', 'El email es requerido').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExist),
    check('password', 'Contraseña es requerida').not().isEmpty(),
    check('password', 'La contraseña debe tener 6 carácteres o más').isLength({
      min: 6,
    }),
    // check('password', 'La contraseña es débil').isStrongPassword(),
    check('role', 'El rol es requerido').not().isEmpty(),

    // check('role', 'El ROL no es válido, debe ser ADMIN_ROLE o USER_ROLE').isIn([
    //   'ADMIN_ROLE',
    //   'USER_ROLE',
    // ]),

    check('role').custom(isValiRole),

    validateFields,
  ],

  createUser
)

router.put(
  '/:id',
  [
    check('id', 'el ID no es válido').isMongoId(),
    check('id').custom(userByIdExists),

    validateFields,
  ],
  updateUser
)

router.delete(
  '/:id',
  [
    validateJWT,
    isRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'el ID no es válido').isMongoId(),
    check('id').custom(userByIdExists),
    validateFields,
  ],
  deleteUser
)

module.exports = router
