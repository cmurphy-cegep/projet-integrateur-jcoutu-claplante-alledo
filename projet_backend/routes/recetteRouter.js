const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const passport = require('passport');

const HttpError = require("../HttpError");

const recetteQueries = require("../queries/RecetteQueries");















router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    console.log("id:", id);
    recetteQueries.getRecetteById(id).then(recette => {
        if (recette) {
            res.json(recette);
        } else {
            return next(new HttpError(404, `Recette ${id} introuvable`));
        }
    }).catch(err => {
        return next(err);
    });
});

module.exports = router;