const requete = require('supertest');
const passport = require('passport');
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

        it("GET all recettes devrait retourner une erreur", async () => {
            mockRecetteQueries.getAllRecettes.mockRejectedValue(new Error('Erreur lecture database'));

            const response = await requete(app).get('/recettes')
            expect(response.status).toBe(500);
        })

        it("GET all recettes devrait retourner une erreur", async () => {
            mockRecetteQueries.ajouterIngredient.mockRejectedValue(new Error('Erreur lecture database'));

            const response = await requete(app).get('/recettes/lasagnes')
            expect(response.status).toBe(500);
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

        it("POST recettes/ devrait retourner 404 droit utilisateur admin", async () => {
            const MockRecette =
            {
                id: "ape",
                nom: "B",
                description: "asdasdl",
                temps_preparation: 410,
                temps_cuisson: 30,
                nombre_portions: 2,
                image: "noImage"
            };
    
            mockRecetteQueries.getRecetteById.mockResolvedValue("ape");
            mockRecetteQueries.ajouterRecette.mockResolvedValue(MockRecette);
    
            const response = await requete(app).post('/recettes')
                .auth('alledo', '12345')
                .send(MockRecette);
    
            expect(response.status).toBe(404);
        })

        it("POST recettes/ devrait retourner 400 champ ID vide", async () => {
            const MockRecette = {
                id: "",
                nom: "B",
                description: "asdasdl",
                temps_preparation: 410,
                temps_cuisson: 30,
                nombre_portions: 2,
                image: "noImage"
            };
    
            mockRecetteQueries.getRecetteById.mockResolvedValue("");
            mockRecetteQueries.ajouterRecette.mockResolvedValue(MockRecette);
            
            const response = await requete(app)
                .post('/recettes')
                .auth('admin', '12345')
                .send(MockRecette);
    
    
            expect(response.status).toBe(400);
        })

        it("POST recettes/ devrait retourner 400 recette existe deja", async () => {
            const mockRecette = {
                id: "patate",
                nom: "B",
                description: "asdasdl",
                preparation: 410,
                cuisson: 30,
                portions: 2,
                image: "noImage"
            };
    
            mockRecetteQueries.getRecetteById.mockResolvedValue(mockRecette);

            const response = await requete(app)
                .post('/recettes')
                .auth('admin', '12345')
                .send({
                    id: "patate",
                    nom: "B",
                    description: "asdasdl",
                    preparation: 410,
                    cuisson: 30,
                    portions: 2,
                    image: "noImage"
                });
    
    
            expect(response.status).toBe(400);
        })

        it("POST recettes/ devrai retourner 200", async () => {
            const MockRecette = {
                id: "patate",
                nom: "B",
                description: "asdasdl",
                temps_preparation: 410,
                temps_cuisson: 30,
                nombre_portions: 2,
                image: "noImage"
            };
    
            mockRecetteQueries.getRecetteById.mockResolvedValue(null);
            mockRecetteQueries.ajouterRecette.mockResolvedValue(MockRecette);
            
            const response = await requete(app)
                .post('/recettes')
                .auth('admin', '12345')
                .send(MockRecette);
    
    
            expect(response.status).toBe(200);
        })

        it("PUT recettes/:id devrait retourner 404 droit administrateur requis", async () => {
            const MockRecette = {
                id: "patate",
                nom: "B",
                description: "asdasdl",
                temps_preparation: 410,
                temps_cuisson: 30,
                nombre_portions: 2,
                image: "noImage"
            };
    
            mockRecetteQueries.modifierRecette.mockResolvedValue(MockRecette);
            
            const response = await requete(app)
                .put('/recettes/patate')
                .auth('alledo', '12345')
                .send(MockRecette);
    
            expect(response.status).toBe(404);
        })

        it("PUT recettes/:id devrait retourner 400 paramètre id requis", async () => {
            const MockRecette = {
                nom: "B",
                description: "asdasdl",
                temps_preparation: 410,
                temps_cuisson: 30,
                nombre_portions: 2,
                image: "noImage"
            };
    
            mockRecetteQueries.modifierRecette.mockResolvedValue(MockRecette);
            
            const response = await requete(app)
                .put('/recettes/patate')
                .auth('admin', '12345')
                .send(MockRecette);
    
            expect(response.status).toBe(400);
        })

        it("PUT recettes/:id devrait retourner 400 ID != au req.body", async () => {
            const MockRecette = {
                id: "patate",
                nom: "B",
                description: "asdasdl",
                temps_preparation: 410,
                temps_cuisson: 30,
                nombre_portions: 2,
                image: "noImage"
            };
    
            mockRecetteQueries.modifierRecette.mockResolvedValue(MockRecette);
            
            const response = await requete(app)
                .put('/recettes/pate')
                .auth('admin', '12345')
                .send(MockRecette);
    
            expect(response.status).toBe(400);
        })

        it("PUT recettes/:id devrait retourner 404 recette introuvable", async () => {
            const MockRecette = {
                id: "patate",
                nom: "B",
                description: "asdasdl",
                temps_preparation: 410,
                temps_cuisson: 30,
                nombre_portions: 2,
                image: "noImage"
            };
    
            mockRecetteQueries.modifierRecette.mockResolvedValue(null);
            
            const response = await requete(app)
                .put('/recettes/patate')
                .auth('admin', '12345')
                .send(MockRecette);
    
            expect(response.status).toBe(404);
        })

        it("PUT recettes/:id devrait retourner 200", async () => {
            const MockRecette = {
                id: "patate",
                nom: "B",
                description: "asdasdl",
                temps_preparation: 410,
                temps_cuisson: 30,
                nombre_portions: 2,
                image: "noImage"
            };
    
            mockRecetteQueries.modifierRecette.mockResolvedValue(MockRecette);
            
            const response = await requete(app)
                .put('/recettes/patate')
                .auth('admin', '12345')
                .send(MockRecette);
    
    
            expect(response.status).toBe(200);
        })

        it("DELETE recettes/:id devrait 404 droit administrateur requis", async () => {
    
            const response = await requete(app)
                .delete('/recettes/patate')
                .auth('alledo', '12345')
                .send("allo");
    
            expect(response.status).toBe(404);
        })
    });

    describe("Route INGREDIENT", () => { // eslint-disable-line max-lines-per-function
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
        
        it("POST ingredients/ devrait retourner 403 droit administrateur requis", async () => {
            const mockIngredients = {
                id: "tomate",
                nom: "tomate rouge",
                quantite: 2,
                uniteMesure: "ml"
            };
    
            mockRecetteQueries.ajouterIngredient.mockResolvedValue(mockIngredients);
    
            const response = await requete(app).post('/ingredients')
                .auth('alledo', '12345')
                .send(mockIngredients);
    
            expect(response.status).toBe(403);
        })

        it("POST ingredients/ devrait renvoyer 404 impossible de rajouter l'ingredient", async () => {
            const mockIngredients = {
                id: "tomate",
                nom: "tomate rouge",
                quantite: 2,
                uniteMesure: "ml"
            };
    
            mockRecetteQueries.ajouterIngredient.mockResolvedValue(null);
    
            const response = await requete(app).post('/ingredients')
                .auth('admin', '12345')
                .send(mockIngredients);
    
            expect(response.status).toBe(404);
        })

        it("POST ingredients/ devrait renvoyer 200", async () => {
            const mockIngredients = {
                id: "tomate",
                nom: "tomate rouge",
                quantite: 2,
                uniteMesure: "ml"
            };
    
            mockRecetteQueries.ajouterIngredient.mockResolvedValue(mockIngredients);
    
            const response = await requete(app).post('/ingredients')
                .auth('admin', '12345')
                .send(mockIngredients);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockIngredients)
        })

        it("POST ingredients/ throw error", async () => {
            mockRecetteQueries.ajouterIngredient.mockRejectedValue(new Error('Erreur lecture database'));

            const response = await requete(app).post('/ingredients')
                .auth('admin', '12345')
                .send({
                    id: "tomate",
                    nom: "tomate rouge",
                    quantite: 2,
                    uniteMesure: "ml"
                });
            expect(response.status).toBe(500);
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

            const mockAppreciation = 1;

            mockRecetteQueries.getMoyenneAppreciationSelonRecetteId.mockResolvedValue(mockAppreciation);

            const response = await requete(app).get('/appreciations/tomate');
            expect(response.status).toBe(200);
        })

        it("GET all appreciations devrait retourner 204", async () => {
            mockRecetteQueries.getMoyenneAppreciationSelonRecetteId.mockResolvedValue(null);

            const response = await requete(app).get('/appreciations/tomate');
            expect(response.status).toBe(204);
        })

        it("GET all appreciations devrait retourner 404", async () => {
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