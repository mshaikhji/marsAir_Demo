class DemoAPIRequests {
  createNewUser(userName, password) {
    return new Cypress.Promise((resolve) => {
      cy.request({
        method: "POST",
        url: "https://demoqa.com/Account/v1/User",
        failOnStatusCode: false,
        body: {
          userName: userName,
          password: password,
        },
        headers: {
          "content-type": "application/json",
        },
      }).then((response) => resolve(response));
    });
  }

  verifyUserCreationIsSuccessfull(userName, password) {
    this.createNewUser(userName, password).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("username", userName);
      expect(response.body).to.have.property("userID").to.not.be.null;
    });
  }

  verifyPasswordConditionNotMatchForCreateNewUser(userName, password) {
    this.createNewUser(userName, password).then((response) => {
      const errorMessage = `Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.`;
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("code", "1300");
      expect(response.body).to.have.property("message", errorMessage);
    });
  }

  getCreatedUserID(userName, password) {
    return new Cypress.Promise((resolve) => {
      this.createNewUser(userName, password).then((response) => {
        resolve(response.body.userID);
      });
    });
  }

  getToken(userName, password) {
    return new Cypress.Promise((resolve) => {
      cy.request({
        method: "POST",
        url: "https://demoqa.com/Account/v1/GenerateToken",
        body: {
          userName: userName,
          password: password,
        },
      }).then((response) => {
        resolve(response.body.token);
      });
    });
  }

  addListOfBooksForGivenUser(token, userID, bookISBNID) {
    cy.request({
      method: "POST",
      url: "https://demoqa.com/BookStore/v1/Books",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: {
        userId: userID,
        collectionOfIsbns: [
          {
            isbn: bookISBNID[0],
          },
          {
            isbn: bookISBNID[1],
          },
        ],
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      const booksID = response.body.books;
      expect(booksID[0]).to.have.property("isbn", bookISBNID[0]);
      expect(booksID[1]).to.have.property("isbn", bookISBNID[1]);
    });
  }

  verifyErrorMessageWhenFailToAddBooks(token, userID, bookISBNID) {
    cy.request({
      method: "POST",
      url: "https://demoqa.com/BookStore/v1/Books",
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: {
        userId: userID,
        collectionOfIsbns: [
          {
            isbn: bookISBNID,
          },
        ],
      },
    }).then((response) => {
      const errorMessage = `ISBN supplied is not available in Books Collection!`;
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("message", errorMessage);
    });
  }

  verifyDeleteBookIsSuccessfull(token, userID, bookISBNID) {
    cy.request({
      method: "DELETE",
      url: "https://demoqa.com/BookStore/v1/Book",
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: {
        isbn: bookISBNID,
        userId: userID,
      },
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  }


verifyDeleteBookIsUnSuccessfull(token, userID, bookISBNID) {
    cy.request({
      method: "DELETE",
      url: "https://demoqa.com/BookStore/v1/Book",
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: {
        isbn: bookISBNID,
        userId: userID,
      },
    }).then((response) => {
        const errorMessage = `ISBN supplied is not available in User's Collection!`;
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("message", errorMessage);
    });
  }
}

export default DemoAPIRequests;
