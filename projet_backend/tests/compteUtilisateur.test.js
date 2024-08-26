/* eslint-disable max-lines-per-function */
jest.mock('../queries/DBPool');
const mockPool = require('../queries/DBPool');
const compteUtilisateurQueries = require('../queries/CompteUtilisateurQueries')

describe("Test compteUtilisateur", () => {
    it("getConnexionSelonCompteUtilisateurId devrait retourner undefined", async () => {
        const utilisateur = {
            utilisateur_id: "alledo",
            nom_complet: "Alexandre Lledo",
            mot_de_passe_hash: "123edacjdsv",
            mot_de_passe_sale: "ddavaboa55",
            est_admin: false
        }

        const expectedUtilisateur = {
            compteUtilisateurId: "alledo",
            utilisateurNomComplet: "Alexandre Lledo",
            motDePasseHash: "123edacjdsv",
            selMotDePasse: "ddavaboa55",
            estAdmin: false
        }
        mockPool.query.mockResolvedValue({ rows: [] });
        const response = await compteUtilisateurQueries.getConnexionSelonCompteUtilisateurId(utilisateur.utilisateur_id);
        expect(response).toEqual(undefined);
    })

    it("getCompteUtilisateur devrait retourner un utilisateur", async () => {
        const utilisateur = {
            utilisateur_id: "alledo",
            nom_complet: "Alexandre Lledo",
            est_admin: false
        };

        const expectedUtilisateur = {
            utilisateurId: "alledo",
            nom: "Alexandre Lledo",
            estAdmin: false
        };

        mockPool.query.mockResolvedValue({ rows: [utilisateur] });
        const response = await compteUtilisateurQueries.getCompteUtilisateur(utilisateur.utilisateur_id);
        expect(response).toEqual(expectedUtilisateur);
    })

    it("getCompteUtilisateur devrait retourner undefined", async () => {
        const utilisateur = {
            utilisateur_id: "alledo",
            nom_complet: "Alexandre Lledo",
            mot_de_passe_hash: "123edacjdsv",
            mot_de_passe_sale: "ddavaboa55",
            est_admin: false
        };

        mockPool.query.mockResolvedValue({ rows: [] });
        const response = await compteUtilisateurQueries.getCompteUtilisateur(utilisateur.utilisateur_id);
        expect(response).toEqual(undefined);
    })

    it("verifierExistenceUtilisateur devrait retourner TRUE", async () => {
        const utilisateur = {
            utilisateur_id: "alledo",
            nom_complet: "Alexandre Lledo",
            mot_de_passe_hash: "123edacjdsv",
            mot_de_passe_sale: "ddavaboa55",
            est_admin: false
        };

        const expectedUtilisateur = {
            compteUtilisateurId: "alledo",
            utilisateurNomComplet: "Alexandre Lledo",
            motDePasseHash: "123edacjdsv",
            selMotDePasse: "ddavaboa55",
            estAdmin: false
        };

        mockPool.query.mockResolvedValue({ rows: [utilisateur] });
        const response = await compteUtilisateurQueries.verifierExistenceUtilisateur(utilisateur.utilisateur_id);
        expect(response).toBe(true);
    })


    it("creerSelEtHash devrait retourner le mot de passe hash le sel du mot de passe", async () => {
        jest.mock('../queries/CompteUtilisateurQueries', () => ({
            creerSelEtHash: jest.fn()
        }));

        const mockMotDePasse = require('../queries/CompteUtilisateurQueries');

        const motDePasse = "12345";
        const expectedHash = "abcde";
        const expectedSalt = "fghi";

        mockMotDePasse.creerSelEtHash.mockResolvedValue({
            motDePasseHash: expectedHash,
            selMotDePasse: expectedSalt
        });

        const response = await mockMotDePasse.creerSelEtHash(motDePasse);
        console.log(response);
        expect(response.motDePasseHash).toBe(expectedHash);
        expect(response.selMotDePasse).toBe(expectedSalt);
    })

    it("creerCompteUtilisateur devrait retourner le nouveau utilisateur", async () => {
        const utilisateur = {
            utilisateur_id: "alledo",
            nom_complet: "Alexandre Lledo",
            mot_de_passe_hash: "123edacjdsv",
            mot_de_passe_sale: "ddavaboa55",
            est_admin: false
        };

        const expectedUtilisateur = {
            utilisateurId: "alledo",
            nom: "Alexandre Lledo",
            estAdmin: false
        };

        const motDePasse = "12345";
        const expectedHash = "abcde";
        const expectedSalt = "fghi";

        compteUtilisateurQueries.creerSelEtHash = jest.fn().mockResolvedValue({
            motDePasseHash: expectedHash,
            selMotDePasse: expectedSalt
        });

        mockPool.query = jest.fn().mockResolvedValue({ rows: [utilisateur] });

        const response = await compteUtilisateurQueries.creerCompteUtilisateur(utilisateur.utilisateur_id, motDePasse, utilisateur.nom_complet);
        expect(response).toEqual(expectedUtilisateur);
    })
});