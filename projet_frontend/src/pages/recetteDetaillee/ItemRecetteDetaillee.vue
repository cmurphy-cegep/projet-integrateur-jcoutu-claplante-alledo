<template>
    <LoadingSpinner :loading="loading" :error="loadError" :errorMessage="errorMessage" />
    <div v-if="recette && ingredients && etapes" class="recette">
        <div class="recette-main-container">
            <div class="recette-container1">
                <div class="image-redimensionnee">
                    <img v-bind:src="imageSrc" />
                </div>
                <div class="recette-detaillee" v-if="!edition">
                    <div class="recette-desc-longue" v-html="recette.desc"></div>
                </div>
            </div>
            <div class="recette-container2">
                <h2 class="recette-titre"> {{ recette.nom }}</h2>
                <div class="recette-container3">
                    <div class="recette-preparation">
                        <label for="recette-cuisson">Préparation : </label>
                        {{ recette.preparation }}
                    </div>
                    <div class="recette-cuisson">
                        <label for="recette-cuisson">Cuisson : </label>
                        {{ recette.cuisson }}
                    </div>
                    <div class="recette-portions">
                        <label for="recette-portions">Portions : </label>
                        {{ recette.portions }}
                    </div>
                </div>
                <h3 class="ingredient"> Ingrédients</h3>
                <ul class="recette-ingredients">
                    <ListeIngredients 
                    v-if="!loading"
                    v-for="ingredient in ingredients"
                    :id="ingredient.idIngredient"
                    :nom="ingredient.nom"
                    :quantite="ingredient.quantite"
                    :uniteMesure="ingredient.uniteMesure" />
                </ul>
                <h3 class="etape"> Étapes</h3>
                <ol class="recette-etapes">
                    <ListeEtapes
                    v-if="!loading"
                    v-for="etape in etapes"
                    :id="etape.idEtape"
                    :description="etape.description"
                    :ordre="etape.ordre" />
                </ol>
            </div>
        </div>
        <button type="button" v-if="session.user && session.user.estAdmin" @click="enableEdit">Éditer</button>
        <!-- Ajouter l'affichage d'édition de la recette -->
    </div>
</template>

<script>
import ListeEtapes from './ListeEtapes.vue';
import ListeIngredients from './ListeIngredients.vue';
import { fetchRecette, fetchIngredients, fetchEtapes } from '../../RecetteService';
import LoadingSpinner from '../../components/LoadingSpinner.vue';
import session from '../../session';

export default {
    components: {
        LoadingSpinner,
        ListeIngredients,
        ListeEtapes
    },
    props: {
        id: String
    },
    data() {
        return {
            recette: null,
            ingredients: [],
            etapes: [],
            session: session,
            loading: true,
            loadError: false,
            errorMessage: null,
            edition: false
        };
    },
    methods: {
        rafraichirRecette(id) {
            this.loadError = false;
            this.loading = true;
            this.errorMessage = null;
            this.recette = null;

            fetchRecette(id).then(recette => {
                this.recette = recette;
                this.loading = false;
            }).catch(err => {
                this.recette = null;
                this.loadError = true;
                this.loading = false;
                this.errorMessage = err.message;
            });

            fetchIngredients(id).then(ingredients => {
                this.ingredients = ingredients;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.loadError = true;
                this.errorMessage = err.message;
            });

            fetchEtapes(id).then(etapes => {
                this.etapes = etapes;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.loadError = true;
                this.errorMessage = err.message;
            });
        },
    },
    computed: {
        imageSrc() {
            return `data:image/png;base64,${this.recette.image}`;
        }
    },
    watch: {
        id(nouvelId) {
            this.rafraichirRecette(nouvelId);
        }
    },
    mounted() {
        this.rafraichirRecette(this.id);
    }
}
</script>
<style scoped>
.recette-main-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    height: 100vh;
    /* Utilisez la hauteur de la fenêtre */
}

.recette-container1 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 45vw;
    /* Utilisez des unités relatives pour la largeur */
    padding: 2vw;
    /* Utilisez des unités relatives pour le padding */
}

.recette-container2 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 50vw;
    /* Utilisez des unités relatives pour la largeur */
    padding: 2vw;
    /* Utilisez des unités relatives pour le padding */
}

.recette-container3 {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 2vh;
    /* Utilisez des unités relatives pour la marge */
    border-bottom: 0.2vh solid black;
    /* Utilisez des unités relatives pour la bordure */
    border-top: 0.2vh solid black;
    /* Utilisez des unités relatives pour la bordure */
}

.image-redimensionnee {
    max-width: 95%;
    height: auto;
    flex: 0 0 auto;
    margin-right: 2vw;
    /* Utilisez des unités relatives pour la marge */
}

.image-redimensionnee img {
    width: 100%;
    height: auto;
    /* Ajoutez ces styles pour s'assurer que l'image se redimensionne correctement */
    display: block;
    object-fit: cover; /* Ajustez cette propriété selon vos besoins (cover, contain, etc.) */
}
.recette-desc-longue {
    margin-top: 2vh;
    /* Utilisez des unités relatives pour la marge */
    margin-bottom: 2vh;
    /* Utilisez des unités relatives pour la marge */
    max-width: 95%;
}

.recette-titre {
    font-size: 1.75vw;
    /* Utilisez des unités relatives pour la taille de la police */
    margin-top: 0;
}

.recette-titre-ingredient,
.recette-titre-preparation {
    font-size: 1.5vw;
    /* Utilisez des unités relatives pour la taille de la police */
}

.ingredient {
    margin-bottom: 1vh;
    /* Utilisez des unités relatives pour la marge */
}

.etape {
    margin-bottom: 1vh;
    /* Utilisez des unités relatives pour la marge */
}

.recette-preparation,
.recette-cuisson,
.recette-portions {
    flex: 1;
    box-sizing: border-box;
    padding: 2vw;
    /* Utilisez des unités relatives pour le padding */
}
</style>