const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();

const HttpError = require("../HttpError");

const recetteQueries = require("../queries/RecetteQueries");
const passport = require('passport');

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    console.log("idRecette:", id);
    recetteQueries.getIngredientsSelonRecetteId(id).then(ingredients => {
        if (ingredients) {
            res.json(ingredients);
        } else {
            return next(new HttpError(404, `Liste d'ingrédients ${id} introuvable`));
        }
    }).catch(err => {
        return next(err);
    });
});

router.post('/',
    passport.authenticate('basic', { session: false }),
    (req, res, next) => {
        const user = req.user;

        if(!user || !user.estAdmin) {
            return next({ status: 403, message: "Droit administrateur requis" });
        }

        const nouvelIngredient = {
            nom: "" + req.body.nom
        };

        recetteQueries.ajouterIngredient(nouvelIngredient).then(result => {
            if (!result) {
                return next(new HttpError(404, `Impossible d'ajouter l'ingrédient`));
            }

            res.type('json').json(result);
        }).catch(err => {
            return next(err);
        });
        
    }
)

module.exports = router;