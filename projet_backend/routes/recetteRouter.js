const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const passport = require('passport');

const HttpError = require("../HttpError");

const recetteQueries = require("../queries/RecetteQueries");


router.get('/', (req, res, next) => {
    recetteQueries.getAllRecettes().then(recettes => {
        res.json(recettes);
    }).catch(err => {
        return next(err);
    });
});

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

const onePixelTransparentPngImage = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj+P///38ACfsD/QVDRcoAAAAASUVORK5CYII=", "base64");

router.get('/images/:imageId', (req, res, next) => {
    const imageName = req.params.imageName;


    const imagePath = `../images/recettes/${imageName}`
    // read binary data
    const imageBase64 = fs.readFileSync(imagePath, 'base64');

    productQueries.getProductImageContent(id).then(imageInfo => {
        if (imageInfo && imageInfo.imageContent) {
            if (imageInfo.imageContentType) {
                res.header('Content-Type', 'image/png');
            }
            res.send(imageInfo.imageContent);
        } else {
            // Si le produit n'a pas d'image, on va retourner une image transparente de 1 pixel
            // afin d'éviter d'avoir une image brisée dans le front-end
            res.header('Content-Type', 'image/png');
            res.send(onePixelTransparentPngImage);
        }
    }).catch(err => {
        return next(err);
    });
});

router.post('/',
    passport.authenticate('basic', { session: false }),
    (req, res, next) => {
        const utilisateur = req.user;

        if (!utilisateur || !utilisateur.estAdmin) {
            return next(new HttpError(404, 'Droit administrateur requis'));
        }

        recetteQueries.getRecetteById(id).then(recette => {
            if (recette) {
                throw new HttpError(400, `Une recette avec l'id ${id} existe déjà`);
            }
        })

        recetteQueries.ajouterRecette(req.body).then(nouvelleRecette => {
            res.json(nouvelleRecette);
        }).catch(err => {
            return next(err);
        })
    });

router.put('/:id',
    passport.authenticate('basic', { session: false }),
    (req, res, next) => {
        const utilisateur = req.user;

        if (!utilisateur || !utilisateur.estAdmin) {
            return next(new HttpError(404, 'Droit administrateur requis'));
        }

        const id = req.params.id;
        if (!id || id === '') {
            return next(new HttpError(400, 'Le paramètre id est requis'));
        }

        if (id !== req.body.id) {
            return next(new HttpError(400, `Le paramètre spécifie l'id ${id} alors que la recette fournie a l'id ${req.body.id}`));
        }

        recetteQueries.modifierRecette(req.body).then(recetteModifiee => {
            if (!recetteModifiee) {
                return next(new HttpError(404, `Recette ${id} introuvable`));
            }
            res.json(recetteModifiee);
        }).catch(err => {
            return next(err);
        })
    });

router.post('/:id/image',
    upload.single('recette-image'),
    (req, res, next) => {
        const id = req.params.id;
        if (!id || id === '') {
            return next(new HttpError(400, 'Le champ id est requis'));
        }

        recetteQueries.getRecetteById(id).then(recette => {
            if (!recette) {
                throw new HttpError(404, `Recette id ${id} introuvable`);
            }
            return recetteQueries.modifierRecetteImage(id, req.file);
        }).then(imageInfo => {
            res.send("");
        }).catch(err => {
            next(err);
        });

    });

module.exports = router;