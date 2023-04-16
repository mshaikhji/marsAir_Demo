class SearchResultsPage {
  searchResultsTitle = '//*[@id="content"]/h2';
  searchResultOutput = '(//*[@id="content"]/p)[1]';
  searchResultSuccessMessage = '//p[text()="Call now on 0800 MARSAIR to book!"]';
  promoCodeText = ".promo_code";

  verifySearchResultPageIsDisplayed() {
    cy.xpath(this.searchResultsTitle).should("be.visible");
    return this;
  }

  verifySearchResultOutputIsEqualTo(searchresultOutput) {
    cy.xpath(this.searchResultOutput)
      .should("be.visible")
      .and("have.text", searchresultOutput);
    return this;
  }

  verifyPromoCodeMessageIsEqualTo(message) {
    cy.get(this.promoCodeText).should("be.visible").and("contain", message);
    return this;
  }

  verifySearchResultSuccessMessageIsDisplayed() {
    const successMessage = "Call now on 0800 MARSAIR to book!";
    cy.xpath(this.searchResultSuccessMessage)
      .should("be.visible")
    return this;
  }
}
export default SearchResultsPage;
