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
                    utilisateur_id: "alex",
                    recette_id: "lasagnes"
                }];

            mockRecetteQueries.getCommentairesSelonRecetteId.mockResolvedValue(Mockcommentaire);

            const response = await requete(app).get('/comments/lasagnes');
            expect(response.status).toBe(200);
        })

        it("GET /:id devrait retourner 404 ID not found", async () => {

            const Mockcommentaire = [];
            console.log(mockRecetteQueries);
            mockRecetteQueries.getCommentairesSelonRecetteId.mockResolvedValue(Mockcommentaire);

            const response = await requete(app).get('/comments/lasagnes');
            expect(response.status).toBe(404);
        })

        it("POST /:id devrait retourner 200", async () => {

            const Mockcommentaire =
            {
                id: "lasagnes",
                texte: "allo",
                date: "2004",
                utilisateur_id: "alledo",
                recette_id: "lasagnes"
            };

            mockRecetteQueries.ajouterCommentaire.mockResolvedValue(Mockcommentaire);

            const response = await requete(app).post('/comments/lasagnes')
                .auth('alledo', '12345')
                .send(Mockcommentaire);

            expect(response.status).toBe(200);
        })

        it("POST /:id devrait retourner 403 mauvais UtilisateurID", async () => {

            const Mockcommentaire =
            {
                id: "lasagnes",
                texte: "allo",
                date: "2004",
                utilisateur_id: "asd",
                recette_id: "lasagnes"
            };

            mockRecetteQueries.ajouterCommentaire.mockResolvedValue(Mockcommentaire);

            const response = await requete(app).post('/comments/lasagnes')
                .auth('alledo', '12345')
                .send(Mockcommentaire);

            expect(response.status).toBe(403);
        })

        it("POST /:id devrait retourner 404 mauvais RecetteID", async () => {

            const Mockcommentaire =
            {
                id: "lasagnes",
                texte: "allo",
                date: "2004",
                utilisateur_id: "alledo",
                recette_id: ""
            };

            mockRecetteQueries.ajouterCommentaire.mockResolvedValue(Mockcommentaire);

            const response = await requete(app).post('/comments/lasagnes')
                .auth('alledo', '12345')
                .send(Mockcommentaire);

            expect(response.status).toBe(400);
        })
    

    it("POST /:id devrait retourner 404 not found", async () => {

    })

    it("POST /:id devrait retourner 404 Impossible d'ajouter le commentaire", async () => {

    })

})
    
    describe('tests queries commentaires', () => {
    
    
    });

});
