const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((req, res) => {
const file = req.url === '/' ? 'index.html' : req.url
const filePath =  path.join(__dirname, 'public', file)
const extName = path.extname(filePath)

const allowedFileType = ['.html','.css','.js']
const allowed = allowedFileType.find(item => item == extName)

if(!allowed) return

fs.readFile(
   filePath,
    (err, content) => {
        if(err) throw err

        res.end(content)
    }
)
}).listen(3333, () => { console.log('YEP!!! Server is running') })
