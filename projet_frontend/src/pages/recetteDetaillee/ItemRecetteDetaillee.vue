<template>
    <LoadingSpinner :loading="loading" :error="loadError" :errorMessage="errorMessage" />
    <div v-if="recette && ingredients && etapes" class="recette">
        <img v-bind:src="imageSrc" />
        <div class="recette-detaillee" v-if="!edition">

            <div class="recette-desc-longue" v-html = "recette.desc" ></div>

            <div class="recette-titre"> {{ recette.nom }}</div>

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

        <ul class="recette-ingredients">
            <ListeIngredients v-if="!loading" v-for="ingredient in ingredients" :id="ingredient.idIngredient"
                :nom="ingredient.nom" :quantite="ingredient.quantite" :uniteMesure="ingredient.uniteMesure" />
        </ul>

        <ol class="recette-etapes">
            <ListeEtapes v-if="!loading" v-for="etape in etapes" :id="etape.idEtape" :description="etape.description"
                :ordre="etape.ordre" />
        </ol>
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