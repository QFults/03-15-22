const { writeFile, readFile } = require('fs')
const router = require('express').Router()
const { join } = require('path')

// role -> boss, manager, employee, intern
// app.get('/position/:role', (req, res) => {
//   const position = roles.filter(role => role.title.toLowerCase() === req.params.role.toLowerCase())[0]
//   res.json(position)
// })

router.get('/positions', (req, res) => {
  readFile(join(__dirname, '..', 'db', 'positions.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    res.json(JSON.parse(data))
  })
})

router.post('/positions', (req, res) => {
  // console.log(req.rawHeaders)
  // console.log(req.method)
  if (req.body.title.length < 1) {
    return res.json({})
  } else {
    if (!req.body.salary) {
      req.body.salary = 0
    }
    readFile(join(__dirname, '..', 'db', 'positions.json'), 'utf8', (err, data) => {
      if (err) { console.log(err) }
      const positions = JSON.parse(data)
      positions.push(req.body)
      writeFile(join(__dirname, '..', 'db', 'positions.json'), JSON.stringify(positions), err => {
        if (err) { console.log(err) }
        res.json(req.body)
      })
    })
  }
})

module.exports = router
