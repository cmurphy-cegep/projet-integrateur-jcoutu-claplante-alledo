const app = require('../app');
const requete = require('supertest');
jest.mock('../queries/RecetteQueries');
const mockRecetteQueries = require('../queries/RecetteQueries');

describe('tests routes commentaires', () => { // eslint-disable-line max-lines-per-function

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("GET /:id devrait retourner 200", async () => {

        const Mockcommentaire = [
            {
                id: "1",
                texte: "allo",
                utilisateur_id: "alex",
                recette_id: "lasagnes"
            }];


        mockRecetteQueries.getCommentairesSelonRecetteId.mockResolvedValue(Mockcommentaire);

        const response = await requete(app).get('/comments/lasagnes');
        expect(response.status).toBe(200);
    })


    it("POST /:id devrait retourner 200", async () => {

        const Mockcommentaire =
        {
            id: "1",
            texte: "allo",
            utilisateurId: "alledo",
            recetteId: "lasagnes"
        };

        mockRecetteQueries.getRecetteById.mockResolvedValue(Mockcommentaire);
        mockRecetteQueries.ajouterCommentaire.mockResolvedValue(Mockcommentaire);

        const response = await requete(app).post('/comments/lasagnes')
            .auth('alledo', '12345')
            .send(Mockcommentaire);

        expect(response.status).toBe(200);
    })

    it("POST /:id devrait retourner 403 mauvais UtilisateurID", async () => {

        const Mockcommentaire =
        {
            id: "1",
            texte: "allo",
            utilisateurId: "asd",
            recetteId: "lasagnes"
        };

        mockRecetteQueries.ajouterCommentaire.mockResolvedValue(Mockcommentaire);

        const response = await requete(app).post('/comments/lasagnes')
            .auth('alledo', '12345')
            .send(Mockcommentaire);

        expect(response.status).toBe(403);
    })

    it("POST /:id devrait retourner 400 RecetteId requis", async () => {

        const Mockcommentaire =
        {
            id: "1",
            texte: "allo",
            date: "2004",
            utilisateurId: "alledo",
            recetteId: ""
        };

        mockRecetteQueries.ajouterCommentaire.mockResolvedValue(Mockcommentaire);

        const response = await requete(app).post('/comments/lasagnes')
            .auth('alledo', '12345')
            .send(Mockcommentaire);

        expect(response.status).toBe(400);
    })


    it("POST /:id devrait retourner 404 not found", async () => {
        const Mockcommentaire =
        {
            id: "1",
            texte: "allo",
            date: "2004",
            utilisateurId: "alledo",
            recetteId: "lasagnes"
        };

        mockRecetteQueries.getRecetteById.mockResolvedValue(undefined);

        const response = await requete(app).post('/comments/lasagnes')
            .auth('alledo', '12345')
            .send(Mockcommentaire);

        expect(response.status).toBe(404);
    })

});