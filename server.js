const express = require('express')
const { join } = require('path')

const app = express()

app.use(express.static(join(__dirname, 'public')))

app.get('/contact', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'contact.html'))
})

app.get('/test', (req, res) => {
  res.send('It is working!')
})

app.listen(3000)
