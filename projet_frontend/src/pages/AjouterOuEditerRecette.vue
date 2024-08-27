<template>
    <div v-if="session.user && session.user.estAdmin">
        <h2 v-if="modeNouvelleRecette">Création d'une nouvelle recette</h2>
        <h2 v-if="!modeNouvelleRecette">Édition de la recette : id {{ recette.id }}
            <button type="button" @click="supprimerRecette">Supprimer la recette</button>
        </h2>
        <form class="formulaire" @submit.prevent="soumettreFormulaire">
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
            <div class="form-control">
                <label for="recette-preparation">Temps de préparation (en minutes) : </label>
                <input type="number" id="recette-preparation" v-model="recette.preparation" min="0" step="1" />
            </div>
            <div class="form-control">
                <label for="recette-cuisson">Temps de cuisson (en minutes) : </label>
                <input type="number" id="recette-cuisson" v-model="recette.cuisson" min="0" step="1" />
            </div>
            <div class="form-control">
                <label for="recette-portions">Nombre de portions : </label>
                <input type="number" id="recette-portions" v-model="recette.portions" min="0" step="1" />
            </div>
            <div class="form-control">
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

            <table class="table-ajout-ingredient">

                <thead>
                    <tr class="table-ajout-titre">
                        <th>Quantité</th>
                        <th>Unité</th>
                        <th>Nom de l'ingrédient</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <colgroup>
                    <col style="width: 25%;">
                    <col style="width: 25%;">
                    <col style="width: 25%;">
                    <col style="width: 8%;">
                    <col style="width: 8%;">
                    <col style="width: 8%;">
                </colgroup>
                <tbody>

                    <tr v-for="(ingredient, index) in ingredients">
                        <td>{{ ingredient.quantite }}</td>
                        <td>{{ ingredient.uniteMesure }}</td>
                        <td>{{ ingredient.nom }}</td>
                        <td><button type="button" v-if="ingredient && index !== 0"
                                @click="deplacerIngredientVersHaut(index)">&#x2191;</button></td>
                        <td><button type="button" v-if="ingredient && index !== ingredients.length - 1"
                                @click="deplacerIngredientVersBas(index)">&#x2193;</button></td>
                        <td><button type="button" v-if="ingredient" @click="supprimerIngredient(index)">Supprimer
                                l'ingrédient</button></td>
                    </tr>

                </tbody>
                <tfoot>
                    <tr class="table-ajout-saisie">
                        <td>
                            <input type="number" id="ingredient-quantite" v-model="ajoutQuantite" min="0" step="0.1"
                                placeholder="0.0" />
                        </td>
                        <td>
                            <input id="ingredient-uniteMesure" v-model="ajoutUniteMesure" />
                        </td>
                        <td :class="{ invalide: !ajoutNomIngredientValide }">
                            <input id="ingredient-nom" v-model="ajoutNomIngredient" />
                        </td>
                        <td>
                        </td>
                        <td></td>
                        <td><button type="button" @click="ajouterIngredient">Ajouter l'ingrédient</button></td>
                    </tr>
                </tfoot>
            </table>
            <span class="span-ingredient" v-if="!ajoutNomIngredientValide">Pour ajouter un ingrédient, veuillez saisir
                le
                nom de
                l'ingrédient</span>
            <h3 class="etape"> Étapes</h3>
            <span class="form-control" :class="{ invalide: !etapesValide }"></span>
            <span v-if="!etapesValide">Un minimum d'une étape est requise.</span>
            <table class="table-ajouter-etape">
                <colgroup>
                    <col style="width: 20%;">
                    <col style="width: 5%;">
                    <col style="width: 5%;">
                    <col style="width: 10%;">
                </colgroup>
                <thead>
                    <tr>
                        <th>Texte de l'étape</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(etape, index) in etapes">
                        <td>{{ etape.description }}</td>
                        <td><button type="button" v-if="etape && index !== 0"
                                @click="deplacerEtapeVersHaut(index)">&#x2191;</button></td>
                        <td><button type="button" v-if="etape && index !== etapes.length - 1"
                                @click="deplacerEtapeVersBas(index)">&#x2193;</button></td>
                        <td><button type="button" v-if="etape" @click="supprimerEtape(index)">Supprimer l'étape</button>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td :class="{ invalide: !ajoutDescriptionEtapeValide }">
                            <input id="etape-texte" v-model="ajoutDescriptionEtape" />
                        </td>
                        <td></td>

                        <td></td>
                        <td><button type="button" @click="ajouterEtape">Ajouter une étape</button></td>
                    </tr>
                </tfoot>

            </table>
            <span class="span-etape" v-if="!ajoutDescriptionEtapeValide">Pour ajouter une étape, veuillez saisir le
                texte de l'étape</span>
            <div>
                <button type="submit">Soumettre le formulaire</button>
            </div>
        </form>
        <hr />
        <form v-if="!modeNouvelleRecette" @submit.prevent="soumettreImage">
            <div class="pied-page">
                <div>
                    <label for="recette-image">Téléverser l'image : </label>
                </div>
                <div>
                    <input class="bouton-choix-fichier" type="file" id="recette-image"
                        accept="image/png, image/jpeg, image/gif" />
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

            if (this.idValide && this.nomValide && this.descValide && this.ingredientsValide && this.etapesValide) {
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
.formulaire {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 1rem;
}

.form-control {
    display: flex;
    margin-bottom: .5rem;
    width: 100%;
}

.form-control label {
    display: inline-block;
    width: 20%;
    margin-right: .6rem;
    text-align: left;
}

.form-control input {
    width: 29%;
    padding: 0.25rem;
    font-size: 1rem;
    box-sizing: border-box;
}

.form-control textarea {
    width: 50%;
    padding: 0.25rem;
    font-size: 1rem;
    box-sizing: border-box;
}

.form-control.invalide input,
.form-control.invalide select {
    border-color: red;
}

.form-control.invalide label {
    color: red;
}

.table-ajout-ingredient {
    width: 67%;
    border-collapse: collapse;
}

.table-ajout-ingredient th,
.table-ajout-ingredient td {
    border: 1px solid #ccc;
    padding: 0.5rem;
    text-align: left;
}

.span-ingredient {
    margin-top: 1%;
    text-align: right;
    max-width: 67%;
    color: red;
}

.table-ajouter-etape {
    width: 60%;
    border-collapse: collapse;
    margin-bottom: 1%;
}

.table-ajouter-etape th,
.table-ajouter-etape td {
    border: 1px solid #ccc;
    padding: 0.5rem;
    text-align: left;
}

.span-etape {
    max-width: 60%;
    margin-top: 1%;
    text-align: right;
    color: red;
}

.bouton-choix-fichier {
    padding-top: 1%;
}

.pied-page {
    margin-left: 1%;
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