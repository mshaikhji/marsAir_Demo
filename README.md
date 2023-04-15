# Zaapi_DemoQA
UI and API Tests written in Cypress with JavaScript
![image](https://drive.google.com/uc?export=view&id=1W-UynO6mgezooU4_icEfxcaVJWYguRdp)

## Page objects
- Page Objects and Locators in cypress/support/pageObjects : Contains all logic for actions to be performed on each page.
- API actions cypress/support/pageObjects/DemoAPIRequests.js: Contains all logic and assertions for API tests.


### Scenarios:
- `demoQA.spec.js`: Covers all UI and functionality related tests for DemoQA website as per the Test assignment.
- `demoAPI.spec.js`: Covers all API related tests for DemoQA website as per the Test assignment. (Each Endpoint covers one positive and one negative test case)

## Requirements

- [NodeJS](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/get-npm)


## Setup
```
- clone this repo to a local directory
- git clone https://github.com/mshaikhji/Zaapi_DemoQA.git
- cd into the cloned repo
- cd zaapi
- install the node_modules
- npm install
```

## Run Tests
- Run in Browser: `npx cypress open`
- Run Headless: `npx cypress run`

