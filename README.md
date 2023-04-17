# marsAir_Demo
End to End Tests written in Cypress with JavaScript


## Page objects
SearchPage.js - Contains all search related actions to be performed on the search feature. marsAir_Demo/cypress/support/pageObjects/SearchPage.js

SearchResultsPage.js - Contains all search result page related actions and assertions. marsAir_Demo/cypress/support/pageObjects/SearchResultsPage.js

### Scenarios:
- Search Flight:
1. Verify user is able to search for flights with available seats
2. Verify user can see correct error message when selecting invalid travel period

- Discounts:
1. Verify user is able to successfully apply discount for his booking
2. Verify user can see error message when he applies invalid promo code

## Requirements

- [NodeJS](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/get-npm)


## Setup
```
- clone this repo to a local directory
- git clone https://github.com/mshaikhji/marsAir_Demo.git
- cd into the cloned repo
- cd marsAir_Demo
- install the node_modules
- npm install
```

## Run Tests
- Run in Browser: `npx cypress open`
- Run Headless: `npx cypress run`

