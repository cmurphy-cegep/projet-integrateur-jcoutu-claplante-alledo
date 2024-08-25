<template>
    <div v-if="session.user && session.user.estAdmin">
        <h2 v-if="modeNouvelleRecette">Création d'une nouvelle recette</h2>
        <h2 v-if="!modeNouvelleRecette">Édition de la recette : id {{ recette.id }}
            <button type="button" @click="supprimerRecette">Supprimer la recette</button>
        </h2>
        <form @submit.prevent="soumettreFormulaire">
            <div v-if="modeNouvelleRecette" class="form-control" :class="{ invalide: !idValide }">
                <label for="recette-id">Identifiant de la recette : </label>
                <input id="recette-id" v-model="recette.id" />
                <span v-if="!idValide">Veuillez entrer un identifiant de recette</span>
            </div>
            <div class="form-control" :class="{ invalide: !nomValide }">
                <label for="recette-nom">Nom de la recette : </label>
                <input id="recette-nom" v-model="recette.nom" />
                <span v-if="!nomValide">Veuillez entrer un nom</span>
            </div>
            <div>
                <label for="recette-preparation">Temps de préparation (en minutes) : </label>
                <input type="number" id="recette-preparation" v-model="recette.preparation" min="0" step="1" />
            </div>
            <div>
                <label for="recette-cuisson">Temps de cuisson (en minutes) : </label>
                <input type="number" id="recette-cuisson" v-model="recette.cuisson" min="0" step="1" />
            </div>
            <div>
                <label for="recette-portions">Nombre de portions : </label>
                <input type="number" id="recette-portions" v-model="recette.portions" min="0" step="1" />
            </div>
            <div>
                <label for="recette-description">Description de la recette : </label>
            </div>
            <div class="form-control" :class="{ invalide: !descValide }">
                <textarea id="recette-description" v-model="recette.desc" maxlength="700" rows="7"
                    cols="100"> </textarea>
                <span v-if="!descValide">Veuillez entrer une description</span>
            </div>
            <h3 class="ingredient"> Ingrédients</h3>
            <span class="form-control" :class="{ invalide: !ingredientsValide }"></span>
            <span v-if="!ingredientsValide">Un minimum d'un ingrédient est requis.</span>
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
                        <td>
                            <input type="number" id="ingredient-quantite" v-model="ajoutQuantite" min="0" step="0.1"
                                placeholder="0.0" />
                        </td>
                        <td>
                            <input id="ingredient-uniteMesure" v-model="ajoutUniteMesure" />
                        </td>
                        <td class="form-control" :class="{ invalide: !ajoutNomIngredientValide }">
                            <input id="ingredient-nom" v-model="ajoutNomIngredient" />
                        </td>
                        <td>
                            <button type="button" @click="ajouterIngredient">Ajouter l'ingrédient</button>
                            <span v-if="!ajoutNomIngredientValide">Pour ajouter un ingrédient, veuillez saisir le nom de
                                l'ingrédient</span>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <h3 class="etape"> Étapes</h3>
            <span class="form-control" :class="{ invalide: !etapesValide }"></span>
            <span v-if="!etapesValide">Un minimum d'une étape est requise.</span>
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
                        <td class="form-control" :class="{ invalide: !ajoutDescriptionEtapeValide }">
                            <input id="etape-texte" v-model="ajoutDescriptionEtape" />
                        </td>
                        <td><button type="button" @click="ajouterEtape">Ajouter une étape</button></td>
                        <span v-if="!ajoutDescriptionEtapeValide">Pour ajouter une étape, veuillez saisir le texte de
                            l'étape</span>
                    </tr>
                </tfoot>
            </table>
            <div>
                <button type="submit">Soumettre le formulaire</button>
            </div>
        </form>
        <hr />
        <form v-if="!modeNouvelleRecette" @submit.prevent="soumettreImage">
            <div>
                <div>
                    <label for="recette-image">Téléverser l'image : </label>
                </div>
                <div>
                    <input type="file" id="recette-image" accept="image/png, image/jpeg, image/gif" />
                </div>
                &nbsp;
                <div>
                    <button type="submit">Soumettre l'image</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { fetchRecette, fetchIngredients, fetchEtapes, creerRecette, modifierRecette, modifierRecetteImage, supprimerRecette } from '../RecetteService';
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
                portions: this.portions || '',
                desc: this.desc || '',
            },
            ingredients: [],
            etapes: [],
            ajoutQuantite: '',
            ajoutUniteMesure: '',
            ajoutNomIngredient: '',
            ajoutDescriptionEtape: '',
            idValide: true,
            nomValide: true,
            descValide: true,
            ingredientsValide: true,
            etapesValide: true,
            ajoutNomIngredientValide: true,
            ajoutDescriptionEtapeValide: true
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
            this.transformerAjoutQuantiteNullAZero();
            this.validerAjoutNomIngredient();

            if (this.ajoutNomIngredientValide) {
                const nouvelIngredient = {
                    quantite: this.ajoutQuantite,
                    uniteMesure: this.ajoutUniteMesure,
                    nom: this.ajoutNomIngredient
                }
                this.ingredients.push(nouvelIngredient);
                this.ajoutQuantite = '';
                this.ajoutUniteMesure = '';
                this.ajoutNomIngredient = '';
            } else {
                alert("Veuillez remplir les champs obligatoires");
            }
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
            this.validerAjoutDescriptionEtape();

            if (this.ajoutDescriptionEtapeValide) {
                const nouvelleEtape = {
                    description: this.ajoutDescriptionEtape
                }
                this.etapes.push(nouvelleEtape);
                this.ajoutDescriptionEtape = '';
            } else {
                alert("Veuillez remplir les champs obligatoires");
            }
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
        soumettreFormulaire() {
            this.validerId();
            this.validerNom();
            this.transformerPreparationNullAZero();
            this.transformerCuissonNullAZero();
            this.transformerPortionsNullAZero();
            this.validerDescription();
            this.validerIngredients();
            this.validerEtapes();

            if (this.idValide && this.nomValide && this.descValide && this.ingredientsValide &&this.etapesValide) {
                this.envoyerFormulaire();
            } else {
                alert("Veuillez remplir les champs obligatoires");
            }
        },
        async envoyerFormulaire() {
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
        },
        validerId() {
            if (this.recette.id === '') {
                this.idValide = false;
            } else {
                this.idValide = true;
            }
        },
        validerNom() {
            if (this.recette.nom === '') {
                this.nomValide = false;
            } else {
                this.nomValide = true;
            }
        },
        transformerPreparationNullAZero() {
            if (this.recette.preparation === null || this.recette.preparation === "" || this.recette.preparation === "-") {
                this.recette.preparation = 0;
            }
        },
        transformerCuissonNullAZero() {
            if (this.recette.cuisson === null || this.recette.cuisson === "" || this.recette.cuisson === "-") {
                this.recette.cuisson = 0;
            }
        },
        transformerPortionsNullAZero() {
            if (this.recette.portions === null || this.recette.portions === "" || this.recette.portions === "-") {
                this.recette.portions = 0;
            }
        },
        validerDescription() {
            if (this.recette.desc === '') {
                this.descValide = false;
            } else {
                this.descValide = true;
            }
        },
        validerIngredients() {
            if (!this.ingredients || this.ingredients.length === 0) {
                this.ingredientsValide = false;
            } else {
                this.ingredientsValide = true;
            }
        },
        validerEtapes() {
            if (!this.etapes || this.etapes.length === 0) {
                this.etapesValide = false;
            } else {
                this.etapesValide = true;
            }
        },
        transformerAjoutQuantiteNullAZero() {
            if (this.ajoutQuantite === null || this.ajoutQuantite === "") {
                this.ajoutQuantite = 0;
            }
        },
        validerAjoutNomIngredient() {
            if (this.ajoutNomIngredient === '') {
                this.ajoutNomIngredientValide = false;
            } else {
                this.ajoutNomIngredientValide = true;
            }
        },
        validerAjoutDescriptionEtape() {
            if (this.ajoutDescriptionEtape === '') {
                this.ajoutDescriptionEtapeValide = false;
            } else {
                this.ajoutDescriptionEtapeValide = true;
            }
        },
        async soumettreImage() {
            const formDonnees = new FormData();
            const champFichier = document.querySelector("input[id='recette-image']");
            formDonnees.append('recette-image', champFichier.files[0]);

            try {
                await modifierRecetteImage(this.recette.id, formDonnees);
                this.$router.push('/recettes/' + this.recette.id);
            } catch (err) {
                console.error(err);
                alert(err.message);
            }
        },
        async supprimerRecette() {
            try {
                await supprimerRecette(this.recette.id);
                this.$router.push('/recettes/');
            } catch (err) {
                console.error(err);
                alert(err.message);
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

<style scoped>
.form-control.invalide input,
.form-control.invalide select {
    border-color: red;
}

.form-control.invalide label {
    color: red;
}

form * {
    margin: 0.3rem;
}

.boxed-left {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    margin: 1rem auto;
    border-radius: 10px;
    padding: 1rem;
    text-align: left;
    width: 90%;
    max-width: 80rem;
}
</style>