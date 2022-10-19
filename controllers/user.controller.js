const { request, response } = require('express')
const User = require('../models/user')

const getUsersById = (req = request, res = response) => {
  //Url/api/users/?name=Daniel..
  const id = req.params.id
  res.json({
    msg: 'Usuario por id - Get-Controller ',
    id,
  })
}

const getUsers = (req = request, res = response) => {
  const { name, date } = req.query

  res.status(200).json({
    msg: 'Get-Controller',
    name,
    date,
  })
}

const createUser = async (req = request, res = response) => {
  //Url/api/users-> Body: Es el objeto en JSON

  const body = req.body
  const user = new User(body)
  await user.save()
  res.status(201).json({
    msg: 'post API - Controller',
    user,
  })
}

const updateUser = (req = request, res = response) => {
  //Url/api/users/26-> segmento: el 26 entra en el id

  const id = req.params.id
  const body = req.body
  res.json({
    msg: 'put API - Controller',
    id,
    body,
  })
}

const deleteUser = (req = request, res = response) => {
  const id = req.params
  res.json({
    msg: 'delete API - Controller',
    id,
  })
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUsersById,
}
