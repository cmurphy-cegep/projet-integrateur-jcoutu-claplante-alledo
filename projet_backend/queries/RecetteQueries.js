const fs = require('fs');
const pool = require('./DBPool');

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

const getRecetteAllById = async (recetteId) => {
    const result = await pool.query(
        `SELECT r.recette_id, r.nom, r.description, temps_preparation, temps_cuisson, nombre_portions,
        i.ingredient_id, i.nom, quantite, unite_mesure,
        etape_id, e.description, ordre
        FROM recette r
        JOIN recette_ingredient ri ON r.recette_id = ri.recette_id
        JOIN ingredient i ON ri.ingredient_id = i.ingredient_id
        JOIN etape e ON r.recette_id = e.recette_id
        WHERE r.recette_id = $1`,
        [recetteId]
    );

    const row = result.rows[0];
    if (row) {
        const recette = {
            id: row.recette_id,
            nom: row.nom,
            desc: row.desc,
            preparation: row.preparation,
            cuisson: row.cuisson,
            portions: row.portions
        };

        return addImagePathToRecette(recette);
    }
    return undefined;
};
exports.getRecetteById = getRecetteById;




const getIngredientsSelonRecetteId = async (recetteId) => {
    const result = await pool.query(
        `SELECT r.ingredient_id, nom, quantite, unite_mesure 
        FROM recette_ingredient r
        JOIN ingredient i ON r.ingredient_id = i.ingredient_id
        WHERE recette_id = $1`,
        [recetteId]
    );

    return result.rows.map(row => {
        const ingredient = {
            id: row.ingredient_id,
            nom: row.nom,
            quantite: row.quantite,
            uniteMesure: row.unite_mesure
        };
        return ingredient;
    });
};
exports.getIngredientsSelonRecetteId = getIngredientsSelonRecetteId;


const getEtapesSelonRecetteId = async (recetteId) => {
    const result = await pool.query(
        `SELECT etape_id, description, ordre 
        FROM etape
        WHERE recette_id = $1`,
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