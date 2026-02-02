describe("Gestion des Véhicules - Wonsiga", () => {
  Cypress.on("uncaught:exception", () => false);

  beforeEach(() => {
    cy.visit("https://test-wonsiga.badus.app");
    cy.get('input[type="email"]').clear().type("kalilkeitha@gmail.com");
    cy.get('input[type="password"]').clear().type("Kalil@2023");
    cy.contains("button", "Connexion").click();
    cy.contains("Tableau de bord", { timeout: 15000 }).should("be.visible");
  });

  it("Créer un nouveau véhicule", () => {
    // 1. Navigation
    cy.contains("Exploitation").click();
    cy.contains("Véhicules").click();
    cy.get('a[href*="/vehicles/create"]').click();

    // 2. Sélection Filiale
    cy.get('select[name="subsidiary_id"]').select("DIGITALDREAMS", {
      force: true,
    });
    cy.wait(2000);

    // 3. SECTION : Informations techniques
    const immat = `CI-${Math.floor(Math.random() * 9000) + 1000}-GH`;

    cy.get('[name="registration_number"]').should("be.visible").type(immat);

    // Modèle
    cy.get("label")
      .contains("Modèle")
      .parent()
      .find(".select2-selection")
      .click({ force: true });
    cy.get(".select2-results__option").contains("Toyota Corolla").click();

    cy.get('[name="manufacturing_at"]').type("2023-01-01", { force: true });
    cy.get('select[name="color_id"]').select("Rouge", { force: true });
    cy.get('select[name="type_id"]').select("Véhicule thermique", {
      force: true,
    });
    cy.get('input[name="reference"]').type(`REF-${Date.now()}`);

    // 4.(Caractéristiques)
    cy.get("label")
      .contains("Type de boîte de vitesses")
      .parent()
      .find(".select2-selection")
      .click({ force: true });
    cy.get(".select2-results__option").contains("Manuelle").click();
    cy.get("label")
      .contains("Motorisation")
      .parent()
      .find(".select2-selection")
      .click({ force: true });
    cy.get(".select2-results__option").contains("Thermique").click();
    cy.get("label")
      .contains("Type de carburant")
      .parent()
      .find(".select2-selection")
      .click({ force: true });
    cy.get(".select2-results__option").contains("Essence").click();

    cy.get('[name="place_number"]').scrollIntoView().clear().type("5");
    cy.get('[name="doors_number"]').scrollIntoView().clear().type("4");

    cy.get("label")
      .contains("Statut")
      .parent()
      .find(".select2-selection")
      .click({ force: true });
    cy.get(".select2-results__option").contains("Disponible").click();

    // 5. SECTION : Acquisition
    cy.get('[name="moment_at"]')
      .scrollIntoView()
      .type("2026-02-02", { force: true });
    cy.get('[name="mileage"]').type("50", { force: true });
    cy.get('[name="amount"]').type("15000000", { force: true });
    cy.get('[name="depreciation_period_year"]')
      .clear()
      .type("2", { force: true });

    // 6. Validation
    cy.contains("button", "Confirmer").scrollIntoView().click({ force: true });
    cy.contains("Ajout effectué avec succès !", { timeout: 10000 }).should(
      "be.visible",
    );
  });

  it("Suppression d'un véhicule ", () => {
    // 1. Navigation
    cy.contains("Exploitation").click();
    cy.contains("Véhicules").click();

    // 2. Attente de la liste
    cy.get(".card-title", { timeout: 10000 }).should("be.visible");

    // 3. Clic sur supprimer (ton sélecteur exact de la ligne 14)
    cy.get(":nth-child(14) > :nth-child(7) > .btn-group > .btn-outline-danger")
      .scrollIntoView()
      .click({ force: true });

    // 4. Confirmation dans la modale
    cy.get(".modal-content", { timeout: 5000 }).should("be.visible");
    cy.get(".modal-footer").contains("Supprimer").click({ force: true });

    // 5. Vérification
    cy.contains("Suppression effectuée avec succès !", {
      timeout: 10000,
    }).should("be.visible");
  });
});
