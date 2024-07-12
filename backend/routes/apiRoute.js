const express = require('express')
const router = express.Router()
const multer = require('multer')
const { PDFDocument, rgb } = require('pdf-lib')

// Custom Modules
const parseExcel = require('../utils/parseExcel')
const CertificateSchema = require('../schemas/Certificate')
const removeExtraSpace = require('../utils/removeExtraSpace')
const titleCase = require('../utils/titleCase')
const editCert = require('../utils/editCert')

// /api ==DONE==
router.get('/', async (req, res) => {
  res.status(200).json({ success: true, message: `API Route Working!`, timestamp: Date.now() })
})

// /api/generator POST ==DONE==
router.post('/generator', multer().single('file'), async (req, res) => {
  const { template, title, description, date, signature, organization_name, event_name, custom_link } = req.body
  const file = req.file

  if(!template) return res.json({ success: false, error: 'Template undefined!' })
  if(Number(template)<0 || Number(template)>8) return res.json({ success: false, error: 'Template out of range!' })

  if(!title) return res.json({ success: false, error: 'Title undefined!' })
  if(!description) return res.json({ success: false, error: 'Description undefined!' })
  if(!date) return res.json({ success: false, error: 'Date undefined!' })
  if(!signature) return res.json({ success: false, error: 'Signature undefined!' })
  if(!organization_name) return res.json({ success: false, error: 'Organization Name undefined!' })
  if(!event_name) return res.json({ success: false, error: 'Event Name undefined!' })
  if(!custom_link) return res.json({ success: false, error: 'Custom Link undefined!' })

  if(!file) return res.json({ success: false, error: 'File not uploaded!' })
  if(!file.originalname.endsWith('.xlsx')) return res.json({ success: false, error: 'Wrong filetype uploaded (Required: .xlsx)!' })

  let students = []
  await (await parseExcel(file.buffer)).forEach(s => students.push(s.Name))

  if(students.includes(undefined)) return res.json({ success: false, error: 'Error Occurred while parsing Excel, check your data and make sure there are no other columns or empty rows.' })

  let CertificateData = await CertificateSchema.findOne({ custom_link })
  if(CertificateData) return res.json({ success: false, error: 'Custom Link already exists!' })

  let newCertificateData = await CertificateSchema.create({
    template: Number(template),
    title,
    description,
    date,
    signature,
    students,
    organization_name,
    event_name,
    custom_link,
  })

  await newCertificateData.save().catch(err => {
    console.log(err)
    return res.json({ success: false, error: 'Error while saving data to Database!' })
  })

  res.json({ success: true, data: newCertificateData })
})

// /api/generator/preview POST ==DONE==
router.post('/generator/preview', async (req, res) => {
  let { template, title, description, date, signature } = req.body

  if(!template) return res.json({ success: false, error: 'Template undefined!' })
  if(Number(template)<0 || Number(template)>8) return res.json({ success: false, error: 'Template out of range!' })

  if(!title) return res.json({ success: false, error: 'Title undefined!' })
  if(!description) return res.json({ success: false, error: 'Description undefined!' })
  if(!date) return res.json({ success: false, error: 'Date undefined!' })
  if(!signature) return res.json({ success: false, error: 'Signature undefined!' })

  let certImg = await editCert({ template, title, description, date, signature })

  let certImgBase64 = certImg.toString('base64')

  res.json({ success: true, data: certImgBase64 })
})

// /api/generator/verify-link POST ==DONE==
router.post('/generator/verify-link', async (req, res) => {
  const { custom_link } = req.body

  if(!custom_link) return res.json({ success: false, error: 'Custom Link undefined!' })

  let CertificateData = await CertificateSchema.findOne({ custom_link })

  if(CertificateData) {
    res.json({ success: true, verified: false })
  } else {
    res.json({ success: true, verified: true })
  }
})

// /api/certificates/:custom_link ==DONE==
router.get('/certificates/:custom_link', async (req, res) => {
  const { custom_link } = req.params
  
  let CertificateData = await CertificateSchema.findOne({ custom_link })
  if(!CertificateData) return res.json({ success: false, error: 'Custom Link does not exist!' })
    
  res.json({ success: true, data: CertificateData })
})

// /api/certificates/:custom_link/download POST ==DONE==
router.post('/certificates/:custom_link/download', async (req, res) => {
  const { custom_link } = req.params
  let { student, fileType } = req.body;

  if(!student) return res.json({ success: false, error: "student undefined!" })
  if(!fileType) return res.json({ success: false, error: "fileType undefined!" })
  if(!["pdf","png"].includes(fileType)) return res.json({ success: false, error: "Wrong fileType!" })

  let CertificateData = await CertificateSchema.findOne({ custom_link })
  if(!CertificateData) return res.json({ success: false, error: 'Custom Link does not exist!' })

  if(!CertificateData.students.includes(student)) return res.json({ success: false, error: "Student not allowed for this certificate!" })

  student = removeExtraSpace(student)
  student = titleCase(student)

  let certImg = await editCert({
    template: CertificateData.template,
    title: CertificateData.title,
    name: student,
    description: CertificateData.description,
    date: CertificateData.date,
    signature: CertificateData.signature,
  })

  if(fileType === 'png') return res.json({
    success: true,
    data: certImg.toString('base64'),
    fileName: `${student}.png`,
  });

  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([2000,1414])

  const imageEmbed = await pdfDoc.embedPng(certImg)
  const { width, height } = imageEmbed.scaleToFit(page.getWidth(), page.getHeight())

  page.drawImage(imageEmbed, {
    x: page.getWidth() / 2 - width / 2,
    y: page.getHeight() / 2 - height / 2,
    width,
    height,
    color: rgb(1,1,1),
  })

  const pdfBytes = await pdfDoc.save()

  let base64 = Buffer.from(pdfBytes).toString('base64')

  return res.json({
    success: true,
    data: base64,
    fileName: `${student}.pdf`,
  })
})
  
module.exports = router
