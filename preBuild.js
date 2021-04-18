/* eslint-disable no-undef */
/* eslint-disable no-console */
const buildType = process.argv.slice(2)
const title = buildType == 'phototheque' ? 'Photothèque' : 'Bibliothèque Numérique'
console.log('buildType: ', buildType)

const fs = require('fs')
let file = 'public/config.js'
let content = fs.readFileSync(file, 'utf8')
content = content.replace(/viewerType.:.*\//, `viewerType : '${buildType}/`)
content = content.replace(/title:.*'/, `title: '${title}'`)
fs.writeFileSync(file, content, 'utf8')

file = 'package.json'
content = fs.readFileSync(file, 'utf8')
content = content.replace(/"homepage": .*"/, `"homepage": "/${buildType}/"`)
fs.writeFileSync(file, content, 'utf8')
