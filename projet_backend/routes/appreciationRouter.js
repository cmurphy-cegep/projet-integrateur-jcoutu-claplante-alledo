const express = require('express');
const router = express.Router();
const passport = require('passport');

const multer = require('multer');
const storage = multer.memoryStorage();

const HttpError = require("../HttpError");

const recetteQueries = require("../queries/RecetteQueries");

router.get('/:recetteId', (req, res, next) => {
    const id = req.params.recetteId;
    recetteQueries.getMoyenneAppreciationSelonRecetteId(id).then(appreciationNbEtoiles => {
        if (appreciationNbEtoiles) {
            res.json(appreciationNbEtoiles);
        } else if (appreciationNbEtoiles === null){
            return next(new HttpError(204, `Il n'y a pas d'appreciations pour la recette ${id}`));
        }else{
            return next(new HttpError(404, `Les appreciations pour la recette ${id} sont introuvable`));
        }
    }).catch(err => {
        return next(err);
    });
});

router.post('/:recetteId',
    passport.authenticate('basic', { session: false }),
    (req, res, next) => {
        const utilisateur = req.user;
        if (!utilisateur) {
            return next(new HttpError(403, "Droit d`accès requis"));
        }
        if (req.body.utilisateurId !== utilisateur.compteUtilisateurId) {
            return next(new HttpError(403, "Vous ne pouvez pas envoyer des commentaires sous un autre utilisateur id"));
        }
        const idRecette = req.body.recetteId;
        if (!idRecette || idRecette === '') {
            return next(new HttpError(400, 'Le champ idRecette est requis'));
        }
        
        const nouvelleAppreciation = {
            nbEtoiles: req.body.etoiles,
            utilisateurId: "" + req.body.utilisateurId,
            recetteId: "" + req.body.recetteId
        };

        recetteQueries.aDejaFaitAppreciationSurRecetteId(nouvelleAppreciation).then(result => {
            if (!result) {
                recetteQueries.ajouterAppreciation(nouvelleAppreciation).then(result => {
                    if (!result) {
                        return next(new HttpError(404, `Impossible d'ajouter l'appréciation`));
                    }
                    res.type('json').json(result);
                })
            } else {
                recetteQueries.modifierAppreciation(nouvelleAppreciation).then(result => {
                    if (!result) {
                        return next(new HttpError(404, `Impossible de modifier l'appréciation`));
                    }
                    res.type('json').json(result);
                })
            }
        }).catch(err => {
            return next(err);
        });

    });



module.exports = router;