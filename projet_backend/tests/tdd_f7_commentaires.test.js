jest.mock('../queries/DBPool');
const requete = require('supertest');
const app = require('../app');
const mockPool = require('../queries/DBPool');
const { getCommentairesSelonRecetteId } = require('../queries/RecetteQueries');

describe("tests commentaires", function () {

    describe('tests routes commentaires', () => {

        it('GET/ Devrait retourner les bons commentaires de la recette_id', async () => {

            const mockCommentaire = [
                { commentaire_id: 1, texte: 'Ce spaghetti carbonara était vraiment délicieux! La recette est facile à suivre, et le résultat est digne d’un restaurant italien. Le mélange de la pancetta croustillante avec le parmesan et les œufs crée une sauce riche et onctueuse. J’ai ajouté un peu de poivre noir frais pour rehausser le goût. C’est définitivement une recette que je referai!', date: '2024-08-01T08:15:30.000Z', utilisateur_id: 'claplante', recette_id: 'spaghetti_carbonara' },
                { commentaire_id: 8, texte: 'TRES BON!!!', date: '2024-09-21T08:15:30.000Z', utilisateur_id: 'jscoutu', recette_id: 'spaghetti_carbonara' }
            ];
            return requete(app)
                .get("/comments/spaghetti_carbonara")
                .then((res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body).toEqual(mockCommentaire);
                })
        });

        it('GET/ Devrait retourner erreur 404', () => {
            mockReponseError = {
                status: 404,
                message: "Liste de commentaires pour la recette spaghetti_carbonara-id-nexiste-pas-pour-test introuvable"

            }
            return requete(app)
                .get("/comments/spaghetti_carbonara-id-nexiste-pas-pour-test")
                .then((res) => {
                    expect(res.statusCode).toBe(404);
                    expect(res.body).toEqual(mockReponseError);
                })
        });
    });

    describe('tests queries commentaires', () => {

        it('getCommentairesSelonRecetteId devrait retourner un tableau de commentaires selon la recetteId', async () => {
            const mockCommentaire = [
                { commentaire_id: 1, texte: 'Ce spaghetti carbonara était vraiment délicieux! La recette est facile à suivre, et le résultat est digne d’un restaurant italien. Le mélange de la pancetta croustillante avec le parmesan et les œufs crée une sauce riche et onctueuse. J’ai ajouté un peu de poivre noir frais pour rehausser le goût. C’est définitivement une recette que je referai!', date: '2024-08-01T08:15:30.000Z', utilisateur_id: 'claplante', recette_id: 'spaghetti_carbonara' },
                { commentaire_id: 8, texte: 'TRES BON!!!', date: '2024-09-21T08:15:30.000Z', utilisateur_id: 'jscoutu', recette_id: 'spaghetti_carbonara' }
            ];

            mockPool.query.mockResolvedValueOnce({ rows: mockCommentaire });
            
            const recetteId = 'spaghetti_carbonara';
            const commentaires = await getCommentairesSelonRecetteId(recetteId);
        
            expect(Array.isArray(commentaires)).toBe(true);
            expect(commentaires).toEqual(mockCommentaire);
        });

    })
});