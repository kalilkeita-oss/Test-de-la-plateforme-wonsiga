/// <reference types="cypress" />

describe("Gestion de l'Authentification - Wonsiga", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    // renvoyer false ici empêche Cypress d'échouer le test
    return false;
  });
  beforeEach(() => {
    // On visite l'URL de test
    cy.visit("https://test-wonsiga.badus.app");
  });

  it("Connexion réussie avec des identifiants valides", () => {
    // 1. Gestion de l'Email
    cy.get('input[type="email"]')
      .should("be.visible")
      .clear()
      .type("kalilkeitha@gmail.com");

    // 2. Gestion du Mot de passe

    cy.get('input[type="password"]').clear().type("Kalil@2023");

    // 3. Clic sur le bouton Connexion
    cy.contains("button", "Connexion").click();

    // 4. Vérification du succès

    cy.url().should("not.include", "connexion");
  });

  it("Affiche une erreur pour un mot de passe incorrect", () => {
    cy.get('input[type="email"]').clear().type("kalilkeitha@gmail.com");
    cy.get('input[type="password"]').clear().type("MauvaisMdp123");
    cy.contains("button", "Connexion").click();

    // On vérifie que le message d'erreur est présent (ajuste le texte selon l'app)
    cy.get(".alert").should("be.visible");
  });
  it("Redirige vers la page de récupération du mot de passe", () => {
    cy.contains("Mot de passe oublié ?").click();

    // On vérifie que l'URL contient "forgot" ou "reset"
    cy.url().should("include", "forgot-password");
  });
});
