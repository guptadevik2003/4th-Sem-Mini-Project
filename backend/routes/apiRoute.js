const express = require('express')
const router = express.Router()
const multer = require('multer')

// /api
router.get('/', async (req, res) => {
  res.status(200).json({ success: true, message: `API Route Working!`, timestamp: Date.now() })
})

// /api/generator POST
router.post('/generator', multer().single('file'), async (req, res) => {
  console.log(req.body)
  console.log(req.file)
  res.json({ success: false })
})

module.exports = router
