const requete = require('supertest');
const app = require('../app');
const { getCommentairesSelonRecetteId } = require('../queries/RecetteQueries');
const { ajouterCommentaire } = require('../queries/RecetteQueries');


describe("tests commentaires", function () {

    beforeEach(() => {
        jest.resetAllMocks();
    });
    
    describe('tests routes commentaires', () => {
        jest.mock('../queries/RecetteQueries');

        it("GET /:id devrait retourner 200", async () => {
            const Mockcommentaire = {
                id: row.commentaire_id,
                texte: row.texte,
                date: row.date_publication.toISOString(),
                utilisateurId: row.utilisateur_id,
                recetteId: row.recette_id
            };
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
