const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();

const HttpError = require("../HttpError");

const recetteQueries = require("../queries/RecetteQueries");

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    recetteQueries.getEtapesSelonRecetteId(id).then(etapes => {
        if (etapes.length > 0) {
            // Array vide = true donc if(etapes) et etapes == {} = true
            res.json(etapes);
        } else {
            return next(new HttpError(404, `Liste d'étapes ${id} introuvable`));
        }
    }).catch(err => {
        return next(err);
    });
});

module.exports = router;