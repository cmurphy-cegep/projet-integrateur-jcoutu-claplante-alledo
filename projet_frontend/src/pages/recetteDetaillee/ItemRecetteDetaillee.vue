<template>
    <LoadingSpinner :loading="loading" :error="loadError" :errorMessage="errorMessage" />
    <div v-if="recette" class="recette">
        <!-- ajouter code pour l'image -->
        <div class="recette-detaillee" v-if="!edition">
            <div class="recette-desc-longue"> {{ recette.desc }}</div>
            <div class="recette-titre"> {{ recette.nom }}</div>
            <div class="recette-preparation"> {{ recette.preparation }}</div>
            <div class="recette-cuisson"> {{ recette.cuisson }}</div>
            <div class="recette-portions"> {{ recette.portions }}</div>

            <ul v-if="ingredients" class="recette-ingredients">
                <ListeIngredients v-if="!loading" v-for="ingredient in ingredients" :id="ingredient.idIngredient"
                    :nom="ingredient.nom" :quantite="ingredient.quantite" :uniteMesure="ingredient.uniteMesure" />
            </ul>
            <ul class="recette-etapes">
                <ListeEtapes v-if="!loading" v-for="etape in etapes" :id="etape.idEtape"
                    :description="etape.description" :ordre="etape.ordre" />
            </ul>
            <button type="button" v-if="session.user && session.user.estAdmin" @click="enableEdit">Éditer</button>
        </div>
        <!-- Ajouter l'affichage d'édition de la recette -->
    </div>
</template>

<script>
import ListeEtapes from './ListeEtapes.vue';
import ListeIngredients from './ListeIngredients.vue';
import { fetchRecette, fetchIngredients, fetchEtapes } from '../../RecetteService';
import { addApiPrefixToPath } from '../../api_utils';
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

            fetchIngredients().then(ingredients => {
                this.ingredients = ingredients;
                this.loading = false;
                this.loadError = false;
            }).catch(err => {
                console.error(err);
                this.loading = false;
                this.loadError = true;
            }),

                fetchEtapes().then(etapes => {
                    this.etapes = etapes;
                    this.loading = false;
                    this.loadError = false;
                }).catch(err => {
                    console.error(err);
                    this.loading = false;
                    this.loadError = true;
                });
        },
    },
    watch: {
        id(nouvelId) {
            this.rafraichirRecette(nouvelId);
        }
    },
    mounted() {
        this.rafraichirRecette(this.id)
    }
}
</script>