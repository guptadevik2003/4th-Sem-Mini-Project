const mongoose = require('mongoose')

module.exports = ({ app, express }) => {
  express.mongooseLogin = async () => {

    mongoose.set('strictQuery', false)
    mongoose.Promise = global.Promise

    if (process.env.BUILD_MODE === 'development') {
      mongoose.connect(process.env.MONGODB_URI.replace('BUILD_MODE_VARIABLE', process.env.BUILD_MODE))      
    }
    if (process.env.BUILD_MODE === 'production') {
      mongoose.connect(process.env.MONGODB_URI.replace('BUILD_MODE_VARIABLE', process.env.BUILD_MODE))      
    }

    mongoose.connection.on('connected', async () => {
      console.log(`[${process.env.BUILD_MODE.toUpperCase()}] Connected to CertifyPro Database.`)
    })

    mongoose.connection.on('disconnected', async () => {
      console.log(`[${process.env.BUILD_MODE.toUpperCase()}] Disconnected from CertifyPro Database.`)
    })

    mongoose.connection.on('err', async (error) => {
      console.log(error)
    })

  }
}
