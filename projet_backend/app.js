const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const HttpError = require('./HttpError');

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const crypto = require('crypto');

// TODO : CREER UTILISATEUR QUERIES
// const userAccountQueries = require("./queries/UserAccountQueries");

// TODO : CREER ROUTEUR SELON ROUTES
 const recetteRouter = require('./routes/recetteRouter');
// const cartRouter = require('./routes/cartRouter');
// const orderRouter = require('./routes/orderRouter');

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


passport.use(new BasicStrategyModified((username, password, authResult) =>{
    // TODO : UTILISATEUR QUERIES
    // userAccountQueries.getLoginByUserAccountId(username).then(utilisateur => {
    //     if(!utilisateur){
    //         return authResult(null, false);
    //     }
    //     if(!utilisateur.isActive){
    //         return authResult(null, false);
    //     }
        
    //     const iterations = 100000;
    //     const keylen = 64;
    //     const digest = "sha512";

    //     crypto.pbkdf2(password, utilisateur.passwordSalt, iterations, keylen, digest, (err, hashedPassword) => {
    //         if (err) {
    //           return authResult(err);
    //         }

    //         const utilisateurMdpHashBuffer = Buffer.from(utilisateur.passwordHash, "base64");
    
    //         if(!crypto.timingSafeEqual(utilisateurMdpHashBuffer, hashedPassword)){
    //             authResult(null, false);
    //         }

    //         return authResult(null, utilisateur);
    //     });

    // }).catch(err => {
    //     return authResult(err);
    // });
    
}));

// TODO: CHANGER LES ROUTES
app.use('/recette', recetteRouter);
// app.use('/products', productRouter);
// app.use('/cart', cartRouter);
// app.use('/orders', orderRouter);


 app.get('/login',
    passport.authenticate('basic', {session: false}),
    (req, res, next) => {
        if(req.user){
            // TODO : CHANGER LES NOMS DES VARIABLES
            // const userDetails = {
            //     userAccount: req.user.userAccountId,
            //     userFullName: req.user.userFullName,
            //     isAdmin: req.user.isAdmin,
            //     isActive: req.user.isActive
            // };
            
            res.json(userDetails);
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
