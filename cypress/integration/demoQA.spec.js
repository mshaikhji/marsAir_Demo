Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

import DemoHomePage from "../support/pageObjects/DemoHomePage";
import ElementsPage from "../support/pageObjects/ElementsPage";

const demoHomePage = new DemoHomePage();
const elementsPage = new ElementsPage();
describe("DemoQA test cases", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com/");
    indexedDB.deleteDatabase("localforage");
  });

  it("TC01- Scenario A - Verify user can enter new data into the table", () => {
    demoHomePage.clickOnGivenCardByNameAndIndex(1, "Elements");
    elementsPage
      .clickOnGivenElemenType("Web Tables")
      .clickAddButton()
      .fillRegistrationForm(
        "Alden",
        "Cantrell",
        "test@test.com",
        "30",
        "12345",
        "QA"
      )
      .clickSubmitButton();
    elementsPage.verifyEmployeeDetailsByIndex(4, 1, "Alden");
    elementsPage.verifyEmployeeDetailsByIndex(4, 2, "Cantrell");
    elementsPage.verifyEmployeeDetailsByIndex(4, 3, "30");
    elementsPage.verifyEmployeeDetailsByIndex(4, 4, "test@test.com");
    elementsPage.verifyEmployeeDetailsByIndex(4, 5, "12345");
    elementsPage.verifyEmployeeDetailsByIndex(4, 6, "QA");
  });

  it("TC01- Scenario B - Verify user can edit the row in a table", () => {
    demoHomePage.clickOnGivenCardByNameAndIndex(1, "Elements");
    elementsPage
      .clickOnGivenElemenType("Web Tables")
      .clickEditButtonOnGivenRowByIndex(2);
    elementsPage.enterFirstNameInRegistrationForm("Zaapi");
    elementsPage.enterLastNameInRegistrationForm("BKK");
    elementsPage.clickSubmitButton();
    elementsPage.verifyEmployeeDetailsByIndex(2, 1, "Zaapi");
    elementsPage.verifyEmployeeDetailsByIndex(2, 2, "BKK");
  });

  it("TC02 - Verify broken image", () => {
    demoHomePage.clickOnGivenCardByNameAndIndex(1, "Elements");
    elementsPage
      .clickOnGivenElemenType("Broken Links - Images")
      .verifyBrokenImageIsDisplayed();
  });
  it("TC03 - Verify user can submit the form.", () => {
    const imagePath = "cypress/fixtures/zaapi.png";
    demoHomePage.clickOnGivenCardByNameAndIndex(2, "Forms");
    elementsPage.clickOnGivenElemenType("Practice Form");
    elementsPage.enterFirstNameInRegistrationForm("Zaapi");
    elementsPage.enterLastNameInRegistrationForm("BKK");
    elementsPage.enterEmailInRegistrationForm("test@test.com");
    elementsPage.clickOnRadioButton();
    elementsPage.enterMobileNumberInRegistrationForm("0123456789");
    elementsPage.selectBirthDateFromCalendar("January", "1990", "15");
    elementsPage.selectGivenSubject("Chemistry");
    elementsPage.clickOnCheckBox();
    elementsPage.uploadPictureFromGivenPath(imagePath);
    elementsPage.enterCurrentAddressInRegistrationForm("Bangkok");
    elementsPage.selectGivenStateInRegistrationForm("NCR");
    elementsPage.selectGivenCityInRegistrationForm("Delhi");
    elementsPage.clickSubmitButton();
    elementsPage.verifyGivenFormSubmissionResultDetailsInTable(
      "Student Name",
      "Zaapi BKK"
    );
    elementsPage.verifyGivenFormSubmissionResultDetailsInTable(
      "Student Email",
      "test@test.com"
    );
    elementsPage.verifyGivenFormSubmissionResultDetailsInTable(
      "Gender",
      "Male"
    );
    elementsPage.verifyGivenFormSubmissionResultDetailsInTable(
      "Mobile",
      "0123456789"
    );
    elementsPage.verifyGivenFormSubmissionResultDetailsInTable(
      "Date of Birth",
      "15 January,1990"
    );
    elementsPage.verifyGivenFormSubmissionResultDetailsInTable(
      "Subjects",
      "Chemistry"
    );
    elementsPage.verifyGivenFormSubmissionResultDetailsInTable(
      "Hobbies",
      "Reading"
    );
    elementsPage.verifyGivenFormSubmissionResultDetailsInTable(
      "Picture",
      "zaapi.png"
    );
    elementsPage.verifyGivenFormSubmissionResultDetailsInTable(
      "Address",
      "Bangkok"
    );
    elementsPage.verifyGivenFormSubmissionResultDetailsInTable(
      "State and City",
      "NCR Delhi"
    );
    elementsPage.clickCloseButtonOnFormResult();
  });

  it("TC04 - Verify the progress bar", () => {
    demoHomePage.clickOnGivenCardByNameAndIndex(4, "Widgets");
    elementsPage.clickOnGivenElemenType("Progress Bar");
    elementsPage.clickStartButtonForProgressBar();
    elementsPage.verifyProgressBarPercentIsEqualTo("100%");
  });

  it("TC05 - Verify the tooltip", () => {
    demoHomePage.clickOnGivenCardByNameAndIndex(4, "Widgets");
    elementsPage.clickOnGivenElemenType("Tool Tips");
    elementsPage.verifyTooltipIsDisplayed();
  });

  it("TC06 - Verify user can drag and drop", () => {
    demoHomePage.clickOnGivenCardByNameAndIndex(5, "Interactions");
    elementsPage.clickOnGivenElemenType("Droppable");
    elementsPage.dragAndDropElement();
    elementsPage.verifyDragAndDropIsSuccessful();
  });
});
