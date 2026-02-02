describe("Gestion des Drivers - Wonsiga", () => {
  Cypress.on("uncaught:exception", () => false);

  beforeEach(() => {
    cy.visit("https://test-wonsiga.badus.app");
    cy.get('input[type="email"]').clear().type("kalilkeitha@gmail.com");
    cy.get('input[type="password"]').clear().type("Kalil@2023");
    cy.contains("button", "Connexion").click();
    cy.contains("Tableau de bord", { timeout: 10000 }).should("be.visible");
  });

  it(" Créer un nouveau chauffeur ", () => {
    // 1. Navigation
    cy.contains("Exploitation").click();
    cy.contains("Chauffeurs").click();
    cy.get('a[href*="/drivers/create"]').click();

    // 2. SECTION : Informations générales
    // On force la valeur de la Filiale (DIGITALDREAMS a souvent l'ID '1' ou '2')
    // On déclenche l'événement 'change' pour que le site sache qu'on a choisi
    cy.get('select[name="subsidiary_id"]').select("DIGITALDREAMS", {
      force: true,
    });

    // 3. SECTION : Informations personnelles
    cy.get('input[placeholder="Prénoms"]').type("Abdoul Rachid");
    cy.get('input[placeholder="Nom de famille"]').type("Ouedraogo");

    // Matricule unique
    const uniqueMatricule = `MAT-${Date.now()}`;
    cy.get('input[placeholder="Référence du chauffeur"]').type(uniqueMatricule);

    // Dates
    cy.get('input[type="date"]').first().type("1990-01-01");
    cy.get('input[type="date"]').last().type("2026-02-02");

    // 4. SECTION : Statut
    // Même méthode directe pour le statut
    cy.get('select[name="status_id"]').select("Disponible", { force: true });

    // 5. Validation finale
    // On attend que le bouton soit prêt
    cy.contains("button", "Confirmer").scrollIntoView().click({ force: true });

    // 6. Vérification
    cy.url().should("include", "/drivers");
    cy.contains("Abdoul Rachid").should("be.visible");
  });
  it("Supprimer le chauffeur ", () => {
    cy.contains("Exploitation").click();
    cy.contains("Chauffeurs").click();

    // 1. On trouve la ligne et on clique sur supprimer
    cy.contains("tr", "Abdoul Rachid OUEDRAOGO").within(() => {
      cy.get(".btn-outline-danger").click();
    });

    // 2. On confirme dans la modale
    cy.get(".modal-footer").contains("Supprimer").click();

    // 3. ATTENTION : Ici le site a un bug de rafraîchissement
    // On attend que le message vert apparaisse pour confirmer que l'action est finie
    cy.contains("Suppression effectuée avec succès !").should("be.visible");

    // 4. SOLUTION TEMPORAIRE : On force le rafraîchissement de la page pour voir la vérité
    cy.reload();

    // 5. Maintenant, la vérification devrait passer
    cy.contains("Abdoul Rachid OUEDRAOGO", { timeout: 10000 }).should(
      "not.exist",
    );
  });
});
