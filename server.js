const express = require('express')
const { join } = require('path')

const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(require('./routes'))

// app.get('/test', (req, res) => {
//   res.send('<button>It is working!</button>')
// })

// const person = {
//   name: 'John Doe',
//   age: 40,
//   email: 'johndoe@gmail.com'
// }

// app.get('/person', (req, res) => {
//   res.json(person)
// })

app.listen(process.env.PORT || 3000)
