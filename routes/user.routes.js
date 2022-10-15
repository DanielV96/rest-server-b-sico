const { Router } = require('express')
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUsersById,
} = require('../controllers/user.controller')

const router = Router()

router.get('/:id', getUsersById)

router.get('/', getUsers)

router.post('/', createUser)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)

module.exports = router
