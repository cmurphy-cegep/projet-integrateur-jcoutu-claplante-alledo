const requete = require('supertest');
const app = require('../app');

describe("tests routes recettes", function () {


    // describe('GET /commentaire/:idRecette/:idUtilisateur ', () => {

    //     const mockCommentaire = [
    //         { texte: 'Préparer la sauce béchamel de la bonne facon.', date_publication: '2024-08-06 10:00:00+00', utilisateur_id: 'test', recette_id: 'lasagnes' },
    //         { texte: 'ASDASCSNCAS.', date_publication: '2024-08-06 17:00:00+00', utilisateur_id: 'admin', recette_id: 'lasagnes' },
    //     ];

    //     it('should return the correct recipe with comments', async () => {
    //         const response = await request(app).get('/commentaire/lasagnes/test');
    //         expect(response.status).toBe(200);
    //         expect(response.body).toEqual(mockCommentaire);
    //         expect(response.body.comments).toBeInstanceOf(Array);
    //         expect(response.body.comments.length).toBe(2);
    //         expect(response.body.comments[0].text).toBe('Excellent!');
    //         expect(response.body.comments[1].text).toBe('Très bon!');
    //     });
    // });

    // describe('GET /etapes/:idRecette', () => {
    //     test('should return the correct recipe with etapes', async () => {


    //         const mockEtape = [
    //             { etape_id: 27,	description: "Préparer la sauce béchamel.", ordre: 1, recette_id: 'lasagnes' },
    //             { etape_id: 28,	description: "Assembler les couches de pâtes, viande et sauce.", ordre: 2, recette_id: 'lasagnes'},
    //             { etape_id: 29,	description: "Faire cuire au four.", ordre: 3, recette_id: 'lasagnes'}
    //         ];
    //         return request(app).get('etapes/lasagnes')
    //         expect(response.status).toBe(200);
    //         console.log(response.body);
    //         // expect(response.body).toEqual(mockEtape);
    //         // expect(response.body.comments).toBeInstanceOf(Array);
    //         // expect(response.body.comments.length).toBe(3);
    //         // expect(response.body.comments[0].text).toBe("Préparer la sauce béchamel.");
    //         // expect(response.body.comments[1].text).toBe("Assembler les couches de pâtes, viande et sauce.");
    //         // expect(response.body.comments[2].text).toBe("Faire cuire au four.");
    //     });
    // });

    describe('GET /etapes/:idRecette', () => {
        it('should return the correct recipe with etapes', async () => {
            const mockEtape = [
                { id: 27, description: "Préparer la sauce béchamel.", ordre: 1 },
                { id: 28, description: "Assembler les couches de pâtes, viande et sauce.", ordre: 2 },
                { id: 29, description: "Faire cuire au four.", ordre: 3 }
            ];
            return requete(app)
                .get("/etapes/lasagnes")
                .then((res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body).toEqual(mockEtape);
                })
        });
        it('Should return Error 404', () => {
            mockReponseError = {
                status: 404,
                message: "Liste d'étapes recette-id-nexiste-pas-pour-test introuvable"

            }
            return requete(app)
                .get("/etapes/recette-id-nexiste-pas-pour-test")
                .then((res) => {
                    expect(res.statusCode).toBe(404);
                    expect(res.body).toEqual(mockReponseError);
                })
        })
    });
});