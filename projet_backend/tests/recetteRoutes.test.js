const requete = require('supertest');
const app = require('../app');

describe("tests routes recettes", function () {

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