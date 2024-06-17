const xlsx = require('xlsx')

module.exports = async (buffer) => {
  const file = xlsx.read(buffer)
  
  const sheet = file.Sheets[file.SheetNames[0]]

  return xlsx.utils.sheet_to_json(sheet).map(row => 
    Object.keys(row).reduce((obj, key) => {
      obj[key.trim()] = row[key]
      return obj;
    }, {})
  )
}
