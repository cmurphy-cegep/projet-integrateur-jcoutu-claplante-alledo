import session from './session';

export async function fetchRecettes() {
    const response = await fetch('/api/recettes');
    if (response.ok) {
        const respJson = await response.json();
        return respJson;
    } else {
        throw new Error("Impossible de récupérer la liste des recettes");
    }
}

function formatterNombreVide(nombre) {
    return (nombre === 0) ? "-" : nombre;
}

const convertirEnRecette = jsonRecette => {
    return {
        id: jsonRecette.id,
        nom: jsonRecette.nom,
        desc: jsonRecette.description.replace(/\\r\\n|\n/g, '<br/>'),
        preparation: formatterNombreVide(jsonRecette.preparation),
        cuisson: formatterNombreVide(jsonRecette.cuisson),
        portions: formatterNombreVide(jsonRecette.portions),
        image: jsonRecette.image
    };
};

const convertirEnIngredient = jsonIngredient => {
    return {
        nom: jsonIngredient.nom,
        quantite: (jsonIngredient.quantite % 1 === 0) ? Number(jsonIngredient.quantite) : jsonIngredient.quantite,
        uniteMesure: jsonIngredient.uniteMesure
    };
};

const convertirEnEtape = jsonEtape => {
    return {
        description: jsonEtape.description
    };
};

const convertirEnCommentaire = jsonCommentaire => {
    return {
        idCommentaire: jsonCommentaire.id,
        texte: jsonCommentaire.texte,
        date: jsonCommentaire.date,
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
        return repJson.map(e => convertirEnEtape(e));
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
        return repJson.map(c => convertirEnCommentaire(c));
    } else {
        throw new Error(`Liste de commentaires pour la recette ${recetteId} introuvable`);
    }
};

export async function ajouterCommentaire(commentaire) {
    const reponse = await fetch(`/api/comments/${commentaire.recetteId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...session.getAuthHeaders()
        },
        body: JSON.stringify(commentaire)
    });
    
    if (reponse.ok) {
        return convertirEnCommentaire(await reponse.json());
    } else if (reponse.rows === 0) {
        return [];
    } else {
        throw new Error(`Impossible d'ajouter le commentaire pour la recette ${commentaire.recetteId}: ${reponse.status}`);
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

export async function ajouterAppreciation(appreciation) {
    const reponse = await fetch(`/api/appreciations/${appreciation.recetteId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...session.getAuthHeaders()
        },
        body: JSON.stringify( appreciation )
        
    });

    if(reponse.ok) {
        const data = await reponse.json();
        return data.etoiles;
    } else {
        throw new Error(`Impossible d'ajouter l'appreciation pour la recette ${appreciation.recetteId}: ${reponse.status}`)
    }
};

export async function mettreAJourRecette(recette) {
    const reponse = await fetch(`/api/recettes/${recette.recetteId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...session.getAuthHeaders()
        },
        body: JSON.stringify(recette)
    });
    
    if (reponse.ok) {
        return convertirEnRecette(await reponse.json());
    } else {
        throw new Error(`Impossible d'éditer la recette ${recette.recetteId}: ${reponse.status}`);
    }
};

export async function creerRecette(recette) {
    const reponse = await fetch(`/api/recettes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...session.getAuthHeaders()
        },
        body: JSON.stringify(recette)
    });
    
    if (reponse.ok) {
        return;
    } else {
        throw new Error(`Impossible d'ajouter la nouvelle recette: ${reponse.status}`);
    }
};

export async function modifierRecette(recette) {
    const reponse = await fetch(`/api/recettes/${recette.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...session.getAuthHeaders()
        },
        body: JSON.stringify(recette)
    });
    
    if (reponse.ok) {
        return;
    } else {
        throw new Error(`Impossible d'ajouter la nouvelle recette: ${reponse.status}`);
    }
};
