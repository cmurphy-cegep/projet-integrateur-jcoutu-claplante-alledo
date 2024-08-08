const requete = require('supertest');
const app = require('../app');

describe("tests routes commentaires", function () {

    describe('GET /comments/:idRecette ', () => {

        it('Devrait retourner les bons commentaires de la recette_id', async () => {

            const mockCommentaire = [
                { texte: 'Ce spaghetti carbonara était vraiment délicieux! La recette est facile à suivre, et le résultat est digne d’un restaurant italien. Le mélange de la pancetta croustillante avec le parmesan et les œufs crée une sauce riche et onctueuse. J’ai ajouté un peu de poivre noir frais pour rehausser le goût. C’est définitivement une recette que je referai!', date_publication: '2024-08-01 10:15:30+02', utilisateur_id: 'claplante', recette_id: 'spaghetti_carbonara' },
                { texte: 'TRES BON!!!', date_publication: '2024-09-21 10:15:30+02', utilisateur_id: 'jscoutu', recette_id: 'spaghetti_carbonara' }
            ];
            return requete(app)
                .get("/comments/spaghetti_carbonara")
                .then((res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body).toEqual(mockCommentaire);
                })
        });
    });
});