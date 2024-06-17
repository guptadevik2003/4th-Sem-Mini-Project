const express = require('express')
const router = express.Router()
const multer = require('multer')

// Custom Modules
const parseExcel = require('../utils/parseExcel')

// /api
router.get('/', async (req, res) => {
  res.status(200).json({ success: true, message: `API Route Working!`, timestamp: Date.now() })
})

// /api/generator/preview POST
router.post('/generator/preview', async (req, res) => {
  const { template, title, description, date, signature } = req.body

  if(!template) return res.json({ success: false, error: 'Template undefined!' })
  if(Number(template)<0 || Number(template)>8) return res.json({ success: false, error: 'Template out of range!' })

  if(!title) return res.json({ success: false, error: 'Title undefined!' })
  if(!description) return res.json({ success: false, error: 'Description undefined!' })
  if(!date) return res.json({ success: false, error: 'Date undefined!' })
  if(!signature) return res.json({ success: false, error: 'Signature undefined!' })

  res.json({ success: true })
})

// /api/generator POST
router.post('/generator', multer().single('file'), async (req, res) => {
  const { template, title, description, date, signature, organization_name, event_name } = req.body
  const file = req.file

  if(!template) return res.json({ success: false, error: 'Template undefined!' })
  if(Number(template)<0 || Number(template)>8) return res.json({ success: false, error: 'Template out of range!' })

  if(!title) return res.json({ success: false, error: 'Title undefined!' })
  if(!description) return res.json({ success: false, error: 'Description undefined!' })
  if(!date) return res.json({ success: false, error: 'Date undefined!' })
  if(!signature) return res.json({ success: false, error: 'Signature undefined!' })
  if(!organization_name) return res.json({ success: false, error: 'Organization Name undefined!' })
  if(!event_name) return res.json({ success: false, error: 'Event Name undefined!' })

  if(!file) return res.json({ success: false, error: 'File not uploaded!' })
  if(!file.originalname.endsWith('.xlsx')) return res.json({ success: false, error: 'Wrong filetype uploaded (Required: .xlsx)!' })

  let students = []
  await (await parseExcel(file.buffer)).forEach(s => students.push(s.Name))

  console.log(students)

  res.json({ success: false })
})

module.exports = router
