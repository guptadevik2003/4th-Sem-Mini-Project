const express = require('express')
const router = express.Router()

// /temp
router.get('/temp', async (req, res) => {
  res.send('Hello World!<br>Temp Page!')
})

module.exports = router
