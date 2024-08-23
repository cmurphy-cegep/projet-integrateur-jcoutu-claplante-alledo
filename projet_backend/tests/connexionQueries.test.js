jest.mock('../queries/DBPool');
const mockPool = require('../queries/DBPool');
const { getConnexionSelonCompteUtilisateurId } = require('../queries/CompteUtilisateurQueries');

describe("Test connexion QUERIES", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("getConnexionSelonCompteUtilisateurId devrait retourner un compte utilisateur", async () => {

        const mockUtilisateur = [
            {
                utilisateur_id: "alledo",
                nom_complet: "Alexandre lledo",
                mot_de_passe_hash: "icIDUHEWCC9YEN22vlZy899NInMVOIYzcZNJzZFTPSYj3tVJRcvEM6Q9nUaLSo/9TD2XVmOJUCRKoot6yKambg==",
                mot_de_passe_sale: "L9UMT8Jxj6+u7E2NU4bw1A==",
                est_admin: false
            }];

        const expectedResult = {
            compteUtilisateurId: "alledo",
            utilisateurNomComplet: "Alexandre lledo",
            motDePasseHash: "icIDUHEWCC9YEN22vlZy899NInMVOIYzcZNJzZFTPSYj3tVJRcvEM6Q9nUaLSo/9TD2XVmOJUCRKoot6yKambg==",
            selMotDePasse: "L9UMT8Jxj6+u7E2NU4bw1A==",
            estAdmin: false
        }

        mockPool.query.mockResolvedValue({ rows: mockUtilisateur });
        const utilisateurId = "alledo";
        const response = await getConnexionSelonCompteUtilisateurId(utilisateurId);
        expect(response).toEqual(expectedResult);

    })

    it("getConnexionSelonCompteUtilisateurId devrait retourner undefined", async () => {

        mockPool.query.mockResolvedValue({rows: []});
        const utilisateurId = "alledo";
        const response = await getConnexionSelonCompteUtilisateurId(utilisateurId);
        expect(response).toEqual(undefined);
    })
})
