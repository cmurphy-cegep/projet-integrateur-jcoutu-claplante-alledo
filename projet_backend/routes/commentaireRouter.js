const express = require('express');
const router = express.Router();
const passport = require('passport');

const multer = require('multer');
const storage = multer.memoryStorage();

const HttpError = require("../HttpError");

const recetteQueries = require("../queries/RecetteQueries");

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    recetteQueries.getCommentairesSelonRecetteId(id).then(commentaires => {
        if (commentaires.length > 0) {
            res.json(commentaires);
        } else {
            return next(new HttpError(404, `Liste de commentaires pour la recette ${id} introuvable`));
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
            return next(new HttpError (403, "Droit d`accès requis" ));
        }
        if (req.body.utilisateur_id !== utilisateur.compteUtilisateurId) {
            return next(new HttpError (403, "Vous ne pouvez pas envoyer des commentaires sous un autre utilisateur id" ));
        }
        const idRecette = req.body.recette_id;
        if (!idRecette || idRecette === '') {
            return next(new HttpError(400, 'Le champ idRecette est requis'));
        }

        const nouveauCommentaire = {
            texte: "" + req.body.texte,
            utilisateurId: "" + req.body.utilisateur_id,
            recetteId: "" + req.body.recette_id
        };

        recetteQueries.ajouterCommentaire(nouveauCommentaire).then(result => {
            if (!result) {
                return next(new HttpError(404, `Impossible d'ajouter le commentaire`));
            }
 
            res.json(result);
        }).catch(err => {
            return next(err);
        });
    });


module.exports = router;