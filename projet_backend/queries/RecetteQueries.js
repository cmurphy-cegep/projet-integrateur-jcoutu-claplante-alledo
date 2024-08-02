const pool = require('./DBPool');

const getImagePathForRecetteId = recetteId => `/recettes/${recetteId}/image`;
exports.getImagePathForRecetteId = getImagePathForRecetteId;

const addImagePathToRecette = recette => {
    return {
        id: recette.id,
        nom: recette.nom,
        desc: recette.desc,
        preparation: recette.preparation,
        cuisson: recette.cuisson,
        portions: recette.portions,
        image: getImagePathForRecetteId(recette.id),
    };
};

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
            image: row.image
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