const router = require('express').Router()

router.use('/', require('./viewRoutes.js'))
router.use('/api', require('./positionRoutes.js'))

module.exports = router
