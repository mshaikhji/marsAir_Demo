import SearchPage from "../support/pageObjects/SearchPage";
import SearchResultsPage from "../support/pageObjects/SearchResultsPage";

const searchPage = new SearchPage();
const searchResultsPage = new SearchResultsPage();

describe("marsAir search test cases", () => {
  beforeEach(() => {
    cy.visit("https://marsair.recruiting.thoughtworks.net/MaroofShaikhji");
    indexedDB.deleteDatabase("localforage");
  });

  it("Verify user is able to search for flights with available seats", () => {
    searchPage
    .selectDepartingMonthAs('July')
    .selectReturningMonthAs('December (two years from now)')
    .clickSearchButton()
    searchResultsPage
    .verifySearchResultPageIsDisplayed()
    .verifySearchResultOutputIsEqualTo('Seats available!')
    .verifySearchResultSuccessMessageIsDisplayed()
  });

  it("Verify user can see correct error message when selecting invalid travel period", () => {
    searchPage
    .selectReturningMonthAs('December')
    .clickSearchButton()
    searchResultsPage
    .verifySearchResultPageIsDisplayed()
    .verifySearchResultOutputIsEqualTo('Unfortunately, this schedule is not possible. Please try again.')
  });
});

