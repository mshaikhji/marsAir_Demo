import SearchPage from "../support/pageObjects/SearchPage";
import SearchResultsPage from "../support/pageObjects/SearchResultsPage";

const searchPage = new SearchPage();
const searchResultsPage = new SearchResultsPage();

describe("marsAir discount test cases", () => {
  beforeEach(() => {
    cy.visit("https://marsair.recruiting.thoughtworks.net/MaroofShaikhji");
    indexedDB.deleteDatabase("localforage");
  });

  it("Verify user is able to successfully apply discount for his booking", () => {
    searchPage
    .selectDepartingMonthAs('July')
    .selectReturningMonthAs('December (two years from now)')
    .enterGivenPromotionalCode('AF3-FJK-418')
    .clickSearchButton()
    searchResultsPage
    .verifySearchResultPageIsDisplayed()
    .verifySearchResultOutputIsEqualTo('Seats available!')
    .verifyPromoCodeMessageIsEqualTo('Promotional code AF3-FJK-418 used: 30% discount!')
    .verifySearchResultSuccessMessageIsDisplayed()
  })

  it("Verify user can see error message when he applies invalid promo code", () => {
    searchPage
    .selectDepartingMonthAs('July')
    .selectReturningMonthAs('December (two years from now)')
    .enterGivenPromotionalCode('1')
    .clickSearchButton()
    searchResultsPage
    .verifySearchResultPageIsDisplayed()
    .verifySearchResultOutputIsEqualTo('Seats available!')
    .verifyPromoCodeMessageIsEqualTo('Sorry, code 1 is not valid')
    .verifySearchResultSuccessMessageIsDisplayed()
  })
})