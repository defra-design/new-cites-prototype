const express = require('express')
const router = express.Router()


router.use('/', require('./routes/beta-v7.js'))
router.use('/', require('./routes/beta-v8.js'))


module.exports = router
