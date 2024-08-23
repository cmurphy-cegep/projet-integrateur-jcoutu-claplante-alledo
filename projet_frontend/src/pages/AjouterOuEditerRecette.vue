<template>
    <div v-if="session.user && session.user.estAdmin">
        <form @submit.prevent="soumettreFormulaire">
            <div v-if="modeNouvelleRecette">
                <label for="recette-id">Identifiant de la recette : </label>
                <input id="recette-id" v-model="recette.id" />
            </div>
            <div>
                <label for="recette-nom">Nom de la recette : </label>
                <input id="recette-nom" v-model="recette.nom" />
            </div>
            <div>
                <label for="recette-preparation">Temps de préparation (en minutes) : </label>
                <input type="number" id="recette-preparation" v-model="recette.preparation" min="0" />
            </div>
            <div>
                <label for="recette-cuisson">Temps de cuisson (en minutes) : </label>
                <input type="number" id="recette-cuisson" v-model="recette.cuisson" min="0" />
            </div>
            <div>
                <label for="recette-portions">Nombre de portions : </label>
                <input type="number" id="recette-portions" v-model="recette.portions" min="0" />
            </div>
            <div>
                <label for="recette-description">Description de la recette : </label>
            </div>
            <div>
                <textarea id="recette-description" v-model="recette.desc" maxlength="700" rows="7"
                    cols="100"> </textarea>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Quantité</th>
                        <th>Unité</th>
                        <th>Nom de l'ingrédient</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(ingredient, index) in ingredients">
                        <td>{{ ingredient.quantite }}</td>
                        <td>{{ ingredient.uniteMesure }}</td>
                        <td>{{ ingredient.nom }}</td>
                        <td><button type="button" v-if="ingredient && index !== 0"
                                @click="deplacerIngredientVersHaut(index)">Déplacer vers le
                                haut</button></td>
                        <td><button type="button" v-if="ingredient && index !== ingredients.length - 1"
                                @click="deplacerIngredientVersBas(index)">Déplacer vers le bas</button></td>
                        <td><button type="button" v-if="ingredient" @click="supprimerIngredient(index)">Supprimer
                                l'ingrédient</button></td>
                    </tr>

                </tbody>
                <tfoot>
                    <tr>
                        <td><input type="number" id="ingredient-quantite" v-model="ajoutQuantite" /></td>
                        <td><input id="ingredient-uniteMesure" v-model="ajoutUniteMesure" /></td>
                        <td><input id="ingredient-nom" v-model="ajoutNomIngredient" /></td>
                        <td><button type="button" @click="ajouterIngredient">Ajouter
                                l'ingrédient</button></td>
                    </tr>
                </tfoot>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>Texte de l'étape</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(etape, index) in etapes">
                        <td>{{ etape.description }}</td>
                        <td><button type="button" v-if="etape && index !== 0"
                                @click="deplacerEtapeVersHaut(index)">Déplacer vers le
                                haut</button></td>
                        <td><button type="button" v-if="etape && index !== etapes.length - 1"
                                @click="deplacerEtapeVersBas(index)">Déplacer vers le bas</button></td>
                        <td><button type="button" v-if="etape" @click="supprimerEtape(index)">Supprimer l'étape</button>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td><input id="etape-texte" v-model="ajoutDescriptionEtape" /></td>
                        <td><button type="button" @click="ajouterEtape">Ajouter une étape</button></td>
                    </tr>
                </tfoot>
            </table>
            <div>
                <button type="submit">Soumettre</button>
            </div>
        </form>
    </div>
</template>

<script>
import { fetchRecette, fetchIngredients, fetchEtapes, creerRecette, modifierRecette } from '../RecetteService';
import session from '../session';

export default {
    props: {
        id: { String, default: null },
        modeNouvelleRecette: { Boolean, default: false }
    },
    data() {
        return {
            session: session,
            recette: {
                id: this.id || '',
                nom: this.nom || '',
                preparation: this.preparation || '',
                cuisson: this.cuisson || '',
            },
            ingredients: [],
            etapes: [],
            ajoutQuantite: '',
            ajoutUniteMesure: '',
            ajoutNomIngredient: '',
            ajoutDescriptionEtape: ''
        };
    },
    methods: {
        rafraichirRecette(id) {
            this.recette = null;

            fetchRecette(id).then(recette => {
                this.recette = recette;
            }).catch(err => {
                this.recette = null;
            });

            fetchIngredients(id).then(ingredients => {
                this.ingredients = ingredients;
            }).catch(err => {
                this.ingredients = [];
            });

            fetchEtapes(id).then(etapes => {
                this.etapes = etapes;
            }).catch(err => {
                this.etapes = [];
            });
        },
        ajouterIngredient() {
            const nouvelIngredient = {
                quantite: this.ajoutQuantite,
                uniteMesure: this.ajoutUniteMesure,
                nom: this.ajoutNomIngredient
            }
            this.ingredients.push(nouvelIngredient);
            this.ajoutQuantite = '';
            this.ajoutUniteMesure = '';
            this.ajoutNomIngredient = '';
        },
        supprimerIngredient(index) {
            this.ingredients.splice(index, 1);
        },
        deplacerIngredientVersHaut(index) {
            const temp = this.ingredients[index];
            this.ingredients[index] = this.ingredients[index - 1]
            this.ingredients[index - 1] = temp;
        },
        deplacerIngredientVersBas(index) {
            const temp = this.ingredients[index];
            this.ingredients[index] = this.ingredients[index + 1]
            this.ingredients[index + 1] = temp;
        },
        ajouterEtape() {
            const nouvelleEtape = {
                description: this.ajoutDescriptionEtape
            }
            this.etapes.push(nouvelleEtape);
            this.ajoutDescriptionEtape = '';
        },
        supprimerEtape(index) {
            this.etapes.splice(index, 1);
        },
        deplacerEtapeVersHaut(index) {
            const temp = this.etapes[index];
            this.etapes[index] = this.etapes[index - 1]
            this.etapes[index - 1] = temp;
        },
        deplacerEtapeVersBas(index) {
            const temp = this.etapes[index];
            this.etapes[index] = this.etapes[index + 1]
            this.etapes[index + 1] = temp;
        },
        async soumettreFormulaire() {
            const nouvelleRecette = {
                id: this.recette.id,
                nom: this.recette.nom,
                desc: this.recette.desc,
                preparation: this.recette.preparation,
                cuisson: this.recette.cuisson,
                portions: this.recette.portions,
                ingredients: this.ingredients,
                etapes: this.etapes
            }
            if (this.modeNouvelleRecette) {
                try {
                    await creerRecette(nouvelleRecette);
                    this.$router.push('/recettes/' + this.recette.id);
                } catch (err) {
                    console.error(err);
                    alert(err.message);
                }
            }
            else {
                try {
                    await modifierRecette(nouvelleRecette);
                    this.$router.push('/recettes/' + this.recette.id);
                } catch (err) {
                    console.error(err);
                    alert(err.message);
                }
            }
        }
    },
    watch: {
        id(nouvelId) {
            this.rafraichirRecette(nouvelId);
        }
    },
    mounted() {
        if (this.id) {
            this.rafraichirRecette(this.id);
        }
    }
};

</script>

<style></style>