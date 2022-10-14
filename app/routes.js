const express = require('express')
const router = express.Router()

// Are you applying on behalf of someone else
router.post('/v7/are-you-applying-on-behalf-of-someone-else', function (req, res) {
if (req.session.data['isAgent'] == 'yes') {
  res.redirect('enter-your-contact-details-agent')
} else {
  res.redirect('enter-your-contact-details-applicant')
}
})

// Confirm applicants international address
router.post('/v7/confirm-applicants-international-address', function (req, res) {
  res.redirect('what-is-the-name-of-the-species')
})

// Confirm delivery address
router.post('/v7/confirm-delivery-address', function (req, res) {
  res.redirect('what-is-the-name-of-the-species')
})

// Confirm your address agent
router.post('/v7/confirm-your-address-agent', function (req, res) {
  res.redirect('enter-your-contact-details-agent-led')
})

// Confirm your address agent led
router.post('/v7/confirm-your-address-agent-led', function (req, res) {
  if (req.session.data['delivery-address'] == 'delivery-address-3') {
    res.redirect('enter-delivery-address') }
    else {
    res.redirect('what-is-the-name-of-the-species')
  }
})

// Confirm your address applicant
router.post('/v7/confirm-your-address-applicant', function (req, res) {
  if (req.session.data['delivery-address-applicant'] == 'delivery-address-2-applicant') {
    res.redirect('enter-delivery-address') }
    else {
    res.redirect('what-is-the-name-of-the-species')
  }
})

// Enter an international address
router.post('/enter-an-international-address', function (req, res) {
  res.redirect('confirm-applicants-international-address')
})

// Enter delivery address
router.post('/enter-delivery-address', function (req, res) {
  res.redirect('confirm-delivery-address')
})

// Enter your address manually - agent
router.post('/enter-your-address-manually-agent', function (req, res) {
  res.redirect('confirm-your-address-agent')
})

// Enter your address manually - agent led
router.post('/enter-your-address-manually-agent-led', function (req, res) {
  res.redirect('confirm-your-address-agent-led')
})

// Enter your address manually - applicant
router.post('/enter-your-address-manually-applicant', function (req, res) {
  res.redirect('confirm-your-address-applicant')
})


// Enter your contact details agent
router.post('/v7/enter-your-contact-details-agent', function (req, res) {
  res.redirect('what-is-your-address-agent')
})

// Enter your contact details agent led
router.post('/v7/enter-your-contact-details-agent-led', function (req, res) {
  res.redirect('what-is-your-address-agent-led')
})

// Enter your contact details applicant
router.post('/v7/enter-your-contact-details-applicant', function (req, res) {
  res.redirect('what-is-your-address-applicant')
})

// Select your address agent
router.post('/v7/select-your-address-agent-led', function (req, res) {
  res.redirect('confirm-your-address-agent-led')
})

// Select your address agent led
router.post('/v7/select-your-address-agent', function (req, res) {
  res.redirect('confirm-your-address-agent')
})

// Select your address applicant
router.post('/v7/select-your-address-applicant', function (req, res) {
  res.redirect('confirm-your-address-applicant')
})

// What is the name of the species
router.post('/v7/what-is-the-name-of-the-species', function (req, res) {
  res.redirect('where-did-you-source-your-specimen-from')
})

// What is your address agent
router.post('/v7/what-is-your-address-agent', function (req, res) {
  res.redirect('select-your-address-agent')
})

// What is your address agent led
router.post('/v7/what-is-your-address-agent-led', function (req, res) {
  res.redirect('select-your-address-agent-led')
})

// What is your address applicant
router.post('/v7/what-is-your-address-applicant', function (req, res) {
  res.redirect('select-your-address-applicant')
})

// What type of permit or certificate are you applying for
router.post('/v7/what-type-of-permit-or-certificate-are-you-applying-for', function (req, res) {
  let permitType = req.session.data['permitType']
  if (permitType === 'import') {
    res.redirect('are-you-applying-on-behalf-of-someone-else')
  }
  if (permitType === 'export') {
    res.redirect('are-you-applying-on-behalf-of-someone-else')
  }
  if (permitType === 're-export') {
    res.redirect('are-you-applying-on-behalf-of-someone-else')
  }
  if (permitType === 'A10') {
    res.redirect('what-will-you-use-the-certificate-for')
  }
  if (permitType === 'other') {
    res.redirect('you-cannot-use-this-service-yet')
  }
})

// What will you use the certificate for
router.post('/v7/what-will-you-use-the-certificate-for', function (req, res) {
  res.redirect('are-you-applying-on-behalf-of-someone-else')
})

// What will you use the permit for
router.post('/v7/what-will-you-use-your-permit-for', function (req, res) {
  res.redirect('#')
})

// Where did you source the specimen from
router.post('/v7/where-did-you-source-your-specimen-from', function (req, res) {
  res.redirect('what-will-you-use-your-permit-for')
})


module.exports = router
