const requete = require('supertest');
const app = require('../app');
jest.mock('../queries/RecetteQueries');
const mockRecetteQueries = require('../queries/RecetteQueries');


describe("tests routes", function () { // eslint-disable-line max-lines-per-function
    beforeEach(() => {
        jest.resetAllMocks();
    });
    describe("Route RECETTE", () => { // eslint-disable-line max-lines-per-function

        it("Get all recettes devrait retourner 200", async () => { 
            const mockAllRecettes = [
                {
                    id: "ape",
                    nom: "B",
                    description: "asdasdl",
                },
                {
                    id: "two",
                    nom: "tttt",
                    description: "123123123",
                }];

                mockRecetteQueries.getAllRecettes.mockResolvedValue(mockAllRecettes);

                const response = await requete(app).get('/recettes')
                expect(response.status).toBe(200);

        })
        it("GET recettes/:recetteId devrait retourner 200", async () => {
            const mockRecette = [
                {
                    id: "ape",
                    nom: "B",
                    description: "asdasdl",
                }];

            mockRecetteQueries.getRecetteById.mockResolvedValue(mockRecette);

            const response = await requete(app).get('/recettes/lasagnes');
            expect(response.status).toBe(200);
        })

        it("GET recettes/:recetteId devrait retourner 404", async () => {
            

            mockRecetteQueries.getRecetteById.mockResolvedValue(undefined);

            const response = await requete(app).get('/recettes/lasagnes');
            expect(response.status).toBe(404);
        })


    });

    describe("Route INGREDIENT",() => { // eslint-disable-line max-lines-per-function

        it("GET ingredients/:recetteId devrait retourner 200", async () => {
            const mockIngredients = {
                id: "tomate",
                nom: "tomate rouge",
                quantite: 2,
                uniteMesure: "ml"
            };
    
            mockRecetteQueries.getIngredientsSelonRecetteId.mockResolvedValue(mockIngredients);
    
            const response = await requete(app).get('/ingredients/tomate');
            expect(response.status).toBe(200);
        })

        it("GET ingredients/:recetteId devrait retourner 404", async () => {
            mockRecetteQueries.getIngredientsSelonRecetteId.mockResolvedValue(undefined);

            const response = await requete(app).get('/ingredients/tomate');
            expect(response.status).toBe(404);
        })
        
    })

    describe("Route ETAPE", () => {

        it("Get all etapes devrait retourner 200", async () => {

            const mockEtape = [{
                id: 1,
                description: "faire eau",
                ordre: 1
            }];

            mockRecetteQueries.getEtapesSelonRecetteId.mockResolvedValue(mockEtape);

            const response = await requete(app).get('/etapes/tomate');
            expect(response.status).toBe(200);
        })

        it("Get all etapes devrait retourner 404", async () => {

            const mockEtape = 
            [
                {}
            ];
            mockRecetteQueries.getEtapesSelonRecetteId.mockResolvedValue(mockEtape);

            const response = await requete(app).get('/etapes/tomate');
            expect(response.status).toBe(200);
        })
    })
});