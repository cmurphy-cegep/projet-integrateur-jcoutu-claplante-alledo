jest.mock('../queries/DBPool');
const mockPool = require('../queries/DBPool');
const { getCommentairesSelonRecetteId, ajouterCommentaire } = require('../queries/RecetteQueries');



describe('tests queries commentaires', () => {  // eslint-disable-line max-lines-per-function

    it('getCommentairesSelonRecetteId devrait retourner un tableau de commentaires selon la recetteId', async () => {


        const mockCommentaires = [
            {
                commentaire_id: 31,
                texte: 'Ce spaghetti carbonara était vraiment délicieux!',
                date_formatee: '2024-08-01 08:15',
                utilisateur_id: 'claplante',
                recette_id: 'spaghetti_carbonara',
                nom_complet: 'Catherine Laplante'
            },

            {
                commentaire_id: 18,
                texte: 'spag bon!!!',
                date_formatee: '2024-09-21 08:15',
                utilisateur_id: 'jscoutu',
                recette_id: 'spaghetti_carbonara',
                nom_complet: 'Jean-Sébastien Coutu'
            }
        ];

        const expectedCommentaires = [
            {
                id: 31,
                texte: 'Ce spaghetti carbonara était vraiment délicieux!',
                date: '2024-08-01 08:15',
                utilisateurId: 'claplante',
                recetteId: 'spaghetti_carbonara',
                nomComplet: 'Catherine Laplante'
            },

            {
                id: 18,
                texte: 'spag bon!!!',
                date: '2024-09-21 08:15',
                utilisateurId: 'jscoutu',
                recetteId: 'spaghetti_carbonara',
                nomComplet: 'Jean-Sébastien Coutu'
            }];

        mockPool.query.mockResolvedValue({ rows: mockCommentaires });

        const commentaires = await getCommentairesSelonRecetteId("spaghetti_carbonara");

        expect(commentaires).toEqual(expectedCommentaires);
    });


    it('ajouterCommentaire', async () => {

        const mockNouveauCommentaire = {
            texte: 'Est ce que je peux enlever le poulet dans le poulet au curry',
            date_publication: '2024-09-02',
            utilisateur_id: 'claplante',
            recette_id: 'poulet_au_curry'
        };

        mockPool.query.mockResolvedValue({ rows: [mockNouveauCommentaire] });

        const commentaire = await ajouterCommentaire(mockNouveauCommentaire);

        expect(commentaire.texte).toEqual(mockNouveauCommentaire.texte);
        expect(commentaire.date).toBeDefined();
        expect(commentaire.utilisateurId).toEqual(mockNouveauCommentaire.utilisateur_id);
        expect(commentaire.recetteId).toEqual(mockNouveauCommentaire.recette_id);
    })

})