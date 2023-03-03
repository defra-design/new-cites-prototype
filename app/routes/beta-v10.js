const express = require('express')
const router = express.Router()

// *********** v10 routes *************

// Account no applications
router.post('/v10/account-no-applications', function (req, res) {
  res.redirect('what-type-of-permit-or-certificate-are-you-applying-for')
})

// Add comments
router.post('/v10/add-comments', function (req, res) {

  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('new-application')
  }

else {
res.redirect('file-upload')
}
})

// Acquired date
router.post('/v10/acquired-date', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('new-application')
  }

  res.redirect('already-have-a10')
})

// Already have A10
router.post('/v10/already-have-a10', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('new-application')
  }
  else {
  res.redirect('ever-been-imported-exported')
}
})

// Application
router.post('/v10/application', function (req, res) {
  res.redirect('new-application')
})


// Application complete
router.post('/v10/application-complete', function (req, res) {
  req.session.data['fromPage'] = ''
  res.redirect('start')
  // res.redirect('your-applications')
})

// Are you applying on behalf of someone else
router.post('/v10/are-you-applying-on-behalf-of-someone-else', function (req, res) {
if (req.session.data['isAgent'] == 'yes') {
  res.redirect('enter-your-contact-details-agent')
} else {
  res.redirect('enter-your-contact-details-applicant')
}
})

// Are you sure
router.post('/v10/are-you-sure', function (req, res) {
if (req.session.data['remove'] == 'yes') {
  res.redirect('your-applications-removed')
} else {
  res.redirect('your-applications-pre-submission')
}
})

// Are you sure change permit type
router.post('/v10/are-you-sure-change-permit-type', function (req, res) {
  if (req.session.data['changePermitType'] == 'yes') {
      res.redirect('what-type-of-permit-or-certificate-are-you-applying-for?fromPage=noreturn')
  }

  if (req.session.data['changePermitType'] == 'no') {
    if (req.session.data['fromPage'] == 'pre-submission') {
      res.redirect('your-applications-pre-submission')
    }
  }

  if (req.session.data['changePermitType'] == 'no') {
    if (req.session.data['fromPage'] == 'cya') {
      res.redirect('check-your-answers')
    }
  }

  if (req.session.data['changePermitType'] == 'no') {
    if (req.session.data['fromPage'] == 'copy') {
      res.redirect('copy-application')
    }
  }
})

// Are you sure change the scientific name
router.post('/v10/are-you-sure-change-scientific-name', function (req, res) {
  if (req.session.data['changeScientificName'] == 'yes') {
      res.redirect('what-is-the-name-of-the-species?fromPage=noreturn')
  }

  if (req.session.data['changeScientificName'] == 'no') {
    if (req.session.data['fromPage'] == 'pre-submission') {
      res.redirect('your-applications-pre-submission')
    }
  }

  if (req.session.data['changeScientificName'] == 'no') {
    if (req.session.data['fromPage'] == 'cya') {
      res.redirect('check-your-answers')
    }
  }

  if (req.session.data['changeScientificName'] == 'no') {
    if (req.session.data['fromPage'] == 'copy') {
      res.redirect('copy-application')
    }
  }
})

// Are you sure change applicant contact details
router.post('/v10/are-you-sure-change-applicant-contact-details', function (req, res) {

  if (req.session.data['changeApplicantContactDetails'] == 'yes') {
    res.redirect('enter-your-contact-details-applicant?pageFrom=cya')
    }

  if (req.session.data['changeApplicantContactDetails'] == 'no') {
    if (req.session.data['fromPage'] == 'cya') {
      res.redirect('check-your-answers')
    }
  }

  if (req.session.data['changeApplicantContactDetails'] == 'no') {
    if (req.session.data['fromPage'] == 'copy') {
      res.redirect('copy-application')
    }
  }
})

// Are you sure change applicant address
router.post('/v10/are-you-sure-change-applicant-address', function (req, res) {

if (req.session.data['changeApplicantAddress'] == 'yes') {
  if (req.session.data['isAgent'] == 'yes') {
  res.redirect('what-is-your-address-agent-led?pageFrom=cya')
}
else {
  res.redirect('what-is-your-address-applicant?pageFrom=cya')
}
}

if (req.session.data['changeApplicantAddress'] == 'no') {
  if (req.session.data['fromPage'] == 'cya') {
    res.redirect('check-your-answers')
  }
}

if (req.session.data['changeApplicantAddress'] == 'no') {
  if (req.session.data['fromPage'] == 'copy') {
    res.redirect('copy-application')
  }
}
})


// Are you sure change agent contact details
router.post('/v10/are-you-sure-change-agent-contact-details', function (req, res) {
if (req.session.data['changeAgentContactDetails'] == 'yes') {
  res.redirect('enter-your-contact-details-agent?pageFrom=cya')
}

if (req.session.data['changeAgentContactDetails'] == 'no') {
  if (req.session.data['fromPage'] == 'cya') {
    res.redirect('check-your-answers')
  }
}

if (req.session.data['changeAgentContactDetails'] == 'no') {
  if (req.session.data['fromPage'] == 'copy') {
    res.redirect('copy-application')
  }
}
})


// Are you sure change agent address
router.post('/v10/are-you-sure-change-agent-address', function (req, res) {
if (req.session.data['changeAgentAddress'] == 'yes') {
  res.redirect('what-is-your-address-agent?pageFrom=cya')
}

if (req.session.data['changeAgentAddress'] == 'no') {
  if (req.session.data['fromPage'] == 'cya') {
    res.redirect('check-your-answers')
  }
}

if (req.session.data['changeAgentAddress'] == 'no') {
  if (req.session.data['fromPage'] == 'copy') {
    res.redirect('copy-application')
  }
}
})

// Are you sure change delivery address
router.post('/v10/are-you-sure-change-delivery-address', function (req, res) {
if (req.session.data['changeDeliveryAddress'] == 'yes') {
  res.redirect('what-is-the-delivery-address?pageFrom=cya')
}

if (req.session.data['changeDeliveryAddress'] == 'no') {
  if (req.session.data['fromPage'] == 'cya') {
    res.redirect('check-your-answers')
  }
}

if (req.session.data['changeDeliveryAddress'] == 'no') {
  if (req.session.data['fromPage'] == 'copy') {
    res.redirect('copy-application')
  }
}
})

// Check your answers pre-multiplicity
// router.post('/v10/check-your-answers', function (req, res) {
//   req.session.data['fromPage'] = 'cya'
//
//   if (req.session.data['specimenCount'] == req.session.data['quantity']) {
//     res.redirect('declaration')
// } else {
//     req.session.data['specimenCount'] = req.session.data['specimenCount'] + 1
//     res.redirect('check-your-answers')
// }
// })

// Check your answers
router.post('/v10/check-your-answers', function (req, res) {
  res.redirect('your-applications-pre-submission')
})

// Check your answers reuse
// router.post('/v10/check-your-answers-reuse', function (req, res) {
//   res.redirect('declaration')
// })

// Confirm applicants international address
// router.post('/v10/confirm-applicants-international-address', function (req, res) {
//   res.redirect('what-is-the-name-of-the-species')
// })

// Choose delivery address
router.post('/v10/choose-delivery-address', function (req, res) {
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

// Comments
router.post('/v10/comments', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('new-application')
  }

else {
  res.redirect('check-your-answers')
}
})

// Confirm delivery address
router.post('/v10/confirm-delivery-address', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'copy') {
  res.redirect('copy-application')
  }

  res.redirect('what-is-the-name-of-the-species')
})

// Confirm the address
router.post('/v10/confirm-the-address', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('new-application')
  }

  if (req.session.data['isAgent'] == 'yes') {
  res.redirect('what-is-your-address-agent-led')
  }
  else {
  res.redirect('what-is-the-name-of-the-species')
}
})

// Confirm your address agent
router.post('/v10/confirm-your-address-agent', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'copy') {
  res.redirect('copy-application')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('new-application')
  }

else {
  res.redirect('enter-your-contact-details-agent-led')
}
})

// Confirm your address agent led
router.post('/v10/confirm-your-address-agent-led', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'copy') {
  res.redirect('copy-application')
  }

  res.redirect('choose-delivery-address')
})

// Confirm your address applicant
router.post('/v10/confirm-your-address-applicant', function (req, res) {
    if (req.session.data['fromPage'] == 'cya') {
    res.redirect('check-your-answers')
    }
    else {
    res.redirect('choose-delivery-address')
}
})

// Copy application
router.post('/v10/copy-application', function (req, res) {
  res.redirect('your-applications-pre-submission')
})

// Created date
router.post('/v10/created-date', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'copy') {
  res.redirect('copy-application')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('new-application')
  }
  else {
  res.redirect('trade-term-code')
}
})

// Declaration
router.post('/v10/declaration', function (req, res) {
  res.redirect('application-complete')
})

// Describe living animal
router.post('/v10/describe-living-animal', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'copy') {
  res.redirect('copy-application')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('new-application')
  }

  if (req.session.data['specimenDescription'] == 'livingAnimal') {
    if (req.session.data['permitType'] == 'A10') {
      res.redirect('acquired-date')
    }
  }

  if (req.session.data['specimenDescription'] == 'livingAnimal') {
    if (req.session.data['identificationMark'] == 'unmarked') {
      if (req.session.data['quantity'] > 1 ) {
      res.redirect('how-many-unmarked')
    }
  }
  }
res.redirect('importer-exporter-details')
})

// Description generic
router.post('/v10/describe-generic', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'copy') {
  res.redirect('copy-application')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('new-application')
  }

  if (req.session.data['permitType'] == 'A10') {
  res.redirect('acquired-date')
  }
else {
  res.redirect('importer-exporter-details')
}
})


// Enter delivery address manually
router.post('/v10/enter-delivery-address-manually', function (req, res) {
  res.redirect('confirm-delivery-address')
})

// Enter address manually
router.post('/v10/enter-address-manually', function (req, res) {
  res.redirect('confirm-the-address')
})

// Enter your address manually - agent
router.post('/v10/enter-your-address-manually-agent', function (req, res) {
  res.redirect('confirm-your-address-agent')
})

// Enter your address manually - agent led
router.post('/v10/enter-your-address-manually-agent-led', function (req, res) {
  res.redirect('confirm-your-address-agent-led')
})

// Enter your address manually - applicant
router.post('/v10/enter-your-address-manually-applicant', function (req, res) {
  res.redirect('confirm-your-address-applicant')
})


// Enter your contact details agent
router.post('/v10/enter-your-contact-details-agent', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'copy') {
  res.redirect('copy-application')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('new-application')
  }
else {
  res.redirect('confirm-your-address-agent')
}
})

// Enter your contact details agent led
router.post('/v10/enter-your-contact-details-agent-led', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
    res.redirect('check-your-answers') }
else
  res.redirect('what-is-your-address-agent-led')
})

// Enter your contact details applicant
router.post('/v10/enter-your-contact-details-applicant', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }
  if (req.session.data['fromPage'] == 'copy') {
  res.redirect('copy-application')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('new-application')
  }

else {
  res.redirect('confirm-your-address-applicant')
}
})

// Ever been imported or exported
router.post('/v10/ever-been-imported-exported', function (req, res) {

  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('new-application')
  }

  if (req.session.data['everImportedExported'] === 'no') {
    res.redirect('comments') }
else
  res.redirect('permit-details')
})

// File upload
router.post('/v10/file-upload', function (req, res) {
  res.redirect('declaration')
})

// Importer / exporter details
router.post('/v10/importer-exporter-details', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'copy') {
  res.redirect('copy-application')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('new-application')
  }

  if (req.session.data['permitType'] === 'export') {
  res.redirect('comments')
}
  else {
    res.redirect('permit-details')
  }
})

// How many unmarked
router.post('/v10/how-many-unmarked', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('new-application')
  }

  res.redirect('describe-generic')

})

// Manage application

router.post('/v10/application', function (req, res) {
    res.redirect('new-application')
})

// New application
router.post('/v10/new-application', function (req, res) {
  res.redirect('your-applications-pre-submission')
})

// Permit details
router.post('/v10/permit-details', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'copy') {
  res.redirect('copy-application')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('new-application')
  }

else {
  res.redirect('comments')
}
})

// Quantity or net mass
router.post('/v10/quantity-or-net-mass', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'copy') {
  res.redirect('copy-application')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('new-application')
  }

  if (req.session.data['specimenDescription'] == 'workedItem') {
  res.redirect('created-date')
  }



else {
  res.redirect('trade-term-code')
}
})

// Select address
router.post('/v10/select-address', function (req, res) {
  res.redirect('confirm-the-address')
})

// Select delivery address
router.post('/v10/select-delivery-address', function (req, res) {
  res.redirect('confirm-delivery-address')
})

// Select your address agent
router.post('/v10/select-your-address-agent', function (req, res) {
  res.redirect('confirm-your-address-agent')
})

// Select your address agent led
router.post('/v10/select-your-address-agent-led', function (req, res) {
  res.redirect('confirm-your-address-agent-led')
})

// Select your address applicant
router.post('/v10/select-your-address-applicant', function (req, res) {
  res.redirect('confirm-your-address-applicant')
})

// Specimen details
router.post('/v10/specimen-details', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('new-application')
  }

if (req.session.data['specimenDescription'] == 'livingAnimal') {
  if (req.session.data['identificationMark'] == 'I do not know') {
    if (req.session.data['totalSpecimens1'] > 1 ) {
    res.redirect('how-many-unmarked')
  }
else {
res.redirect('permit-details')
}
}
}

})

// Trade term code
router.post('/v10/trade-term-code', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'copy') {
  res.redirect('copy-application')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('new-application')
  }

  if (req.session.data['specimenType'] == 'workedItem') {
  res.redirect('created-date') //created date page
  }

  res.redirect('unique-identification-mark') //unique identification mark page
})

// Unique identification mark
router.post('/v10/unique-identification-mark', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'copy') {
  res.redirect('copy-application')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('new-application')
  }

  if (req.session.data['specimenDescription'] == 'livingAnimal') {
    if (req.session.data['identificationMark'] == 'unmarked') {
      res.redirect('how-many-unmarked')
    }
    else {
    res.redirect('describe-living-animal')
  }
}

res.redirect('describe-generic')

})

// View application
router.post('/v10/view-application', function (req, res) {
  res.redirect('your-applications-pre-submission')
})

// We could not confirm the scientific name
router.post('/v10/we-could-not-confirm-the-scientific-name', function (req, res) {
  res.redirect('what-is-the-name-of-the-species')
})

// What best describes the specimen
router.post('/v10/what-best-describes-the-specimen', function (req, res) {

  if (req.session.data['specimenType'] == 'plant') {
  res.redirect('quantity-or-net-mass')
  }

    if (req.session.data['specimenDescription'] == 'workedItem') {
    res.redirect('created-date')
    }
else {
  res.redirect('trade-term-code')
}
})

// What is the name of the species
router.post('/v10/what-is-the-name-of-the-species', function (req, res) {
  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('new-application')
  }

  if (req.session.data['unitOfMeasure'] == 'number of specimens') {
    req.session.data['specimenCount'] = 1
    res.redirect('where-did-you-source-your-specimen-from')
  }
  else {
    req.session.data['specimenCount'] = 1
    req.session.data['quantity'] = 1
    res.redirect('where-did-you-source-your-specimen-from')
}
})

// What is the purpose code
router.post('/v10/what-is-the-purpose-code', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'copy') {
  res.redirect('copy-application')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('new-application')
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
router.post('/v10/what-is-the-delivery-address', function (req, res) {
  res.redirect('select-delivery-address')
})

// What is your address agent
router.post('/v10/what-is-your-address-agent', function (req, res) {
  res.redirect('select-your-address-agent')
})

// What is your address agent led
router.post('/v10/what-is-your-address-agent-led', function (req, res) {
  res.redirect('select-your-address-agent-led')
})

// What is your address applicant
router.post('/v10/what-is-your-address-applicant', function (req, res) {
  res.redirect('select-your-address-applicant')
})

// What type of permit or certificate are you applying for
router.post('/v10/what-type-of-permit-or-certificate-are-you-applying-for', function (req, res) {
  let permitType = req.session.data['permitType']

  if (req.session.data['fromPage'] == 'manageApplication') {
    res.redirect('application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
    res.redirect('new-application')
  }

  if (permitType === 'other') {
    res.redirect('you-cannot-use-this-service-yet')
  }

  if (req.session.data['changePermitType'] == 'yes') {
    res.redirect('what-is-the-name-of-the-species')
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
})

// What will you use the certificate for
router.post('/v10/what-will-you-use-the-certificate-for', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
    res.redirect('check-your-answers') }
else
  res.redirect('what-best-describes-the-specimen')
})

// What will you use the permit for
router.post('/v10/what-will-you-use-your-permit-for', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('new-application')
  }

  if (req.session.data['permitType'] == 'A10') {
  res.redirect('what-best-describes-the-specimen')
  }

else {
  res.redirect('specimen-details')
}
})

// Where did you source the specimen from
router.post('/v10/where-did-you-source-your-specimen-from', function (req, res) {
  if (req.session.data['fromPage'] == 'cya') {
  res.redirect('check-your-answers')
  }

  if (req.session.data['fromPage'] == 'copy') {
  res.redirect('copy-application')
  }

  if (req.session.data['fromPage'] == 'manageApplication') {
  res.redirect('application')
  }

  if (req.session.data['fromPage'] == 'manageApplicationNew') {
  res.redirect('new-application')
  }

  if (req.session.data['permitType'] == 'A10') {
  res.redirect('what-will-you-use-the-certificate-for')
  }
  else {
  res.redirect('what-is-the-purpose-code')
}
})

// You cannot use this service yet
router.post('/v10/you-cannot-use-this-service-yet', function (req, res) {
  res.redirect('your-submissions')
})

// Your applications
router.post('/v10/your-applications', function (req, res) {
  res.redirect('what-type-of-permit-or-certificate-are-you-applying-for')
})

// Your applications pre-submission
router.post('/v10/your-applications-pre-submission', function (req, res) {
  res.redirect('file-upload')
})

// Your submissions
router.post('/v10/your-submissions', function (req, res) {
  res.redirect('your-applications')
})

module.exports = router
