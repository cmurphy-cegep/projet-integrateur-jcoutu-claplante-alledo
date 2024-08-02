const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const HttpError = require('./HttpError');

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const crypto = require('crypto');

// TODO : CREER UTILISATEUR QUERIES
const compteUtilisateurQueries = require("./queries/CompteUtilisateurQueries");

// TODO : CREER ROUTEUR SELON ROUTES
const recetteRouter = require('./routes/recetteRouter');
const ingredientRouter = require('./routes/ingredientRouter');
const etapeRouter = require('./routes/etapeRouter');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


class BasicStrategyModified extends BasicStrategy {
    constructor(options, verify) {
        return super(options, verify);
    }

    _challenge() {
        return 'xBasic realm="' + this._realm + '"';
    }
}


passport.use(new BasicStrategyModified((nomUtilisateur, motDePasse, authResult) => {
    // TODO : UTILISATEUR QUERIES
    compteUtilisateurQueries.getConnexionSelonCompteUtilisateurId(nomUtilisateur).then(utilisateur => {
         if(!utilisateur) {
             return authResult(null, false);
        }
            
        const iterations = 100000;
        const keylen = 64;
        const digest = "sha512";

        crypto.pbkdf2(motDePasse, utilisateur.motDePasseSale, iterations, keylen, digest, (err, motDePasseHash) => {
            if (err) {
               return authResult(err);
            }

            const utilisateurMdpHashBuffer = Buffer.from(utilisateur.motDePasseHash, "base64");
    
            if(!crypto.timingSafeEqual(utilisateurMdpHashBuffer, motDePasseHash)){
                 authResult(null, false);
            }

            return authResult(null, utilisateur);
        });

    }).catch(err => {
        return authResult(err);
    });
    
}));

// TODO: CHANGER LES ROUTES
app.use('/recettes', recetteRouter);
app.use('/ingredients', ingredientRouter);
app.use('/etapes', etapeRouter);


 app.get('/connexion',
    passport.authenticate('basic', {session: false}),
    (req, res, next) => {
        if(req.user){
            // TODO : CHANGER LES NOMS DES VARIABLES
             const utilisateurDetails = {
                compteUtilisateurId: req.utilisateur_id,
                utilisateurNomComplet: req.nom_complet,
                motDePasseHash: req.mot_de_passe_hash,
                motDePasseSale: req.mot_de_passe_sale,
                estAdmin: req.est_admin
             };
            
            res.json(utilisateurDetails);
        }else{
            return next({status: 500, message: "Propriété user absente"})
        }
    }
 );

app.use((err, req, res, next) => {
    console.log("error handler: ", err);
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.status || 500)
    if (err instanceof HttpError) {
        res.json(err.getJsonMessage());
    } else {
        res.json(err);
    }
});

module.exports = app;
