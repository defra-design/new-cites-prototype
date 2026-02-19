/*
  Default values for user session data to populate the application 
  (Check Your Answers) page for a Peregrine Falcon export.
*/

module.exports = {

  // Application Reference
  "submissionRef": "AB7N10",
  "applicationRef": "AB7N10/001",

  // Permit details
  "permitType": "Export",
  "isAgent": "no",
  "permitNumber": "GB26EXP1234A",

  // Your contact details (Applicant)
  "your-full-name": "Dean Falconer",
  "your-business-name": "Falconers ltd",
  "your-email": "dean@falconers-nest.co.uk",
  "your-address": "12 Falconry Way, Norwich, Norfolk, NR1 4FN, United Kingdom",

  // Agent specific fields (empty as isAgent is 'no')
  "agent-address": "",
  "applicant-full-name": "Dean Falconer",
  "applicant-business-name": "Falconers ltd",
  "applicant-email": "dean@falconers-nest.co.uk",

  // Delivery address
  "delivery-address": "The Royal Falconry Centre, Al-Safa Street, Jumeirah, PO Box 112233, Dubai, UAE",

  // Specimen details
  "speciesName": "Falco peregrinus",
  "specimenType": "animal",
  "specimenDescription": "livingAnimal",
  "quantity": "1",
  "unitOfMeasure": "Number",
  "sourceCode": "C",
  "purposeCode": "P",
  "tradeTerm": "yes",
  "tradeTermCode": "LIV",
  "gender": "Male",
  
  // Identification
  "identificationMark": "Closed ring number",
  "identificationMark-2": "DF-2025-UK-09", // Specific field for Closed Ring in template

  // Date of birth / Hatch date
  "hatch-date-day": "15",
  "hatch-date-month": "05",
  "hatch-date-year": "2025",

  // Description and Remarks
  "description": "Live bird, captive-bred. Specialist falconry carrier required per IATA LAR. Single shipment.",
  "comment": "Peregrine Falcon exported for falconry purposes to UAE importer under specialized wildlife trade agreement.",

  // Country of import/destination details
  "importCountry": "United Arab Emirates",
  "importPermitNumber": "AE-IMP-2026-4421",
  "importPermitIssueDay": "05",
  "importPermitIssueMonth": "02",
  "importPermitIssueYear": "2026",

  // Country of origin details
  "originCountry": "United Kingdom",
  "originPermitNumber": "UK-CB-2025-8821",
  "originPermitIssueDay": "01",
  "originPermitIssueMonth": "06",
  "originPermitIssueYear": "2025"

}