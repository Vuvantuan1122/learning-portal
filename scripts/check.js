const fs = require('fs')
const path = require('path')

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname,'..','package.json'),'utf8'))
console.log('Package:', packageJson.name)
