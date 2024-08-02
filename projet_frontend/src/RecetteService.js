export async function fetchRecettes() {
    const response = await fetch('/api/recettes');

    if (response.ok) {
        const respJson = await response.json();
        return respJson;
    } else {
        throw new Error("Impossible de récupérer la liste des recettes");
    }
}