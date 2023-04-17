class SearchPage {

    departingField = '#departing'
    returningField = '#returning'
    promotionalCodeField = '#promotional_code'
    searchButton = '[value="Search"]'

    selectDepartingMonthAs(departingMonth) {
        cy.get(this.departingField).should('be.visible').select(departingMonth);
        return this;
    }

    selectReturningMonthAs(returningMonth) {
        cy.get(this.returningField).should('be.visible').select(returningMonth);
        return this;
    }

    enterGivenPromotionalCode(promotionalCode) {
        cy.get(this.promotionalCodeField).should('be.visible').type(promotionalCode);
        return this;
    }

    clickSearchButton() {
        cy.get(this.searchButton).should('be.enabled').click();
        return this;
    }
}

export default SearchPage;