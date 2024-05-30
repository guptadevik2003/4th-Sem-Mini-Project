const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const functions = fs.readdirSync(path.join(__dirname, 'functions')).filter(file => file.endsWith('.js'))
for (const file of functions) {
  require(path.join(__dirname, `functions/${file}`))({ app, express })
}

// Init Functions
express.appConfig(path.join(__dirname))
express.useRoutes(path.join(__dirname, 'routes'))

// Listening to PORT
const port = process.env.PORT || 80
app.listen(port, async () => {
  console.log(`[${process.env.BUILD_MODE.toUpperCase()}] Server listening on port ${port}`)
})
