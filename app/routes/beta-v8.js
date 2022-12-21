const express = require('express')
const router = express.Router()

// *********** v8 routes *************

// Account no applications
router.post('/v8/account-no-applications', function (req, res) {
  res.redirect('what-type-of-permit-or-certificate-are-you-applying-for')
})

// Add comments
router.post('/v8/add-comments', function (req, res) {

  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('manage-application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('manage-application-new')
  }

else {
res.redirect('file-upload')
}
})


// Application complete
router.post('/v8/application-complete', function (req, res) {
  res.redirect('#')
})

// Are you applying on behalf of someone else
router.post('/v8/are-you-applying-on-behalf-of-someone-else', function (req, res) {
if (req.session.data['isAgent'] == 'yes') {
  res.redirect('enter-your-contact-details-agent')
} else {
  res.redirect('enter-your-contact-details-applicant')
}
})

// Check your answers
router.post('/v8/check-your-answers', function (req, res) {
  req.session.data['fromPage'] = 'cya'

  if (req.session.data['specimenCount'] == req.session.data['quantity']) {
    res.redirect('declaration')
} else {
    req.session.data['specimenCount'] = req.session.data['specimenCount'] + 1
    res.redirect('check-your-answers')
}
})

// Check your answers reuse
router.post('/v8/check-your-answers-reuse', function (req, res) {
  res.redirect('declaration')
})

// Confirm applicants international address
// router.post('/v8/confirm-applicants-international-address', function (req, res) {
//   res.redirect('what-is-the-name-of-the-species')
// })

// Choose delivery address
router.post('/v8/choose-delivery-address', function (req, res) {
  if (req.session.data['delivery-address'] == 'delivery-address-1') {
    if (req.session.data['fromPage'] == 'cya') {
      res.redirect('check-your-answers') }
    else {
      res.redirect('what-is-the-name-of-the-species')
    }
  }

  if (req.session.data['delivery-address'] == 'delivery-address-2') {
    if (req.session.data['fromPage'] == 'cya') {
      res.redirect('check-your-answers') }
    else {
      res.redirect('what-is-the-name-of-the-species')
    }
  }

  if (req.session.data['delivery-address'] == 'delivery-address-3') {
      res.redirect('what-is-the-delivery-address')
    }
})

// Confirm delivery address
router.post('/v8/confirm-delivery-address', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
    res.redirect('check-your-answers')
  }
  else
  res.redirect('what-is-the-name-of-the-species')
})

// Confirm the address
router.post('/v8/confirm-the-address', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('manage-application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('manage-application-new')
  }

  if (req.session.data['isAgent'] == 'yes') {
  res.redirect('what-is-your-address-agent-led')
  }
  else {
  res.redirect('what-is-the-name-of-the-species')
}
})

// Confirm your address agent
router.post('/v8/confirm-your-address-agent', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('manage-application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('manage-application-new')
  }

else {
  res.redirect('enter-your-contact-details-agent-led')
}
})

// Confirm your address agent led
router.post('/v8/confirm-your-address-agent-led', function (req, res) {

  // if (req.session.data['delivery-address'] == 'delivery-address-1') {
  //   if (req.session.data['fromPage'] == 'cya') {
  //     res.redirect('check-your-answers') }
  //   else {
  //     res.redirect('what-is-the-name-of-the-species')
  //   }
  // }
  //
  // if (req.session.data['delivery-address'] == 'delivery-address-2') {
  //   if (req.session.data['fromPage'] == 'cya') {
  //     res.redirect('check-your-answers') }
  //   else {
  //     res.redirect('what-is-the-name-of-the-species')
  //   }
  // }
  //
  // if (req.session.data['delivery-address'] == 'delivery-address-3') {
  //     res.redirect('what-is-the-delivery-address')
  //   }

    res.redirect('choose-delivery-address')
  })

// Confirm your address applicant
router.post('/v8/confirm-your-address-applicant', function (req, res) {

//   if (req.session.data['delivery-address-applicant'] == 'delivery-address-1-applicant') {
//     if (req.session.data['fromPage'] == 'cya') {
//     res.redirect('check-your-answers')
//   }
// }
//
//     if (req.session.data['delivery-address-applicant'] == 'delivery-address-2-applicant') {
//       if (req.session.data['fromPage'] == 'cya') {
//       res.redirect('enter-address-manually')
//     }
//   }
//
//     if (req.session.data['fromPage'] == 'manageApplication') {
//     res.redirect('manage-application')
//     }
//
//     if (req.session.data['fromPage'] == 'manageApplicationNew') {
//     res.redirect('manage-application-new')
//     }

    // if (req.session.data['address-applicant'] == 'address-1-applicant') {
    //   res.redirect('what-is-the-name-of-the-species')
    // }
    //
    // if (req.session.data['address-applicant'] == 'address-2-applicant') {
    //   res.redirect('what-is-the-delivery-address')
    // }
    res.redirect('choose-delivery-address')

  })

// Copy application
router.post('/v8/copy-application', function (req, res) {
  res.redirect('file-upload')
})

// Declaration
router.post('/v8/declaration', function (req, res) {
  res.redirect('application-complete')
})

// Enter an international address
// router.post('/v8/enter-an-international-address', function (req, res) {
//   res.redirect('confirm-applicants-international-address')
// })

// Enter delivery address manually
router.post('/v8/enter-delivery-address-manually', function (req, res) {
  res.redirect('confirm-delivery-address')
})

// Enter address manually
router.post('/v8/enter-address-manually', function (req, res) {
  res.redirect('confirm-the-address')
})

// Enter your address manually - agent
router.post('/v8/enter-your-address-manually-agent', function (req, res) {
  res.redirect('confirm-your-address-agent')
})

// Enter your address manually - agent led
router.post('/v8/enter-your-address-manually-agent-led', function (req, res) {
  res.redirect('confirm-your-address-agent-led')
})

// Enter your address manually - applicant
router.post('/v8/enter-your-address-manually-applicant', function (req, res) {
  res.redirect('confirm-your-address-applicant')
})


// Enter your contact details agent
router.post('/v8/enter-your-contact-details-agent', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('manage-application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('manage-application-new')
  }
else {
  res.redirect('what-is-your-address-agent')
}
})

// Enter your contact details agent led
router.post('/v8/enter-your-contact-details-agent-led', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
    res.redirect('check-your-answers') }
else
  res.redirect('what-is-your-address-agent-led')
})

// Enter your contact details applicant
router.post('/v8/enter-your-contact-details-applicant', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('manage-application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('manage-application-new')
  }

else {
  res.redirect('what-is-your-address-applicant')
}
})

// File upload
router.post('/v8/file-upload', function (req, res) {
  res.redirect('check-your-answers')
})

// Landing page
router.post('/v8/landing-page', function (req, res) {
  res.redirect('what-type-of-permit-or-certificate-are-you-applying-for')
})


// Manage application

router.post('/v8/manage-application', function (req, res) {
    res.redirect('manage-application-new')
})

// Manage application new
router.post('/v8/manage-application-new', function (req, res) {
  res.redirect('declaration')
})

// Permit details
router.post('/v8/permit-details', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('manage-application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('manage-application-new')
  }

else {
  res.redirect('add-comments')
}
})

// Select address
router.post('/v8/select-address', function (req, res) {
  res.redirect('confirm-the-address')
})

// Select delivery address
router.post('/v8/select-delivery-address', function (req, res) {
  res.redirect('confirm-delivery-address')
})

// Select your address agent
router.post('/v8/select-your-address-agent', function (req, res) {
  res.redirect('confirm-your-address-agent')
})

// Select your address agent led
router.post('/v8/select-your-address-agent-led', function (req, res) {
  res.redirect('confirm-your-address-agent-led')
})

// Select your address applicant
router.post('/v8/select-your-address-applicant', function (req, res) {
  res.redirect('confirm-your-address-applicant')
})

// Specimen details
router.post('/v8/specimen-details', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('manage-application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('manage-application-new')
  }

  else {
  res.redirect('permit-details')
}
})

// What best describes the specimen
router.post('/v8/what-best-describes-the-specimen', function (req, res) {
  res.redirect('trade-term-code')
})


// What is the name of the species
router.post('/v8/what-is-the-name-of-the-species', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('manage-application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('manage-application-new')
  }
  else {

req.session.data['specimenCount'] = 1
  res.redirect('where-did-you-source-your-specimen-from')
}
})

// What is the purpose code
router.post('/v8/what-is-the-purpose-code', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('manage-application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('manage-application-new')
  }

  if (req.session.data['permitType'] == 'A10') {
      res.redirect('what-will-you-use-the-certificate-for')
  }

  if (req.session.data['speciesName'] == 'Coral') {
  res.redirect('trade-term-code')
  }

  if (req.session.data['specimenType'] == 'animal') {
      res.redirect('what-best-describes-the-specimen')
  }

  if (req.session.data['specimenType'] == 'plant') {
    res.redirect('what-best-describes-the-specimen')
  }

})

// What is the delivery address
router.post('/v8/what-is-the-delivery-address', function (req, res) {
  res.redirect('select-delivery-address')
})

// What is your address agent
router.post('/v8/what-is-your-address-agent', function (req, res) {
  res.redirect('select-your-address-agent')
})

// What is your address agent led
router.post('/v8/what-is-your-address-agent-led', function (req, res) {
  res.redirect('select-your-address-agent-led')
})

// What is your address applicant
router.post('/v8/what-is-your-address-applicant', function (req, res) {
  res.redirect('select-your-address-applicant')
})

// What type of permit or certificate are you applying for
router.post('/v8/what-type-of-permit-or-certificate-are-you-applying-for', function (req, res) {
  let permitType = req.session.data['permitType']

  if (req.session.data['fromPage'] == 'cya') {
    res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
    res.redirect('manage-application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
    res.redirect('manage-application-new')
  }

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
    res.redirect('are-you-applying-on-behalf-of-someone-else')
  }
  if (permitType === 'other') {
    res.redirect('you-cannot-use-this-service-yet')
  }
})

// What will you use the certificate for
router.post('/v8/what-will-you-use-the-certificate-for', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
    res.redirect('check-your-answers') }
else
  res.redirect('specimen-details')
})

// What will you use the permit for
router.post('/v8/what-will-you-use-your-permit-for', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('manage-application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('manage-application-new')
  }

  if (req.session.data['permitType'] == 'A10') {
  res.redirect('what-best-describes-the-specimen')
  }

else {
  res.redirect('specimen-details')
}
})

// Where did you source the specimen from
router.post('/v8/where-did-you-source-your-specimen-from', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('manage-application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('manage-application-new')
  }

else {
  res.redirect('what-is-the-purpose-code')
}
})



module.exports = router
