const Role = require('../models/role')
const User = require('../models/user')

const isValiRole = async (role = '') => {
  const existRole = await Role.findOne({ role })
  if (!existRole) {
    throw new Error(`El rol ${role} no existe en la base de datos`)
  }
}

const emailExist = async (email = '') => {
  const user = await User.findOne({ email })
  if (user) {
    throw new Error(`El correo asisgando ya existe`)
  }
}

const userByIdExists = async (id = '') => {
  const user = await User.findById(id)
  if (!user) {
    throw new Error(`El usuario con id ${id} no existe en la base de datos`)
  }
}

module.exports = {
  isValiRole,
  emailExist,
  
  userByIdExists,
}
