const requete = require('supertest');
const passport = require('passport');
const app = require('../app');
jest.mock('../queries/RecetteQueries');
const mockRecetteQueries = require('../queries/CompteUtilisateurQueries');

it("GET /connexion devrait retourner utilisateur", async () => {

    const expectedUtilisateur = {
        compteUtilisateurId: "alledo",
        utilisateurNomComplet: "Alexandre Lledo",
        estAdmin: false
     }
    const response = await requete(app).get('/connexion')
        .auth('alledo', '12345')
        .send("test");
    expect(response.status).toBe(200);
})

// it("POST /connexion devrait retourner 200", async () => {
//     const utilisateur = {
//         utilisateur_id: "alledo",
//         nom_complet: "Alexandre Lledo",
//         mot_de_passe_hash: "123edacjdsv",
//         mot_de_passe_sale: "ddavaboa55",
//         est_admin: false
//     };

//     const expectedUtilisateur = {
//         utilisateurId: "alledo",
//         nom: "Alexandre Lledo",
//         estAdmin: false
//     };

//     mockRecetteQueries.verifierExistenceUtilisateur.mockResolvedValue(false);
//     mockRecetteQueries.creerCompteUtilisateur.mockResolvedValue(expectedUtilisateur);

//     const response = await requete(app)
//     .post('/connexion')
//     .auth('admin', '12345')
//     .send(utilisateur);


// expect(response.status).toBe(200);
// })
