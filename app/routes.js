const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


router.use('/', require('./routes/beta-v7.js'))
router.use('/', require('./routes/beta-v8.js'))
router.use('/', require('./routes/beta-v9.js'))
router.use('/', require('./routes/beta-v10.js'))
router.use('/', require('./routes/beta-v11.js'))
router.use('/', require('./routes/alpha-v14.js'))


module.exports = router