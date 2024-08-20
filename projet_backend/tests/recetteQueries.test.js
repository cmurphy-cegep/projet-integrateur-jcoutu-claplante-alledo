jest.mock('../queries/DBPool');
const mockPool = require('../queries/DBPool');
const { getEtapesSelonRecetteId, getAllRecettes, getRecetteById, getIngredientsSelonRecetteId, getMoyenneAppreciationSelonRecetteId, aDejaFaitAppreciationSurRecetteId, ajouterAppreciation, modifierAppreciation } = require('../queries/RecetteQueries');

describe("Test Queries", () => {  // eslint-disable-line max-lines-per-function
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe("Test Recettes", () => {  // eslint-disable-line max-lines-per-function
        it("getAllRecettes devrait retourner les recettes", async () => {
            const mockRecettes = [
                {
                    recette_id: "tomate",
                    nom: "tomate",
                    description: "Des bonnes tomates dans un bol",
                    temps_preparation: 5,
                    temps_cuisson: 0,
                    nombre_portions: 1,
                    image: ""
                },

                {
                    recette_id: "poulet",
                    nom: "poulet",
                    description: "Des bonnes cuisse de poulet dans un bol",
                    temps_preparation: 5,
                    temps_cuisson: 15,
                    nombre_portions: 1,
                    image: ""
                }
            ];

            const expectedRecettes = [
                {
                    id: "tomate",
                    nom: "tomate",
                    desc: "Des bonnes tomates dans un bol",
                    preparation: 5,
                    cuisson: 0,
                    portions: 1,
                    image: ""
                },

                {
                    id: "poulet",
                    nom: "poulet",
                    desc: "Des bonnes cuisse de poulet dans un bol",
                    preparation: 5,
                    cuisson: 15,
                    portions: 1,
                    image: ""
                }
            ];

            mockPool.query.mockResolvedValue({ rows: mockRecettes });
            const response = await getAllRecettes();
            expect(response).toEqual(expectedRecettes);

        })

        it("getRecetteById devrait retourner la bonne recette", async () => {
            const mockRecettes = [
                {
                    recette_id: "poulet",
                    nom: "poulet",
                    description: "Des bonnes cuisse de poulet dans un bol",
                    temps_preparation: 5,
                    temps_cuisson: 15,
                    nombre_portions: 1,
                    image: ""
                }];

            const expectedRecette = {
                id: "poulet",
                nom: "poulet",
                description: "Des bonnes cuisse de poulet dans un bol",
                preparation: 5,
                cuisson: 15,
                portions: 1,
                image: ""
            }

            mockPool.query.mockResolvedValue({ rows: mockRecettes });
            const recetteId = "poulet";
            const response = await getRecetteById(recetteId);
            expect(response).toEqual(expectedRecette);
        })
    })

    describe("Test Ingredients", () => { // eslint-disable-line max-lines-per-function
        it("getIngredientsSelonRecetteId devrait retourner les ingredients de la recette", async () => {
            const mockIngredients = [{
                ingredient_id: 1,
                nom: "popcorn",
                quantite: 20,
                unite_mesure: "g"
            },
            {
                ingredient_id: 2,
                nom: "mais",
                quantite: 10,
                unite_mesure: "ml"
            }
            ]


            const expectedIngredients = [{
                id: 1,
                nom: "popcorn",
                quantite: 20,
                uniteMesure: "g"
            },
            {
                id: 2,
                nom: "mais",
                quantite: 10,
                uniteMesure: "ml"
            }];

            mockPool.query.mockResolvedValue({ rows: mockIngredients });
            const recetteId = "poulet";
            const response = await getIngredientsSelonRecetteId(recetteId);
            expect(response).toEqual(expectedIngredients);
        })

    })

    describe("Test Etapes", () => { // eslint-disable-line max-lines-per-function
        it("getEtapesSelonRecetteId retourne les etapes de la recettes", async () => {
            const mockEtapes = [{
                etape_id: 1,
                description: "casser l'oeuf",
                ordre: 1
            },
            {
                etape_id: 2,
                description: "brasser oeuf",
                ordre: 2
            },
            {
                etape_id: 3,
                description: "cuire oeuf",
                ordre: 3
            }]

            const expectedEtapes = [{
                id: 1,
                description: "casser l'oeuf",
                ordre: 1
            },
            {
                id: 2,
                description: "brasser oeuf",
                ordre: 2
            },
            {
                id: 3,
                description: "cuire oeuf",
                ordre: 3
            }]

            mockPool.query.mockResolvedValue({ rows: mockEtapes });
            const recetteId = "poulet";
            const response = await getEtapesSelonRecetteId(recetteId);
            expect(response).toEqual(expectedEtapes);
        })
    })

    describe("Test Appreciation", () => { // eslint-disable-line max-lines-per-function
        it("getMoyenneAppreciationSelonRecetteId devrait retourner la moyenne en Nombre", async () => {
            const mockMoyenne = [{ moyenne_etoiles: 4 }];

            mockPool.query.mockResolvedValue({ rows: mockMoyenne });
            const recetteId = "poulet";
            const response = await getMoyenneAppreciationSelonRecetteId(recetteId)
            expect(Number.isInteger(response)).toBe(true);
            expect(response).toEqual(4);
        })

        it("aDejaFaitAppreciationSurRecetteId retourne un boolean TRUE", async () => {
            const mockAppreciations = [{
                etoiles: 1,
                recette_id: "popcorn",
                utilisateur_id: "alledo"
            }];

            mockPool.query.mockResolvedValue({ rows: mockAppreciations });
            const recetteId = "poulet";
            const response = await aDejaFaitAppreciationSurRecetteId(recetteId)
            expect(response).toBe(true);
        })

        it("aDejaFaitAppreciationSurRecetteId retourne un boolean FALSE", async () => {
            const mockAppreciations = [];

            mockPool.query.mockResolvedValue({ rows: mockAppreciations });
            const recetteId = "poulet";
            const response = await aDejaFaitAppreciationSurRecetteId(recetteId)
            expect(response).toBe(false);
        })

        it("ajouterAppreciation devrait ajouter l'appreciation sur la recetteId", async () => {
            const mockAppreciation = {
                etoiles: 1,
                recette_id: "popcorn",
                utilisateur_id: "alledo"
            };

            mockPool.query.mockResolvedValue({ rows: [mockAppreciation] });
            const appreciation = await ajouterAppreciation(mockAppreciation);
            console.log(mockAppreciation);
            console.log("==============");
            console.log(appreciation)
            expect(appreciation.nbEtoiles).toEqual(1);
            expect(appreciation.utilisateurId).toEqual(mockAppreciation.utilisateur_id);
            expect(appreciation.recetteId).toEqual(mockAppreciation.recette_id);
        })
    })
})


