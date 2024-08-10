const app = require('../app');
const requete = require('supertest');
jest.mock('../queries/RecetteQueries');
const mockRecetteQueries = require('../queries/RecetteQueries');


describe("tests commentaires", function () {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('tests routes commentaires', () => {


        it("GET /:id devrait retourner 200", async () => {

            const Mockcommentaire = [
                {
                id: "lasagnes",
                texte: "allo",
                date: "2004",
                utilisateurId: "alex",
                recetteId: "lasagnes"
            }];
            console.log(mockRecetteQueries);
            mockRecetteQueries.getCommentairesSelonRecetteId.mockResolvedValue(Mockcommentaire);

            const response = await requete(app).get('/comments/lasagnes');
            expect(response.status).toBe(200);
        })

        it("GET /:id devrait retourner 404 ID not found", () => {

        })

        it("POST /:id devrait retourner 200", () => {

        })

        it("POST /:id devrait retourner 403 Droit acces", () => {

        })

        it("POST /:id devrait retourner 403 mauvais UtilisateurID", () => {

        })

        it("POST /:id devrait retourner 404 mauvais RecetteID", () => {

        })

        it("POST /:id devrait retourner 404 not found", () => {

        })

        it("POST /:id devrait retourner 404 Impossible d'ajouter le commentaire", () => {

        })

    });

    describe('tests queries commentaires', () => {
        jest.mock('../queries/DBPool');


    })
});
