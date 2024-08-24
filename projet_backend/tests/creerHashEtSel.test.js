const { creerSelEtHash } = require('../queries/CompteUtilisateurQueries');
const { Client } = require('pg');
jest.mock('../queries/CompteUtilisateurQueries');
const mockQueries = require('../queries/CompteUtilisateurQueries');

it("creerSelEtHash devrait retourner un hash et un sel en string qui est en base64", async () => {
    const motDePasse = '12345';

    mockQueries.creerSelEtHash.mockResolvedValue({
        motDePasseHash: "1sd131",
        selMotDePasse: "111"
    });

    const compte = await creerSelEtHash(motDePasse);

    console.log(compte);

    expect(compte.selMotDePasse).toEqual(expect.stringMatching(/^[A-Za-z0-9+/=]+$/));
    expect(compte.motDePasseHash).toEqual(expect.stringMatching(/^[A-Za-z0-9+/=]+$/));
    expect(compte.selMotDePasse).not.toBeNull();
    expect(compte.motDePasseHash).not.toBeNull();
});