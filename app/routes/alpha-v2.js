const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const userProfiles = require('../data/user-profiles.js')

// *********** login routes *************

// Login page
router.get('/login', function (req, res) {
  res.render('login')
})

// Login POST - validate credentials and set session data
router.post('/login', function (req, res) {
  const username = req.body['username']
  const password = req.body['password']
  
  // Find user profile matching username
  let authenticatedUser = null
  for (const key in userProfiles) {
    if (userProfiles[key].username === username && userProfiles[key].password === password) {
      authenticatedUser = userProfiles[key]
      break
    }
  }
  
  if (authenticatedUser) {
    // Clear existing data and load authenticated user's profile
    req.session.data = {}
    Object.keys(authenticatedUser).forEach(key => {
      // Don't store password in session
      if (key !== 'password') {
        req.session.data[key] = authenticatedUser[key]
      }
    })
    // Redirect based on user role
    const userRole = authenticatedUser['user-role']
    if (userRole === 'cites') {
      res.redirect('/')
    } else {
      res.redirect('/v12/applicant-dashboard-preprod')
    }
  } else {
    // Invalid credentials - show login again with error
    res.render('login', { loginError: true })
  }
})

// Logout
router.get('/logout', function (req, res) {
  req.session.data = {}
  res.redirect('/login')
})

// Clear data
router.get('/clear-data', function (req, res) {
  req.session.data = {}
  res.redirect('/')
})

// Home page - navigation hub
router.get('/', function (req, res) {
  res.render('index')
})

// *********** v12 routes *************

// Load falcon application data helper function
function loadFalconApplicationData (req) {
  const falconApplicationData = require('../data/falcon-application-data.js')
  Object.keys(falconApplicationData).forEach(key => {
    req.session.data[key] = falconApplicationData[key]
  })
}

// Load falcon permit data helper function
function loadFalconData (req) {
  const falconData = require('../data/falcon-permit-data.js')
  Object.keys(falconData).forEach(key => {
    req.session.data[key] = falconData[key]
  })
}

// Dashboard pages

// Your submissions
router.get('/v12/your-submissions', function (req, res) {
  loadFalconData(req)
  res.render('v12/your-submissions')
})

// Falcon permit application - load specific falcon permit data
router.get('/v12/application-falcon-permit', function (req, res) {
  loadFalconApplicationData(req)
  res.render('v12/application-falcon-permit')
})

// Export falcon permit - display falcon data on form
router.get('/v12/export-falcon-permit', function (req, res) {
  loadFalconData(req)
  res.render('v12/export-falcon-permit')
})

// Export falcon permit details
router.get('/v12/export-falcon-permit-details', function (req, res) {
  loadFalconData(req)
  res.render('v12/export-falcon-permit-details')
})

// Export falcon permit summary
router.get('/v12/export-falcon-permit-summary', function (req, res) {
  loadFalconData(req)
  res.render('v12/export-falcon-permit-summary')
})

// Export falcon submission details
router.get('/v12/export-falcon-submission-details', function (req, res) {
  loadFalconData(req)
  res.render('v12/export-falcon-submission-details')
})

// Your applications
router.get('/v12/your-applications', function (req, res) {
  loadFalconData(req)
  res.render('v12/your-applications')
})




module.exports = router
