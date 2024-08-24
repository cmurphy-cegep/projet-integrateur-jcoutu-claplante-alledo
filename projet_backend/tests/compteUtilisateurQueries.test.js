jest.mock('../queries/DBPool');
const mockPool = require('../queries/DBPool');
const { getCompteUtilisateur, verifierExistenceUtilisateur } = require('../queries/CompteUtilisateurQueries');

describe("Test compteUtilisateurQueries Queries", () => { // eslint-disable-line max-lines-per-function

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("getCompteUtilisateur devrait retourner un utilisateur", async () => {

        const mockUtilisateur = [{
            utilisateur_id: "alledo",
            nom_complet: "Alexandre Lledo",
            est_admin: false
        }];

        const expectedUtilisateur = {
            utilisateurId: "alledo",
            nom: "Alexandre Lledo",
            estAdmin: false
        }

        mockPool.query.mockResolvedValue({ rows: mockUtilisateur });

        const UtilisateurId = "alledo";
        const utilisateur = await getCompteUtilisateur(UtilisateurId);
        expect(utilisateur).toEqual(expectedUtilisateur);
    })

    it("getCompteUtilisateur devrait retourner un undefined", async () => {


        mockPool.query.mockResolvedValue({ rows: [] });

        const UtilisateurId = "alledo";
        const utilisateur = await getCompteUtilisateur(UtilisateurId);
        expect(utilisateur).toEqual(undefined);
    })

    it("verifierExistenceUtilisateur return TRUE", async () => {

        const mockUtilisateur =
            [{
                utilisateur_id: "alledo"
            }]

        mockPool.query.mockResolvedValue({ rows: mockUtilisateur });

        const UtilisateurId = "alledo";
        const utilisateur = await verifierExistenceUtilisateur(UtilisateurId);
        expect(utilisateur).toEqual(true);
    })

    it("verifierExistenceUtilisateur return FALSE", async () => {

        mockPool.query.mockResolvedValue({ rows: [] });

        const UtilisateurId = "alledo";
        const utilisateur = await verifierExistenceUtilisateur(UtilisateurId);
        expect(utilisateur).toEqual(false);
    })

    // eslint-disable-next-line max-statements
    // it("creerCompteUtilisateur devrait returner un compte utilisateur", async () => {

    //     const nouveauCompte = {
    //         utilisateurId: "alledo",
    //         motDePasse: "12345",
    //         utilisateurNomComplet: "Alexandre Lledo"
    //     }

    //     const mdp = {
    //         motDePasseHash: "1sd131",
    //         selMotDePasse: "111"
    //     }

    //     const nouveauCompteAvecHashEtSel = {
    //         utilisateur_id: "alledo",
    //         nom_complet: "Alexandre Lledo",
    //         mot_de_passe_hash: "1sd131",
    //         mot_de_passe_sale: "111",
    //         est_admin: false
    //     }

    //     const expectedCompteUtilisateur = {
    //         utilisateurId: "alledo",
    //         nom: "Alexandre Lledo",
    //         estAdmin: false
    //     }

    //     mockQueries.creerSelEtHash.mockResolvedValue(mdp);
    //     mockPool.query.mockResolvedValue(nouveauCompteAvecHashEtSel);


    //     const compte = await creerCompteUtilisateur({ rows: nouveauCompte });

    //     expect(compte.utilisateurId).toEqual(nouveauCompte.utilisateur_id);
    //     expect(compte.estAdmin).toEqual(false);
    //     expect(compte).toEqual(expectedCompteUtilisateur);
    // })

  
})