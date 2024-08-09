const nock = require('nock');
const requete = require('supertest');
const app = require('../app');
const { getCommentairesSelonRecetteId } = require('../queries/RecetteQueries');
const { ajouterCommentaire } = require('../queries/RecetteQueries');


describe("tests commentaires", function () {

    describe('tests routes commentaires', () => {

        it('GET/ Devrait retourner les bons commentaires de la recette_id', () => {

            const mockCommentaires = [
                { id: 1, texte: 'Ce spaghetti carbonara était vraiment délicieux! La recette est facile à suivre, et le résultat est digne d’un restaurant italien. Le mélange de la pancetta croustillante avec le parmesan et les œufs crée une sauce riche et onctueuse. J’ai ajouté un peu de poivre noir frais pour rehausser le goût. C’est définitivement une recette que je referai!', date: '2024-08-01T08:15:30.000Z', utilisateurId: 'claplante', recetteId: 'spaghetti_carbonara' },
                { id: 8, texte: 'TRES BON!!!', date: '2024-09-21T08:15:30.000Z', utilisateurId: 'jscoutu', recetteId: 'spaghetti_carbonara' }
            ];

            return requete(app)
                .get("/comments/spaghetti_carbonara") // TODO : MOCK
                .then((res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body).toEqual(mockCommentaires);
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

        it('POST/ commentaire', () => {
            jest.mock('../queries/RecetteQueries');
            const mockRecetteQueries = require('../queries/RecetteQueries');

            const mockNouveauCommentaire = {
                texte: 'Est ce que je peux enlever le poulet dans le poulet au curry',
                utilisateur_id: 'claplante',
                recette_id: 'poulet_au_curry'
            }

            mockRecetteQueries.ajouterCommentaire.mockResolvedValue(mockNouveauCommentaire);

            const mockNouveauCommentaireFinal = {
                texte: 'Est ce que je peux enlever le poulet dans le poulet au curry',
                utilisateurId: 'claplante',
                recetteId: 'poulet_au_curry'
            }

            return requete(app)
                .post("/comments/poulet_au_curry")
                .auth('claplante', '12345')
                .send(mockNouveauCommentaire)
                .then((res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body).toEqual(mockNouveauCommentaireFinal);
                })
        });
    });

    describe('tests queries commentaires', () => {



        it('getCommentairesSelonRecetteId devrait retourner un tableau de commentaires selon la recetteId', async () => {

            jest.mock('../queries/DBPool');
            const mockPool = require('../queries/DBPool');

            const mockCommentaires = [
                { commentaire_id: 1, texte: 'Ce spaghetti carbonara était vraiment délicieux! La recette est facile à suivre, et le résultat est digne d’un restaurant italien. Le mélange de la pancetta croustillante avec le parmesan et les œufs crée une sauce riche et onctueuse. J’ai ajouté un peu de poivre noir frais pour rehausser le goût. C’est définitivement une recette que je referai!', date_publication: '2024-08-01T08:15:30.000Z', utilisateur_id: 'claplante', recette_id: 'spaghetti_carbonara' },
                { commentaire_id: 8, texte: 'TRES BON!!!', date_publication: '2024-09-21T08:15:30.000Z', utilisateur_id: 'jscoutu', recette_id: 'spaghetti_carbonara' }
            ];

            mockPool.query.mockResolvedValueOnce({ rows: mockCommentaires });
            mockRecetteQueries.ajouterCommentaire.mockResolvedValue(mockCommentaires);
            
            const recetteId = 'spaghetti_carbonara';
            const commentaires = await getCommentairesSelonRecetteId(recetteId); // mock
            
            const mockCommentaireFinal = [
                { id: 1, texte: 'Ce spaghetti carbonara était vraiment délicieux! La recette est facile à suivre, et le résultat est digne d’un restaurant italien. Le mélange de la pancetta croustillante avec le parmesan et les œufs crée une sauce riche et onctueuse. J’ai ajouté un peu de poivre noir frais pour rehausser le goût. C’est définitivement une recette que je referai!', date: '2024-08-01T08:15:30.000Z', utilisateurId: 'claplante', recetteId: 'spaghetti_carbonara' },
                { id: 8, texte: 'TRES BON!!!', date: '2024-09-21T08:15:30.000Z', utilisateurId: 'jscoutu', recetteId: 'spaghetti_carbonara' }
            ];

            expect(Array.isArray(commentaires)).toBe(true);
            expect(commentaires).toEqual(mockCommentaireFinal);
        });

        it('ajouterCommentaire', async () => {
            jest.mock('../queries/RecetteQueries');
            const mockRecetteQueries = require('../queries/RecetteQueries');

            const mockNouveauCommentaire = {
                texte: 'Est ce que je peux enlever le poulet dans le poulet au curry',
                utilisateur_id: 'claplante',
                recette_id: 'poulet_au_curry'
            }

            mockRecetteQueries.ajouterCommentaire.mockResolvedValue(mockNouveauCommentaire);

            const commentaire = await mockRecetteQueries.ajouterCommentaire(mockNouveauCommentaire);

            expect(commentaire).toEqual(mockNouveauCommentaire);
        })

    })
});