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
                <input type="number" id="recette-preparation" v-model="recette.preparation" min="1" />
            </div>
            <div>
                <label for="recette-cuisson">Temps de cuisson (en minutes) : </label>
                <input type="number" id="recette-cuisson" v-model="recette.cuisson" min="1" />
            </div>
            <div>
                <label for="recette-portions">Nombre de portions : </label>
                <input type="number" id="recette-portions" v-model="recette.portions" min="1" />
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
                        <td><button v-on:click="supprimerIngredient(index)">Supprimer l'ingrédient</button></td>
                    </tr>

                </tbody>
                <tfoot>
                    <tr>
                        <td><input type="number" id="ingredient-quantite" v-model="ajoutQuantite" /></td>
                        <td><input id="ingredient-uniteMesure" v-model="ajoutUniteMesure" /></td>
                        <td><input id="ingredient-nom" v-model="ajoutNom" /></td>
                        <td><button v-on:click="ajouterIngredient(ajoutQuantite, ajoutUniteMesure, ajoutNom)">Ajouter
                                l'ingrédient</button></td>
                    </tr>
                </tfoot>
            </table>
            <form v-if="voirAjoutIngredient">
                <label for="ingredient-quantite">Quantité : </label>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Texte de l'étape</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(etape, index) in etapes">
                        <td>{{ etape.description }}</td>
                        <td><button v-on:click="supprimerEtape()">Supprimer l'étape</button></td>
                    </tr>
                </tbody>
                <tfoot>
                    <button @click="ajouterEtape()">Ajouter une étape</button>

                </tfoot>
            </table>



        </form>

    </div>
</template>

<script>
import session from '../session';
import { fetchRecette, fetchIngredients, fetchEtapes } from '../RecetteService';


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
        ajouterIngredient(ajoutQuantite, ajoutUniteMesure, ajoutNom) {
            const nouvelIngredient = { ajoutQuantite, ajoutUniteMesure, ajoutNom };
            this.ingredients.push(nouvelIngredient);
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

}

</script>

<style></style>