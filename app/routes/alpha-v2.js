const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const userProfiles = require('../data/user-profiles.js')

// Helper function to ensure session is populated with the falcon application data
// This pulls from the session-data-defaults.js file we updated
function loadSessionData (req) {
  const sessionDataDefaults = require('../data/session-data-defaults.js')
  // We use Object.assign to merge defaults into the session without destroying 
  // the user's login state or existing profile data
  req.session.data = Object.assign({}, sessionDataDefaults, req.session.data)
}

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
      res.redirect('/v13/applicant-dashboard-preprod')
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

// *********** v13 routes (Dean Falconer Journey) *************

// Email simulation page
router.get('/v13/email-notification', function (req, res) {
  const applicantProfile = userProfiles['dean-falconer']
  res.render('v13/email-notification', { applicantProfile })
})

// Applicant dashboard - loads session data to show the active application
router.get('/v13/applicant-dashboard', function (req, res) {
  loadSessionData(req)
  const applicantProfile = userProfiles['dean-falconer']
  res.render('v13/applicant-dashboard', { applicantProfile })
})

// View the high-level submission container
router.get('/v13/view-submission', function (req, res) {
  loadSessionData(req)
  res.render('v13/view-submission')
})

// View the specific application details (Check Your Answers page)
// This uses the application.html template you provided
router.get('/v13/view-application', function (req, res) {
  loadSessionData(req)
  res.render('v13/view-application')
})

// View the APHA adjusted permit details
router.get('/v13/view-permit', function (req, res) {
  loadSessionData(req)
  res.render('v13/view-permit')
})

module.exports = router