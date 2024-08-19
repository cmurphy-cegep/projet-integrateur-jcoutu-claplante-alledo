export async function fetchRecettes() {
    const response = await fetch('/api/recettes');
    if (response.ok) {
        const respJson = await response.json();
        return respJson;
    } else {
        throw new Error("Impossible de récupérer la liste des recettes");
    }
}

const convertirEnRecette = jsonRecette => {
    return {
        id: jsonRecette.id,
        nom: jsonRecette.nom,
        desc: jsonRecette.description.replaceAll('\\r\\n', '<br/>'),
        preparation: jsonRecette.preparation,
        cuisson: jsonRecette.cuisson,
        portions: jsonRecette.portions,
        image: jsonRecette.image
    };
};

const convertirEnIngredient = jsonIngredient => {
    return {
        idIngredient: jsonIngredient.id,
        nom: jsonIngredient.nom,
        quantite: jsonIngredient.quantite,
        uniteMesure: jsonIngredient.uniteMesure,
    };
};

const convertirEnEtape = jsonEtape => {
    return {
        idEtape: jsonEtape.id,
        description: jsonEtape.description,
        ordre: jsonEtape.ordre,
    };
};

const convertirEnCommentaire = jsonCommentaire => {
    return {
        idCommentaire: jsonCommentaire.id,
        texte: jsonCommentaire.texte,
        date: jsonCommentaire.date.substring(0, 10),
        utilisateurId: jsonCommentaire.utilisateurId,
        recetteId: jsonCommentaire.recetteId,
        nomComplet: jsonCommentaire.nomComplet
    };
};

export async function fetchRecette(recetteId) {
    const reponse = await fetch(`/api/recettes/${recetteId}`);

    if (reponse.ok) {
        return convertirEnRecette(await reponse.json());
    } else {
        throw new Error(`Recette ${recetteId} introuvable`);
    }
};

export async function fetchIngredients(recetteId) {
    const reponse = await fetch(`/api/ingredients/${recetteId}`);

    if (reponse.ok) {
        const repJson = await reponse.json();
        return repJson.map(i => convertirEnIngredient(i));
    } else {
        throw new Error(`Liste d'ingrédients pour la recette ${recetteId} introuvable`);
    }
};

export async function fetchEtapes(recetteId) {
    const reponse = await fetch(`/api/etapes/${recetteId}`);

    if (reponse.ok) {
        const repJson = await reponse.json();
        const repJsonTriee = repJson.sort((a, b) => a.ordre - b.ordre);
        return repJsonTriee.map(e => convertirEnEtape(e));
    } else {
        throw new Error(`Liste d'étapes pour la recette ${recetteId} introuvable`);
    }
};

export async function fetchCommentaires(recetteId) {
    const reponse = await fetch(`/api/comments/${recetteId}`);

    if (reponse.ok) {
        if (reponse.status === 204) {
            return [];
        }
        const repJson = await reponse.json();
        const repJsonTriee = repJson.sort((a, b) => b.date - a.date);
        return repJsonTriee.map(c => convertirEnCommentaire(c));
    } else {
        throw new Error(`Liste de commentaires pour la recette ${recetteId} introuvable`);
    }
};

export async function fetchAppreciations(recetteId) {
    const reponse = await fetch(`/api/appreciations/${recetteId}`);

    if (reponse.ok) {
        if (reponse.status === 204) {
            return null;
        }
        return await reponse.json();
    } else {
        throw new Error(`La moyenne d'appreciation pour la recette ${recetteId} est introuvable`);
    }
};