const requete = require('supertest');
const passport = require('passport');
const app = require('../app');
jest.mock('../queries/RecetteQueries');
const mockRecetteQueries = require('../queries/RecetteQueries');

describe("Test connexionRoute", ( )=>{

    beforeEach(() => {
       
        jest.resetAllMocks();
    });

    it("GET / devrait retourner 200", async () => {
        const utilisateurDetails = {
            compteUtilisateurId: "alledo",
            utilisateurNomComplet: "Alexandre Lledo",
            estAdmin: true
         };

        const response = await requete(app)
            .get('/connexion')
            .expect(200);

        expect(response.body).toEqual({
            compteUtilisateurId: 'alledo',
            utilisateurNomComplet: 'Alexandre Lledo',
            estAdmin: true
        });
    })
})