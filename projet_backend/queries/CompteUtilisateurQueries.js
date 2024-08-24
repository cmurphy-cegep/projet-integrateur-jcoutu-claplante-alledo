const HttpError = require('../HttpError');
const pool = require('./DBPool');
const crypto = require("crypto");

const getConnexionSelonCompteUtilisateurId = async (compteUtilisateurId) => {
    const resultat = await pool.query(
        `SELECT utilisateur_id, nom_complet, mot_de_passe_hash, mot_de_passe_sale, est_admin
         FROM utilisateur
         WHERE utilisateur_id = $1`,
        [compteUtilisateurId]
    );

    const row = resultat.rows[0];
    if (row) {
        return {
            compteUtilisateurId: row.utilisateur_id,
            utilisateurNomComplet: row.nom_complet,
            motDePasseHash: row.mot_de_passe_hash,
            selMotDePasse: row.mot_de_passe_sale,
            estAdmin: row.est_admin
        };
    }
    return undefined;
};
exports.getConnexionSelonCompteUtilisateurId = getConnexionSelonCompteUtilisateurId;


const getCompteUtilisateur = async (utilisateurId, client) => {
    const resultat = await (client || pool).query(
        `SELECT utilisateur_id, nom_complet, est_admin 
        FROM utilisateur
        WHERE
            utilisateur_id = $1`,
        [utilisateurId]
    );

    const row = resultat.rows[0];

    if (row) {
        return {
            utilisateurId: row.utilisateur_id,
            nom: row.nom_complet,
            estAdmin: row.est_admin
        };
    }

    return undefined;
};
exports.getCompteUtilisateur = getCompteUtilisateur;

const verifierExistenceUtilisateur = async (utilisateurId, client) => {
    const resultat = await (client || pool).query(
        `SELECT utilisateur_id 
        FROM utilisateur
        WHERE utilisateur_id = $1`,
        [utilisateurId]
    );

    return resultat.rows.length > 0;
};
exports.verifierExistenceUtilisateur = verifierExistenceUtilisateur;

const creerCompteUtilisateur = async (utilisateurId, motDePasse, utilisateurNomComplet) => {

   

    const selEtHash = creerSelEtHash(motDePasse);

    await pool.query(
        `INSERT INTO utilisateur (utilisateur_id, nom_complet, mot_de_passe_hash, mot_de_passe_sale, est_admin) 
        VALUES ($1, $2, $3, $4, false)`,
        [utilisateurId, utilisateurNomComplet, selEtHash.motDePasseHash, selEtHash.selMotDePasse]
        );
    
    return getCompteUtilisateur(utilisateurId);
};
exports.creerCompteUtilisateur = creerCompteUtilisateur;

const creerSelEtHash = (motDePasse) => {
    const iterations = 100000;
    const keylen = 64;
    const digest = "sha512";

    const saltBuf = crypto.randomBytes(16);
    const selMotDePasse = saltBuf.toString("base64");
    const derivedKey = crypto.pbkdf2Sync(motDePasse, selMotDePasse, iterations, keylen, digest);

    return {
        motDePasseHash: derivedKey.toString("base64"),
        selMotDePasse: selMotDePasse
    };
}
exports.creerSelEtHash = creerSelEtHash;


