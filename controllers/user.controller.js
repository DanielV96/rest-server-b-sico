const { request, response } = require('express')
const bcryptjs = require('bcryptjs')

const User = require('../models/user')

const getUsersById = (req = request, res = response) => {
  //Url/api/users/?name=Daniel..
  const id = req.params.id
  res.json({
    id,
  })
}

const getUsers = async (req = request, res = response) => {
  try {
    let { from = 0, lot = 5 } = req.query
    from = from <= 0 || isNaN(from) ? 0 : from - 1

    const query = { status: true }

    const [users, total] = await Promise.all([
      User.find(query).skip(from).limit(lot),
      User.countDocuments(query),
    ])

    res.status(200).json({
      total,
      quantity: users.length,
      users,
      from: from + 1,
      lot: Number(lot),
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

const createUser = async (req = request, res = response) => {
  //Url/api/users-> Body: Es el objeto en JSON
  try {
    const { name, email, password, role } = req.body
    const user = new User({ name, email, password, role })

    //Verificar si el correo ya existe en la BD

    user.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync())

    await user.save()

    res.status(201).json({
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

const updateUser = async (req = request, res = response) => {
  //Url/api/users/26-> segmento: el 26 entra en el id
  try {
    const id = req.params.id
    const { password, ...data } = req.body

    if (password) {
      data.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync())
    }
    const user = await User.findByIdAndUpdate(id, data, { new: true })

    res.json({
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

const deleteUser = async (req = request, res = response) => {
  try {
    const { id } = req.params

    //Borrar fisico de la BD

    // const deleteUser = await User.findByIdAndDelete(id)

    //Borrado suave

    const deleteUser = await User.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    )

    res.json({
      deleteUser,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUsersById,
}
