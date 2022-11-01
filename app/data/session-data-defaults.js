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

  // Insert values here
  "permitType": "import",
  "isAgent": [ "yes" ],
  "specimenType": "animal",
  "speciesName": "Tortoise",
  "your-full-name": [ "Agent Collins" ],
  "your-business-name": [ "MI5" ],
  "your-email": [ "agent.collins@mi5.com" ],
  "agent-address": [ "13 Barton Street Manchester ME19 4TT" ],
  "agent-address-line-1": [ "15 Barton Street" ],
  "agent-address-line-2": [ "Manchester" ],
  "agent-address-line-3": [ "ME19 4TT" ],
  "isAlive": [ "yes" ],
  "speciesName": [ "Tortoise" ],
  // "specimenCount": "1",
  "quantity": "2",
  "unitOfMeasure": "Number",
  "applicant-full-name": "John Doe",
  "applicant-business-name": "Magpie Enterprises Ltd",
  "applicant-email": "jd@magpieenterprises.com",
  "your-address": [ "2 Ruskin Lane York YM6 8CT" ],
  "sourceCode": "W",
  "purposeCode": "D",
  "tradeTerm": "LIV",
  "gender": "Female",
  "identifier": "DE1234",
  "hatch-date-day": "02 04 2022",
  "importCountry": "Spain",
  "importPermitNumber": "123456",
  "importPermitIssueDay": "01 10 2019",
  "originCountry": "Ireland",
  "originPermitNumber": "654321",
  "originPermitIssueDay": "23 02 2010",

}
