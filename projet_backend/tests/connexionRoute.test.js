const requete = require('supertest');
const app = require('../app');


// describe("Test routes CONNEXION", () => {

//     beforeEach(() => {
//         jest.resetAllMocks();
//     });

//     it("GET / devrait retourner un utilisateur", async () => {
//         const mockUtilisateur = {
//             compteUtilisateurId: "alledo",
//             utilisateurNomComplet: "Alexandre Lledo",
//             estAdmin: false
//          };
         
//          const response = await requete(app).get('/')
//          console.log(response);
//                 expect(response.body).toBe([{
//                     compteUtilisateurId: "alledo",
//                     utilisateurNomComplet: "Alexandre Lledo",
//                     estAdmin: false
//                  }]);
//     })
// })