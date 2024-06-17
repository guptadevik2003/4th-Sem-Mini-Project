const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const start = Date.now()

const functions = fs.readdirSync(path.join(__dirname, 'functions')).filter(file => file.endsWith('.js'))
for (const file of functions) {
  require(path.join(__dirname, `functions/${file}`))({ app, express })
}

// Init Functions
express.appConfig(path.join(__dirname))
express.useRoutes(path.join(__dirname, 'routes'))
express.mongooseLogin()

// Listening to PORT
const PORT = process.env.PORT || 80
app.listen(PORT, async () => {
  const expVer = JSON.parse(fs.readFileSync('package.json','utf-8')).dependencies.express.replace('^','v')
  const netIP = Object.values(require('os').networkInterfaces()).reduce((r,l)=>r.concat(l.reduce((rr,i)=>rr.concat(i.family==='IPv4'&&!i.internal&&i.address||[]),[])),[])
  
  // console.clear()
  console.log(`\n  \x1b[1;32mEXPRESS \x1b[0;32m${expVer}  \x1b[0;90mready in \x1b[1;97m${Date.now() - start} \x1b[0;97mms\n`)
  console.log(`  \x1b[0;32m➜  \x1b[1;97mLocal\x1b[0;97m:   \x1b[0;36mhttp://localhost:\x1b[1;36m${PORT}\x1b[0;36m/`)
  console.log(`  \x1b[0;32m➜  \x1b[1;97mNetwork\x1b[0;97m: \x1b[0;36mhttp://${netIP[0]}:\x1b[1;36m${PORT}\x1b[0;36m/\x1b[0;97m\n`)
})
