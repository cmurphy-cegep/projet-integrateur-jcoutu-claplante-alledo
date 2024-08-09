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

    
    const imagePath =  `../images/recettes/${imageName}`
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

module.exports = router;