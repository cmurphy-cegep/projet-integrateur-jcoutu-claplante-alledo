import session from './session';

const convertToProduct = jsonProduct => {
    return {
        id: jsonProduct.id,
        name: jsonProduct.name,
        price: +jsonProduct.price,
        desc: jsonProduct.desc,
        image: jsonProduct.image,
        longDesc: jsonProduct.longDesc
    };
};

/**
 * Récupère depuis l'API back-end un produit individuel du catalogue
 * 
 * @param {String} productId L'identifiant du produit à récupérer
 * @returns Promesse permettant d'obtenir le produit demandé
 */
export async function fetchProduct(productId) {
    const response = await fetch(`/api/products/${productId}`);

    if (response.ok) {
        return convertToProduct(await response.json());
    } else {
        throw new Error(`Produit ${productId} introuvable`);
    }
};

