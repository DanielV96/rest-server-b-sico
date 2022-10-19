const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    mongoose.connect(
      process.env.MONGODB_CNN,
      { useNewUrlParser: true },
      (err, resp) => {
        if (err) throw err
        console.log('Base de datos Online')
      }
    )
  } catch (error) {
    console.log(error)
    throw new Error('Error en la conexión de la base de datos')
  }
}

module.exports = {
  dbConnection,
}
