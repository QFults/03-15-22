const { writeFile, readFile } = require('fs')
const express = require('express')
const { join } = require('path')

const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.get('/contact', (req, res) => {
//   res.sendFile(join(__dirname, 'public', 'contact.html'))
// })

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

// role -> boss, manager, employee, intern
// app.get('/position/:role', (req, res) => {
//   const position = roles.filter(role => role.title.toLowerCase() === req.params.role.toLowerCase())[0]
//   res.json(position)
// })

app.get('/positions', (req, res) => {
  readFile(join(__dirname, 'db', 'positions.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    res.json(JSON.parse(data))
  })
})

app.post('/positions', (req, res) => {
  // console.log(req.rawHeaders)
  // console.log(req.method)
  if (req.body.title.length < 1) {
    return res.json({})
  } else {
    if (!req.body.salary) {
      req.body.salary = 0
    }
    readFile(join(__dirname, 'db', 'positions.json'), 'utf8', (err, data) => {
      if (err) { console.log(err) }
      const positions = JSON.parse(data)
      positions.push(req.body)
      writeFile(join(__dirname, 'db', 'positions.json'), JSON.stringify(positions), err => {
        if (err) { console.log(err) }
        res.json(req.body)
      })
    })
    // writeFile('')
  }
})

app.listen(3000)
