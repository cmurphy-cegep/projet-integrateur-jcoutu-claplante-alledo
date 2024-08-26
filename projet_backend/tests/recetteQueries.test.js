jest.mock('../queries/DBPool');
const mockPool = require('../queries/DBPool');
const recetteQueries = require('../queries/RecetteQueries')

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
            const response = await recetteQueries.getAllRecettes();
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
            const response = await recetteQueries.getRecetteById(recetteId);
            expect(response).toEqual(expectedRecette);
        })

        it('getRecetteById devrait retourner undefined si la recette est introuvable', async () => {
            mockPool.query.mockResolvedValue({ rows: [] });

            const recetteId = "test";
            const result = await recetteQueries.getRecetteById(recetteId);

            expect(result).toBeUndefined();
        })

        it('getRecetteById devrait throw un erreur quand la query fail', async () => {
            const recetteId = "test";
            mockPool.query.mockResolvedValue({});

            await expect(recetteQueries.getIngredientsSelonRecetteId(recetteId)).rejects.toThrow('Impossible de fetch les ingredients');
        });

        it("insererDansTableRecette devrait retourner le bon query", async () => {
            const recette = {
                id: 1,
                nom: 'Test',
                desc: 'Un bon test',
                preparation: 10,
                cuisson: 30,
                portions: 4
            };

            const reponse = await recetteQueries.insererDansTableRecette(recette, mockPool);
            mockPool.query.mockResolvedValue({});

            expect(mockPool.query).toHaveBeenCalledWith(
                `INSERT INTO recette (recette_id, nom, description, temps_preparation, temps_cuisson, nombre_portions) 
        VALUES ($1, $2, $3, $4, $5, $6)`, // ne pas changer la tabulation ne marchera pas si on a trop d'espace avant VALUES
                [recette.id, recette.nom, recette.desc, recette.preparation, recette.cuisson, recette.portions]
            );
        })

        it("insererDansTableRecetteIngredient devrait retourner le bon query", async () => {
            const idRecette = 1;
            const idIngredient = 2;
            const ingredient = {
                quantite: 100,
                uniteMesure: 'g'
            };
            const ordreIngredient = 1;

            const reponse = await recetteQueries.insererDansTableRecetteIngredient(idRecette, idIngredient, ingredient, ordreIngredient, mockPool);
            mockPool.query.mockResolvedValue({});

            expect(mockPool.query).toHaveBeenCalledWith(
                `INSERT INTO recette_ingredient (recette_id, ingredient_id, quantite, unite_mesure, ordre) 
        VALUES ($1, $2, $3, $4, $5)`, // ne pas changer la tabulation ne marchera pas si on a trop d'espace avant VALUES
                [idRecette, idIngredient, ingredient.quantite, ingredient.uniteMesure, ordreIngredient]
            );
        })

        it("modifierDansTableRecette devrait retourner le bon query", async () => {
            const recette = {
                id: 1,
                nom: 'Test',
                desc: 'Un bon test',
                preparation: 10,
                cuisson: 30,
                portions: 4
            };
            const reponse = await recetteQueries.modifierDansTableRecette(recette, mockPool);
            mockPool.query.mockResolvedValue({});

            expect(mockPool.query).toHaveBeenCalledWith(
                `UPDATE recette SET nom = $2, description = $3, temps_preparation = $4, temps_cuisson = $5, nombre_portions = $6 
        WHERE recette_id = $1`,
                [recette.id, recette.nom, recette.desc, recette.preparation, recette.cuisson, recette.portions]
            );
        })

        it("supprimerLignesTableRecetteIngredientSelonIdRecette devrait retourner le bon query", async () => {

            const idRecette = "patate";

            const reponse = await recetteQueries.supprimerLignesTableRecetteIngredientSelonIdRecette(idRecette, mockPool);
            mockPool.query.mockResolvedValue({});

            expect(mockPool.query).toHaveBeenCalledWith(
                `DELETE FROM recette_ingredient WHERE recette_id = $1`,
                [idRecette]
            );
        })

        it("supprimerLignesTableEtapeSelonIdRecette devrait retourner le bon query", async () => {

            const idRecette = "patate";

            const reponse = await recetteQueries.supprimerLignesTableEtapeSelonIdRecette(idRecette, mockPool);
            mockPool.query.mockResolvedValue({});

            expect(mockPool.query).toHaveBeenCalledWith(
                `DELETE FROM etape WHERE recette_id = $1`,
                [idRecette]
            );
        })

        it("supprimerLignesTableCommentaireSelonIdRecette devrait retourner le bon query", async () => {

            const idRecette = "patate";

            const reponse = await recetteQueries.supprimerLignesTableCommentaireSelonIdRecette(idRecette, mockPool);
            mockPool.query.mockResolvedValue({});

            expect(mockPool.query).toHaveBeenCalledWith(
                `DELETE FROM commentaire WHERE recette_id = $1`,
                [idRecette]
            );
        })

        it("supprimerLignesTableAppreciationSelonIdRecette devrait retourner le bon query", async () => {

            const idRecette = "patate";

            const reponse = await recetteQueries.supprimerLignesTableAppreciationSelonIdRecette(idRecette, mockPool);
            mockPool.query.mockResolvedValue({});

            expect(mockPool.query).toHaveBeenCalledWith(
                `DELETE FROM appreciation WHERE recette_id = $1`,
                [idRecette]
            );
        })

        it("supprimerDansTableRecette devrait retourner le bon query", async () => {

            const idRecette = "patate";

            const reponse = await recetteQueries.supprimerDansTableRecette(idRecette, mockPool);
            mockPool.query.mockResolvedValue({});

            expect(mockPool.query).toHaveBeenCalledWith(
                `DELETE FROM recette WHERE recette_id = $1`,
                [idRecette]
            );
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
            const response = await recetteQueries.getIngredientsSelonRecetteId(recetteId);
            expect(response).toEqual(expectedIngredients);
        })

        it("getIngredientByNom devrait retourner le nom de l'ingredient", async () => {
            const expectedIngredientId = { ingredient_id: 1 };
            const recetteNom = "poutine";

            mockPool.query.mockResolvedValue({ rows: [expectedIngredientId] });
            const reponse = await recetteQueries.getIngredientByNom(recetteNom, mockPool);

            expect(reponse).toBe(expectedIngredientId.ingredient_id);

        })

        it("getIngredientByNom devrait retourner undefined", async () => {
            const recetteNom = "poutine";

            mockPool.query.mockResolvedValue({ rows: [] });
            const reponse = await recetteQueries.getIngredientByNom(recetteNom, mockPool);

            expect(reponse).toBe(undefined);
        })

        it("ajouterIngredient devrait retourner l'ingredient id", async () => {
            const mockIngredient = { ingredient_id: "poutine" };
            const expectedNom = "poutine";

            mockPool.query.mockResolvedValue({ rows: [mockIngredient] });
            const reponse = await recetteQueries.ajouterIngredient(mockIngredient, mockPool);

            expect(reponse).toBe(expectedNom)
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
            const response = await recetteQueries.getEtapesSelonRecetteId(recetteId);
            expect(response).toEqual(expectedEtapes);
        })

        it("insererDansTableEtape devrait retourner la bonne query", async () => {

            const idRecette = 1;
            const etape = {
                description: 'sortir les couteaux'
            };
            const ordreEtape = 1;

            const reponse = await recetteQueries.insererDansTableEtape(idRecette, etape, ordreEtape, mockPool);

            expect(mockPool.query).toHaveBeenCalledWith(
                `INSERT INTO etape (description, ordre, recette_id) 
        VALUES ($1, $2, $3)`,
                [etape.description, ordreEtape, idRecette]
            );
        })
    })

    describe("Test Appreciation", () => { // eslint-disable-line max-lines-per-function
        it("getMoyenneAppreciationSelonRecetteId devrait retourner la moyenne en Nombre", async () => {
            const mockMoyenne = [{ moyenne_etoiles: 4 }];

            mockPool.query.mockResolvedValue({ rows: mockMoyenne });
            const recetteId = "poulet";
            const response = await recetteQueries.getMoyenneAppreciationSelonRecetteId(recetteId)
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
            const response = await recetteQueries.aDejaFaitAppreciationSurRecetteId(recetteId)
            expect(response).toBe(true);
        })

        it("aDejaFaitAppreciationSurRecetteId retourne un boolean FALSE", async () => {
            const mockAppreciations = [];

            mockPool.query.mockResolvedValue({ rows: mockAppreciations });
            const recetteId = "poulet";
            const response = await recetteQueries.aDejaFaitAppreciationSurRecetteId(recetteId)
            expect(response).toBe(false);
        })

        it("ajouterAppreciation devrait ajouter l'appreciation sur la recetteId", async () => {
            const mockAppreciation = {
                etoiles: 1,
                recette_id: "popcorn",
                utilisateur_id: "alledo"
            };

            mockPool.query.mockResolvedValue({ rows: [mockAppreciation] });
            const appreciation = await recetteQueries.ajouterAppreciation(mockAppreciation);
            expect(appreciation.nbEtoiles).toEqual(1);
            expect(appreciation.utilisateurId).toEqual(mockAppreciation.utilisateur_id);
            expect(appreciation.recetteId).toEqual(mockAppreciation.recette_id);
        })
    })

    describe("Test formulaire", () => {// eslint-disable-line max-lines-per-function
        it("estVide devrait retourner TRUE si le champ est vide", () => {

            const champVide = "";

            const reponse = recetteQueries.estVide(champVide);

            expect(reponse).toBe(true);
        })

        it("estVide devrait retourner FALSE si le champ n'est pas vide", () => {

            const champVide = "allo";

            const reponse = recetteQueries.estVide(champVide);

            expect(reponse).toBe(false);
        })

        it("validerChamp devrait retourner un erreur si estVide est TRUE", () => {
            const champVide = "";
            const nomChamp = "recetteId";

            const appellerValiderChamp = () => recetteQueries.validerChamp(champVide, nomChamp);

            expect(appellerValiderChamp).toThrow();
            expect(appellerValiderChamp).toThrow(`Le champ ${nomChamp} est requis`);
        })
    })
})


