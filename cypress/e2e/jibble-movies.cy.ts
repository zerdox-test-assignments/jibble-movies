/// <reference types="cypress" />

const useSampleEmpty = () =>
  cy
    .intercept("GET", "**/movies/search*", {
      fixture: "movies-page-empty.json",
    })
    .as("searchRequest");

const useSample1 = () =>
  cy
    .intercept("GET", "**/movies/search*", {
      fixture: "movies-page-1.json",
    })
    .as("searchRequest");

describe("jibble.movies", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("searches movies and displays results", () => {
    useSample1();

    cy.get('[data-test="search-input"]').type("Harry Potter{enter}");

    cy.wait("@searchRequest")
      .its("request.url")
      .should("include", "Title=Harry+Potter")
      .and("include", "page=1");

    cy.get('[data-test="movie-card"]').should("have.length", 2);
  });

  it("accepts search query from url", () => {
    useSampleEmpty();
    cy.visit("http://localhost:5173/?q=test+value");
    cy.get('[data-test="search-input"]').should("have.value", "test value");
  });

  it("stores search query in url", () => {
    useSampleEmpty();
    cy.get('[data-test="search-input"]').type("test string");
    cy.get('[data-test="search-button"]').click();
    cy.location("search").should("contain", "q=test+string");
    cy.location().reload();
    cy.get('[data-test="search-input"]').should("have.value", "test string");
  });
});
