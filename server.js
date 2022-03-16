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

const roles = [
  {
    title: 'Boss',
    salary: 500000
  },
  {
    title: 'Manager',
    salary: 100000
  },
  {
    title: 'Employee',
    salary: 60000
  },
  {
    title: 'Intern',
    salary: 0
  }
]

// role -> boss, manager, employee, intern
app.get('/position/:role', (req, res) => {
  const position = roles.filter(role => role.title.toLowerCase() === req.params.role.toLowerCase())[0]
  res.json(position)
})

app.get('/positions', (req, res) => {
  res.json(roles)
})

app.post('/positions', (req, res) => {
  // console.log(req.rawHeaders)
  // console.log(req.method)
  if (!req.body.title) {
    return res.json('Please enter a valid position with a title.')
  } else {
    if (!req.body.salary) {
      req.body.salary = 0
    }
    console.log(req.body)
    roles.push(req.body)
    res.json(`${req.body.title} position successfully stored!`)
  }
})

app.listen(3000)
