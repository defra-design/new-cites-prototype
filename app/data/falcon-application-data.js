/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

module.exports = {

  // Application submission reference
  "submissionRef": "AB7N10639G639G",
  "applicationRef": "AB7N10639G/001",

  // Permit type - Peregrine Falcon export
  "permitType": "Export",
  "isAgent": "no",

  // Applicant/Account holder - Dean Falconer
  "applicant-full-name": "Dean Falconer",
  "applicant-business-name": "Falconers ltd",
  "applicant-email": "dean@falconers-nest.co.uk",
  "your-address": "12 Falconry Way, Norwich, Norfolk, NR1 4FN, United Kingdom",
  "your-full-name": "Dean Falconer",
  "your-business-name": "Falconers ltd",
  "your-email": "dean@falconers-nest.co.uk",

  // Delivery address - importer location
  "delivery-address": "The Royal Falconry Centre, Al-Safa Street, Jumeirah, PO Box 112233, Dubai, UAE",

  // Specimen details - Peregrine Falcon
  "specimenType": "animal",
  "specimenDescription": "livingAnimal",
  "speciesName": "Falco peregrinus",
  "quantity": "1",
  "unitOfMeasure": "Number",
  "sourceCode": "C",
  "purposeCode": "P",
  "tradeTerm": "yes",
  "tradeTermCode": "LIV",
  "gender": "Male",
  "identificationMark": "Closed ring number",
  "identificationMark-2": "DF-2025-UK-09",

  // Date of birth
  "hatch-date-day": "15",
  "hatch-date-month": "05",
  "hatch-date-year": "2025",

  // Origin and destination countries
  "originCountry": "United Kingdom",
  "originPermitNumber": "UK-CB-2025-8821",
  "originPermitIssueDay": "01",
  "originPermitIssueMonth": "06",
  "originPermitIssueYear": "2025",

  // Import/destination details (importer)
  "importCountry": "United Arab Emirates",
  "importPermitNumber": "AE-IMP-2026-4421",
  "importPermitIssueDay": "05",
  "importPermitIssueMonth": "02",
  "importPermitIssueYear": "2026",

  // Permit reference and dates
  "permitNumber": "26GBEXP12345A",
  "permitValidityDate": "2026-05-25",
  "transportMethod": "Air",
  "waybillNumber": "EK-DXB-900213",

  // Description/Remarks
  "description": "Live bird, captive-bred. Specialist falconry carrier required per IATA LAR. Single shipment.",
  "comment": "Peregrine Falcon exported for falconry purposes to UAE importer under specialized wildlife trade agreement.",

}