const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();

const HttpError = require("../HttpError");

const recetteQueries = require("../queries/RecetteQueries");

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
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

module.exports = router;