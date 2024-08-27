export async function creerCompteUtilisateur(compte) {
  try {
    const response = await fetch(`/api/nouveauCompte/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(compte),
    });

    if (response.ok) {
      return await response.json();
    } else if (response.status >= 400 && response.status < 500) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const body = await response.json();
        alert("Erreur: " + body.message);
      } else {
        throw new Error(`Erreur ${response.status}`);
      }
    }
  } catch (error) {
    console.error("Erreur", error);
  }
}
