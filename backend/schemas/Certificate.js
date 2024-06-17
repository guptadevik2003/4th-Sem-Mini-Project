const { Schema, model } = require('mongoose')

const CertificateSchema = new Schema({

  template: Number,
  title: String,
  description: String,
  date: String,
  signature: String,
  students: Array,
  organization_name: String,
  event_name: String,
  custom_link: String,

}, { timestamps: true })

module.exports = model('Certificate', CertificateSchema, 'Certificates')
