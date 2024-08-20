const requete = require('supertest');
const app = require('../app');
jest.mock('../queries/RecetteQueries');
const mockRecetteQueries = require('../queries/RecetteQueries');


describe("tests routes", () => { // eslint-disable-line max-lines-per-function
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

        it("GET all etapes devrait retourner 200", async () => {

            const mockEtape = [{
                id: 1,
                description: "faire eau",
                ordre: 1
            }];

            mockRecetteQueries.getEtapesSelonRecetteId.mockResolvedValue(mockEtape);

            const response = await requete(app).get('/etapes/tomate');
            expect(response.status).toBe(200);
        })

        it("GET all etapes devrait retourner 404", async () => {

            const mockEtape = 
            [
                {}
            ];
            mockRecetteQueries.getEtapesSelonRecetteId.mockResolvedValue(mockEtape);

            const response = await requete(app).get('/etapes/tomate');
            expect(response.status).toBe(200);
        })
    })

    describe("Route APPRECIATION", () => { // eslint-disable-line max-lines-per-function
        it("GET all appreciations devrait retourner 200", async () => {

            const mockAppreciation = 1 ;

            mockRecetteQueries.getMoyenneAppreciationSelonRecetteId.mockResolvedValue(mockAppreciation);

            const response = await requete(app).get('/appreciations/tomate');
            expect(response.status).toBe(200);
        })

        it("GET all appreciations devrait retourner 204" , async () => {
            mockRecetteQueries.getMoyenneAppreciationSelonRecetteId.mockResolvedValue(null);

            const response = await requete(app).get('/appreciations/tomate');
            expect(response.status).toBe(204);
        })

        it("GET all appreciations devrait retourner 404" , async () => {
            mockRecetteQueries.getMoyenneAppreciationSelonRecetteId.mockResolvedValue(undefined);

            const response = await requete(app).get('/appreciations/tomate');
            expect(response.status).toBe(404);
        })

        it("POST appreciation AJOUT devrait retourner 200", async () => {
            const MockAppreciation =
        {
            etoiles: 1,
            utilisateurId: "alledo",
            recetteId: "lasagnes"
        };

        mockRecetteQueries.aDejaFaitAppreciationSurRecetteId.mockResolvedValue(false);
        mockRecetteQueries.ajouterAppreciation.mockResolvedValue(MockAppreciation);

        const response = await requete(app).post('/appreciations/lasagnes')
            .auth('alledo', '12345')
            .send(MockAppreciation);

        expect(response.status).toBe(200);
        })

        it("POST appreciation AJOUT devrait retourner 404", async () => {
            const MockAppreciation =
        {
            etoiles: 1,
            utilisateurId: "alledo",
            recetteId: "lasagnes"
        };

        mockRecetteQueries.aDejaFaitAppreciationSurRecetteId.mockResolvedValue(false);
        mockRecetteQueries.ajouterAppreciation.mockResolvedValue(undefined);

        const response = await requete(app).post('/appreciations/lasagnes')
            .auth('alledo', '12345')
            .send(MockAppreciation);

        expect(response.status).toBe(404);
        })

        it("POST appreciation MODIFICATION devrait retourner 200", async () => {
            const MockAppreciation =
        {
            etoiles: 1,
            utilisateurId: "alledo",
            recetteId: "lasagnes"
        };

        mockRecetteQueries.aDejaFaitAppreciationSurRecetteId.mockResolvedValue(true);
        mockRecetteQueries.modifierAppreciation.mockResolvedValue(MockAppreciation);

        const response = await requete(app).post('/appreciations/lasagnes')
            .auth('alledo', '12345')
            .send(MockAppreciation);

        expect(response.status).toBe(200);
        })

        it("POST appreciation MODIFICATION devrait retourner 404", async () => {
            const MockAppreciation =
        {
            etoiles: 1,
            utilisateurId: "alledo",
            recetteId: "lasagnes"
        };

        mockRecetteQueries.aDejaFaitAppreciationSurRecetteId.mockResolvedValue(true);
        mockRecetteQueries.modifierAppreciation.mockResolvedValue(undefined);

        const response = await requete(app).post('/appreciations/lasagnes')
            .auth('alledo', '12345')
            .send(MockAppreciation);

        expect(response.status).toBe(404);
        })
    })
});