const pool = require('./DBPool');

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
            motDePasseSale: row.mot_de_passe_sale,
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

const creerCompteUtilisateur = async (utilisateurId, nom, client) => {
    const resultat = await (client || pool).query(
        `INSERT INTO utilisateur (utilisateur_id, nom_complet) 
        VALUES ($1, $2)`,
        [utilisateurId, nom]
    );

    return getCompteUtilisateur(utilisateurId);
};
exports.creerCompteUtilisateur = creerCompteUtilisateur;