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