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
  "your-full-name": [ "Agent Collins" ],
  "your-business-name": [ "MI5" ],
  "your-email": [ "agent.collins@mi5.com" ],
  "agent-address": [ "13 Barton Street Manchester ME19 4TT" ],
  "agent-address-line-1": [ "15 Barton Street" ],
  "agent-address-line-2": [ "Manchester" ],
  "agent-address-line-3": [ "ME19 4TT" ],
  "isAlive": [ "yes" ],

  "isAlive": [ "yes" ],
  "speciesName": [ "Tortoise" ],
  "quantity": "10",
}
