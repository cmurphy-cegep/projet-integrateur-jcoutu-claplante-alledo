const express = require('express');
const router = express.Router();
const passport = require('passport');

const multer = require('multer');
const storage = multer.memoryStorage();

const HttpError = require("../HttpError");

const compteUtilisateurQueries = require("../queries/CompteUtilisateurQueries");


router.get('/',
    passport.authenticate('basic', {session: false}),
    (req, res, next) => {
        if(req.user){
            // TODO : CHANGER LES NOMS DES VARIABLES
             const utilisateurDetails = {
                compteUtilisateurId: req.user.compteUtilisateurId,
                utilisateurNomComplet: req.user.utilisateurNomComplet,
                estAdmin: req.user.estAdmin
             };
            
            res.json(utilisateurDetails);
        }else{
            return next({status: 500, message: "Propriété user absente"})
        }
    }
 );

 router.post('/', (req, res, next) => {
    const { utilisateurId, motDePasse, nomComplet } = req.body;

    compteUtilisateurQueries.verifierExistenceUtilisateur(utilisateurId)
    .then(existe => {
        if (!existe){
            compteUtilisateurQueries.creerCompteUtilisateur(utilisateurId, motDePasse, nomComplet);
        }else{
            throw new HttpError(409,`L'utilisateur ${utilisateurId} existe déjà`);
        }
    })
    .then(utilisateur => {
        res.status(201).json(utilisateur);
    })
    .catch(err => {
        return next(err);
    });
 });

 module.exports = router;