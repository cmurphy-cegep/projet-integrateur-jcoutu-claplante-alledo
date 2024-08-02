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
         FROM recette
        `
    );

    return result.rows.map(row => {
        return {
            id: row.recette_id,
            nom: row.nom,
            desc: row.description,
            preparation: row.temps_preparation,
            cuisson: row.temps_cuisson,
            portions: row.nombre_portions,
            image:  transformImageTo64(row.image)
        };
    });
};
exports.getAllRecettes = getAllRecettes;

const getRecetteById = async (recetteId) => {
    const result = await pool.query(
        `SELECT recette_id, nom, description, temps_preparation, temps_cuisson, nombre_portions
         FROM recette
         WHERE recette_id = $1`,
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
            portions: row.portions,
        };

        return addImagePathToRecette(recette);
    }
    return undefined;
};
exports.getRecetteById = getRecetteById;