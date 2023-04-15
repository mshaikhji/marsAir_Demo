Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

import DemoAPIRequests from "../support/pageObjects/DemoAPIRequests";

const demoAPIRequests = new DemoAPIRequests();

describe("DemoQA test cases", () => {
  it("API-1A - Verify user creation success flow", () => {
    const userName = Date.now();
    demoAPIRequests.verifyUserCreationIsSuccessfull(userName, "Qwerty@123");
  });

  it("API-1B - Verify user creation failed due to invalid password format", () => {
    const userName = Date.now();
    demoAPIRequests.verifyPasswordConditionNotMatchForCreateNewUser(
      userName,
      "abc"
    );
  });

  it("API-2A - Add a list of books for the created user", () => {
    const bookISBN = ["9781449325862", "9781449337711"];
    const userName = String(Date.now());
    const password = "Qwerty@123";
    const userid = demoAPIRequests.getCreatedUserID(userName, password);
    const token = demoAPIRequests.getToken(userName, password);
    userid.then((userId) => {
      token.then((accessToken) => {
        demoAPIRequests.addListOfBooksForGivenUser(
          accessToken,
          userId,
          bookISBN
        );
      });
    });
  });

  it("API-2B - Add invalid book ID and verify error message", () => {
    const bookISBN = "abc";
    const userName = String(Date.now());
    const password = "Qwerty@123";
    const userid = demoAPIRequests.getCreatedUserID(userName, password);
    const token = demoAPIRequests.getToken(userName, password);
    userid.then((userId) => {
      token.then((accessToken) => {
        demoAPIRequests.verifyErrorMessageWhenFailToAddBooks(
          accessToken,
          userId,
          bookISBN
        );
      });
    });
  });

  it("API-3A - Verify user can successfully delete a book from created user", () => {
    const bookISBN = ["9781449325862", "9781449337711"];
    const userName = String(Date.now());
    const password = "Qwerty@123";
    const userid = demoAPIRequests.getCreatedUserID(userName, password);
    const token = demoAPIRequests.getToken(userName, password);
    userid.then((userId) => {
      token.then((accessToken) => {
        demoAPIRequests.addListOfBooksForGivenUser(
          accessToken,
          userId,
          bookISBN
        );
        demoAPIRequests.verifyDeleteBookIsSuccessfull(
          accessToken,
          userId,
          bookISBN[1]
        );
      });
    });
  });

  it("API-3B - Verify error message when book deletion is unsuccessful", () => {
    const bookISBN = ["9781449325862", "9781449337711"];
    const userName = String(Date.now());
    const password = "Qwerty@123";
    const userid = demoAPIRequests.getCreatedUserID(userName, password);
    const token = demoAPIRequests.getToken(userName, password);
    userid.then((userId) => {
      token.then((accessToken) => {
        demoAPIRequests.addListOfBooksForGivenUser(
          accessToken,
          userId,
          bookISBN
        );
        demoAPIRequests.verifyDeleteBookIsUnSuccessfull(
          accessToken,
          userId,
          "abc"
        );
      });
    });
  });
});
