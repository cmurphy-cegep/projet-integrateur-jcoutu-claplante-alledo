const fs = require('fs');
const pool = require('./DBPool');
const { DateTime } = require('luxon');
const HttpError = require("../HttpError");
const transformImageTo64 = (imageName) => {
    const imagePath = `./images/recettes/${imageName}`
    let base64;
    try {
        base64 = fs.readFileSync(imagePath, 'base64');
    }
    catch {
        base64 = "";
    }
    return base64;
}

const getAllRecettes = async () => {
    const result = await pool.query(
        `SELECT *
        FROM recette`
    );

    return result.rows.map(row => {
        return {
            id: row.recette_id,
            nom: row.nom,
            desc: row.description,
            preparation: row.temps_preparation,
            cuisson: row.temps_cuisson,
            portions: row.nombre_portions,
            image: transformImageTo64(row.image)
        };
    });
};
exports.getAllRecettes = getAllRecettes;

const getRecetteById = async (recetteId) => {
    const result = await pool.query(
        `SELECT recette_id, nom, description, temps_preparation, temps_cuisson, nombre_portions, image
        FROM recette
        WHERE recette_id = $1`,
        [recetteId]
    );

    const row = result.rows[0];
    if (row) {
        const recette = {
            id: row.recette_id,
            nom: row.nom,
            description: row.description,
            preparation: row.temps_preparation,
            cuisson: row.temps_cuisson,
            portions: row.nombre_portions,
            image: transformImageTo64(row.image),
        };
        return recette;
    }
    return undefined;
};
exports.getRecetteById = getRecetteById;

const getIngredientsSelonRecetteId = async (recetteId) => {
    try {
        const result = await pool.query(
            `SELECT r.ingredient_id, nom, quantite, unite_mesure 
        FROM recette_ingredient r
        JOIN ingredient i ON r.ingredient_id = i.ingredient_id
        WHERE recette_id = $1
        ORDER BY ordre`,
            [recetteId]
        );

        return result.rows.map(row => {
            const ingredient = {
                id: row.ingredient_id,
                nom: row.nom,
                quantite: row.quantite,
                uniteMesure: row.unite_mesure,
                ordre: row.ordre
            };
            return ingredient;
        });
    } catch (error) {
        throw new Error('Impossible de fetch les ingredients');
    }
};
exports.getIngredientsSelonRecetteId = getIngredientsSelonRecetteId;

const getEtapesSelonRecetteId = async (recetteId) => {
    const result = await pool.query(
        `SELECT etape_id, description, ordre 
        FROM etape
        WHERE recette_id = $1
        ORDER BY ordre`,
        [recetteId]
    );
    return result.rows.map(row => {
        const etape = {
            id: row.etape_id,
            description: row.description,
            ordre: row.ordre
        };
        return etape;
    });
};
exports.getEtapesSelonRecetteId = getEtapesSelonRecetteId;

const getCommentairesSelonRecetteId = async (recetteId) => {
    const result = await pool.query(
        `SELECT commentaire_id, texte, to_char(date_publication, 'YYYY-MM-DD HH24:MI') AS date_formatee, c.utilisateur_id, recette_id, nom_complet 
        FROM commentaire c
        JOIN utilisateur u ON c.utilisateur_id = u.utilisateur_id
        WHERE recette_id = $1
        ORDER BY date_publication DESC`,
        [recetteId]
    );

    return result.rows.map(row => {
        const commentaire = {
            id: row.commentaire_id,
            texte: row.texte,
            date: row.date_formatee,
            utilisateurId: row.utilisateur_id,
            recetteId: row.recette_id,
            nomComplet: row.nom_complet
        };
        return commentaire;
    });
};
exports.getCommentairesSelonRecetteId = getCommentairesSelonRecetteId;

const ajouterCommentaire = async (commentaire) => {

    const date_publication = DateTime.now().toString();

    const result = await pool.query(
        `INSERT INTO commentaire (texte, date_publication, utilisateur_id, recette_id ) 
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [commentaire.texte, date_publication, commentaire.utilisateurId, commentaire.recetteId]
    );

    const row = result.rows[0];
    if (row) {
        const commentaire = {
            texte: row.texte,
            date: row.date_publication,
            utilisateurId: row.utilisateur_id,
            recetteId: row.recette_id
        };
        return commentaire;
    }
};
exports.ajouterCommentaire = ajouterCommentaire;

async function getIngredientByNom(nom, client) {
    const result = await client.query(
        `SELECT ingredient_id 
        FROM ingredient
        WHERE nom = $1`,
        [nom]
    );
    if (result.rows[0]) {
        return result.rows[0].ingredient_id;
    }
    else {
        return undefined;
    }
};
exports.getIngredientByNom = getIngredientByNom;

const ajouterIngredient = async (ingredient, client) => {

    const result = await client.query(
        `INSERT INTO ingredient (nom) 
        VALUES ($1)
        RETURNING ingredient_id`,
        [ingredient.nom]
    );
    return result.rows[0].ingredient_id;
};
exports.ajouterIngredient = ajouterIngredient;

async function insererDansTableRecette(recette, client) {
    return await client.query(
        `INSERT INTO recette (recette_id, nom, description, temps_preparation, temps_cuisson, nombre_portions) 
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [recette.id, recette.nom, recette.desc, recette.preparation, recette.cuisson, recette.portions]
    );
};
exports.insererDansTableRecette = insererDansTableRecette;

async function insererDansTableRecetteIngredient(idRecette, idIngredient, ingredient, ordreIngredient, client) {
    if (ingredient.quantite === '') {
        ingredient.quantite = 0;
    }
    return await client.query(
        `INSERT INTO recette_ingredient (recette_id, ingredient_id, quantite, unite_mesure, ordre) 
        VALUES ($1, $2, $3, $4, $5)`,
        [idRecette, idIngredient, ingredient.quantite, ingredient.uniteMesure, ordreIngredient]
    );
};
exports.insererDansTableRecetteIngredient = insererDansTableRecetteIngredient;

async function insererDansTableEtape(idRecette, etape, ordreEtape, client) {
    return await client.query(
        `INSERT INTO etape (description, ordre, recette_id) 
        VALUES ($1, $2, $3)`,
        [etape.description, ordreEtape, idRecette]
    );
};
exports.insererDansTableEtape = insererDansTableEtape;

function estVide(champ) {
    return !champ || champ === '';
}
exports.estVide = estVide;

function validerChamp(champ, nomChamp) {
    if (estVide(champ)) {
        throw new HttpError(400, `Le champ ${nomChamp} est requis`);
    }
}
exports.validerChamp = validerChamp;

function validerSousChamps(champs, nomTableau, nomChamp) {
    champs.forEach((champ, index) => {
        validerChamp(champ[nomChamp], `${nomChamp} pour ${nomTableau} à l'index ${index}`)
    });
}
exports.validerSousChamps = validerSousChamps;

function validerChampsRecette(recette) {
    validerChamp(recette.id, 'id');
    validerChamp(recette.nom, 'nom');
    validerChamp(recette.desc, 'desc');
    validerSousChamps(recette.ingredients, 'ingredient', 'nom')
    validerSousChamps(recette.etapes, 'etape', 'description')
}

const ajouterRecette = async (recette) => {
    validerChampsRecette(recette);

    await ajouterRecetteBdd(recette);

    return getRecetteById(recette.id);
}
exports.ajouterRecette = ajouterRecette;

const ajouterRecetteBdd = async (recette) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const idRecette = "" + recette.id;

        await insererDansTableRecette(recette, client);

        for (let i = 0; i < recette.ingredients.length; i++) {
            const ordreIngredient = i + 1;
            let idIngredient = await getIngredientByNom(recette.ingredients[i].nom, client);
            if (!idIngredient) {
                idIngredient = await ajouterIngredient(recette.ingredients[i], client);
            }
            await insererDansTableRecetteIngredient(idRecette, idIngredient, recette.ingredients[i], ordreIngredient, client);
        }

        for (let i = 0; i < recette.etapes.length; i++) {
            const ordreEtape = i + 1;
            await insererDansTableEtape(idRecette, recette.etapes[i], ordreEtape, client);
        }

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};
exports.ajouterRecetteBdd = ajouterRecetteBdd;

async function modifierDansTableRecette(recette, client) {
    return await client.query(
        `UPDATE recette SET nom = $2, description = $3, temps_preparation = $4, temps_cuisson = $5, nombre_portions = $6 
        WHERE recette_id = $1`,
        [recette.id, recette.nom, recette.desc, recette.preparation, recette.cuisson, recette.portions]
    );
};

async function supprimerLignesTableRecetteIngredientSelonIdRecette(idRecette, client) {
    return await client.query(
        `DELETE FROM recette_ingredient WHERE recette_id = $1`,
        [idRecette]
    );
}

async function supprimerLignesTableEtapeSelonIdRecette(idRecette, client) {
    return await client.query(
        `DELETE FROM etape WHERE recette_id = $1`,
        [idRecette]
    );
}

const modifierRecette = async (recette) => {
    validerChampsRecette(recette);

    await modifierRecetteBdd(recette);

    return getRecetteById(recette.id)
}
exports.modifierRecette = modifierRecette;

const modifierRecetteBdd = async (recette) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const idRecette = "" + recette.id;

        await modifierDansTableRecette(recette, client);

        await supprimerLignesTableRecetteIngredientSelonIdRecette(idRecette, client);

        for (let i = 0; i < recette.ingredients.length; i++) {
            const ordreIngredient = i + 1;
            let idIngredient = await getIngredientByNom(recette.ingredients[i].nom, client);
            if (!idIngredient) {
                idIngredient = await ajouterIngredient(recette.ingredients[i], client);
            }
            await insererDansTableRecetteIngredient(idRecette, idIngredient, recette.ingredients[i], ordreIngredient, client);
        }

        await supprimerLignesTableEtapeSelonIdRecette(idRecette, client);

        for (let i = 0; i < recette.etapes.length; i++) {
            const ordreEtape = i + 1;
            await insererDansTableEtape(idRecette, recette.etapes[i], ordreEtape, client);
        }

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};
exports.modifierRecetteBdd = modifierRecetteBdd;

const getMoyenneAppreciationSelonRecetteId = async (recetteId) => {
    const result = await pool.query(
        `SELECT ROUND(AVG(etoiles), 1) AS moyenne_etoiles
         FROM appreciation
         WHERE recette_id = $1`,
        [recetteId]
    );

    const row = result.rows[0];
    if (row && row.moyenne_etoiles !== null) {

        return row.moyenne_etoiles;
    } else {
        return null
    }
};
exports.getMoyenneAppreciationSelonRecetteId = getMoyenneAppreciationSelonRecetteId;

const aDejaFaitAppreciationSurRecetteId = async (appreciation) => {
    const result = await pool.query(
        `SELECT etoiles 
        FROM appreciation
        WHERE recette_id = $1
        AND utilisateur_id = $2`,
        [appreciation.recetteId, appreciation.utilisateurId]
    );

    return result.rows.length > 0;
};
exports.aDejaFaitAppreciationSurRecetteId = aDejaFaitAppreciationSurRecetteId;

const ajouterAppreciation = async (appreciation) => {
    const result = await pool.query(
        `INSERT INTO appreciation (etoiles, recette_id, utilisateur_id) 
         VALUES ($1, $2, $3)
         RETURNING *`,
        [appreciation.nbEtoiles, appreciation.recetteId, appreciation.utilisateurId]
    )
    const row = result.rows[0];
    if (row) {
        const appreciation = {
            nbEtoiles: row.etoiles,
            recetteId: row.recette_id,
            utilisateurId: row.utilisateur_id
        };
        return appreciation;
    };
};
exports.ajouterAppreciation = ajouterAppreciation;

const modifierAppreciation = async (appreciation) => {
    const result = await pool.query(
        `UPDATE appreciation
            SET etoiles = $1
            WHERE recette_id = $2 AND utilisateur_id = $3
            RETURNING *`,
        [appreciation.nbEtoiles, appreciation.recetteId, appreciation.utilisateurId]
    )
    const rowModifier = result.rows[0];
    if (rowModifier) {
        const appreciation = {
            nbEtoiles: rowModifier.etoiles,
            recetteId: rowModifier.recette_id,
            utilisateurId: rowModifier.utilisateur_id
        };
        return appreciation;
    } else {
        return null;
    };
};
exports.modifierAppreciation = modifierAppreciation;

const modifierRecetteImage = async (idRecette, file) => {

    const path = require('path');

    const cheminFichier = path.join(__dirname, '../images/recettes', file.originalname);

    fs.writeFile(cheminFichier, file.buffer, (err) => {
        if (err) {
            console.error('Erreur lors de l\'enregistrement de l\'image:', err);
        } else {
            console.log('Image enregistrée avec succès dans :', cheminFichier);
        }
    });

    const imageNom = file.originalname;

    const result = await pool.query(
        `UPDATE recette SET image = $2
        WHERE recette_id = $1`,
        [idRecette, imageNom]
    );

    if (result.rowCount === 0) {
        throw new Error("Erreur lors de la mise-à-jour de l'image");
    }

    return result;
};
exports.modifierRecetteImage = modifierRecetteImage;

async function supprimerLignesTableCommentaireSelonIdRecette(idRecette, client) {
    return await client.query(
        `DELETE FROM commentaire WHERE recette_id = $1`,
        [idRecette]
    );
}

async function supprimerLignesTableAppreciationSelonIdRecette(idRecette, client) {
    return await client.query(
        `DELETE FROM appreciation WHERE recette_id = $1`,
        [idRecette]
    );
}

async function supprimerDansTableRecette(idRecette, client) {
    return await client.query(
        `DELETE FROM recette WHERE recette_id = $1`,
        [idRecette]
    );
}

const supprimerRecette = async (idRecette) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        await supprimerLignesTableRecetteIngredientSelonIdRecette(idRecette, client);
        await supprimerLignesTableEtapeSelonIdRecette(idRecette, client);
        await supprimerLignesTableCommentaireSelonIdRecette(idRecette, client);
        await supprimerLignesTableAppreciationSelonIdRecette(idRecette, client);
        await supprimerDansTableRecette(idRecette, client);

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};
exports.supprimerRecette = supprimerRecette;