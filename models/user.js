const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
  },

  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
  },

  Image: {
    type: String,
  },

  role: {
    type: String,
    required: [true, 'El rol es requerido'],
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
  },
  status: {
    type: Boolean,
    default: true,
  },
})

module.exports = model('users', UserSchema)
