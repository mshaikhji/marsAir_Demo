class DemoHomePage {
  card = '[class="card-body"]';

  clickOnGivenCardByNameAndIndex(index, cardName) {
    index--;
    cy.get(this.card).eq(index).first().contains(cardName).click();
    return this;
  }
}

export default DemoHomePage;
