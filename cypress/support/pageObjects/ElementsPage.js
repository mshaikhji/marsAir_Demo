class ElementsPage {
  elementsSelector = '[class="btn btn-light "]';
  addButton = "#addNewRecordButton";
  firstNameField = "#firstName";
  lastNameField = "#lastName";
  emailField = "#userEmail";
  ageField = "#age";
  salaryField = "#salary";
  mobileNumberField = "#userNumber";
  dateOfBirthField = "#dateOfBirthInput";
  departmentField = "#department";
  submitButton = "#submit";
  employeeDetailRow = '[class="rt-tr-group"]';
  employeeDetailColumn = '[class="rt-td"]';
  editButton = '[title="Edit"]';
  brokenImage = 'img[src="/images/Toolsqa_1.jpg"]';
  maleRadioButton = "#gender-radio-1";
  monthSelectorInCalendar = ".react-datepicker__month-select";
  yearSelectorInCalendar = ".react-datepicker__year-select";
  dayPickerInCalendar = ".react-datepicker__day";
  subjectField = "#subjectsInput";
  subjectAutoCompleteResult = ".subjects-auto-complete__option";
  readingHobbyCheckBox = "#hobbies-checkbox-2";
  chooseFileButtonForPicture = "#uploadPicture";
  currentAddressField = "#currentAddress";
  stateSelector = "#react-select-3-input";
  citySelector = "#react-select-4-input";
  formResult = ".table-responsive";
  closeButtonOnFormResult = "#closeLargeModal";
  startStopButtonForProgressBar = "#startStopButton";
  progressBar = '[role="progressbar"]';
  toolTipButton = "#toolTipButton";
  toolTipMessage = '[class="tooltip-inner"]';
  dragSource = "#draggable";
  drropTarget = "#droppable";

  clickOnGivenElemenType(elementType) {
    cy.get(this.elementsSelector)
      .find("span")
      .contains(elementType)
      .should("be.visible")
      .click();
    return this;
  }

  clickAddButton() {
    cy.get(this.addButton).should("be.visible").and("be.enabled").click();
    return this;
  }

  enterTextInGivenInputField(inputField, inputText) {
    cy.get(inputField).should("be.visible").clear().type(inputText);
  }

  enterFirstNameInRegistrationForm(firstName) {
    this.enterTextInGivenInputField(this.firstNameField, firstName);
  }

  enterLastNameInRegistrationForm(lastName) {
    this.enterTextInGivenInputField(this.lastNameField, lastName);
  }

  enterEmailInRegistrationForm(email) {
    this.enterTextInGivenInputField(this.emailField, email);
  }

  enterMobileNumberInRegistrationForm(mobileNumber) {
    this.enterTextInGivenInputField(this.mobileNumberField, mobileNumber);
  }

  enterCurrentAddressInRegistrationForm(address) {
    this.enterTextInGivenInputField(this.currentAddressField, address);
  }

  selectGivenStateInRegistrationForm(state) {
    cy.get(this.stateSelector).type(`${state}{enter}`, { force: true });
  }

  selectGivenCityInRegistrationForm(city) {
    cy.get(this.citySelector).type(`${city}{enter}`, { force: true });
  }

  selectGivenSubject(subjectName) {
    cy.get(this.subjectField).should("be.visible").type(subjectName);
    cy.get(this.subjectAutoCompleteResult).contains(subjectName).click();
  }

  fillRegistrationForm(firstName, lastName, email, age, salary, department) {
    this.enterFirstNameInRegistrationForm(firstName);
    this.enterLastNameInRegistrationForm(lastName);
    this.enterEmailInRegistrationForm(email);
    this.enterTextInGivenInputField(this.ageField, age);
    this.enterTextInGivenInputField(this.salaryField, salary);
    this.enterTextInGivenInputField(this.departmentField, department);
    return this;
  }

  verifyEmployeeDetailsByIndex(rowIndex, columnIndex, employeeDetail) {
    rowIndex--;
    columnIndex--;
    cy.get(this.employeeDetailRow)
      .eq(rowIndex)
      .within((row) => {
        cy.wrap(row)
          .find(this.employeeDetailColumn)
          .eq(columnIndex)
          .should("be.visible")
          .and("have.text", employeeDetail);
      });
    return this;
  }

  clickSubmitButton() {
    cy.get(this.submitButton)
      .scrollIntoView()
      .should("be.visible")
      .and("be.enabled")
      .click({ force: true });
    return this;
  }

  clickEditButtonOnGivenRowByIndex(rowIndex) {
    rowIndex--;
    cy.get(this.employeeDetailRow)
      .eq(rowIndex)
      .within((row) => {
        cy.wrap(row).find(this.editButton).should("be.visible").click();
      });
  }

  verifyBrokenImageIsDisplayed() {
    cy.get(this.brokenImage)
      .should("be.visible")
      .and("have.css", "color", "rgb(33, 37, 41)");
  }

  clickOnRadioButton() {
    cy.get(this.maleRadioButton).should("exist").check({ force: true });
    return this;
  }

  clickOnCheckBox() {
    cy.get(this.readingHobbyCheckBox).should("exist").check({ force: true });
    return this;
  }

  selectBirthDateFromCalendar(month, year, day) {
    cy.get(this.dateOfBirthField).should("be.visible").click();
    cy.get(this.monthSelectorInCalendar).should("be.visible").select(month);
    cy.get(this.yearSelectorInCalendar).should("be.visible").select(year);
    cy.get(this.dayPickerInCalendar).should("be.visible").contains(day).click();
  }

  uploadPictureFromGivenPath(imagePath) {
    cy.get(this.chooseFileButtonForPicture)
      .should("be.visible")
      .selectFile(imagePath);
  }

  verifyGivenFormSubmissionResultDetailsInTable(lable, value) {
    cy.get(this.formResult).within((table) => {
      cy.wrap(table)
        .find("td")
        .contains(lable)
        .siblings()
        .first()
        .should("have.text", value);
    });
  }

  clickCloseButtonOnFormResult() {
    cy.get(this.closeButtonOnFormResult)
      .scrollIntoView()
      .should("exist")
      .click();
  }

  clickStartButtonForProgressBar() {
    cy.get(this.startStopButtonForProgressBar).should("be.visible").click();
  }

  verifyProgressBarPercentIsEqualTo(percentage) {
    cy.get(this.progressBar, { timeout: 40000 })
      .should("have.text", percentage)
      .and("have.css", "background-color", "rgb(40, 167, 69)");
  }

  verifyTooltipIsDisplayed() {
    cy.get(this.toolTipButton).trigger("mouseover");
    cy.get(this.toolTipMessage)
      .should("be.visible")
      .and("have.text", "You hovered over the Button");
  }

  dragAndDropElement() {
    cy.get(this.dragSource).drag(this.drropTarget, { force: true });
  }

  verifyDragAndDropIsSuccessful() {
    cy.get(this.drropTarget).first().should("have.text", "Dropped!");
  }
}

export default ElementsPage;
