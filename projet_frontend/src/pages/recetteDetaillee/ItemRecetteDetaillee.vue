<template>
    <!-- ajouter code pour l'image -->
    <div class="recette-detaillee" v-if="!edition">
        <div class="recette-desc-longue"> {{ recette.desc }}</div>
        <div class="recette-titre"> {{ recette.nom }}</div>
        <div class="recette-preparation"> {{ recette.preparation }}</div>
        <div class="recette-cuisson"> {{ recette.cuisson }}</div>
        <div class="recette-portions"> {{ recette.portions }}</div>
        <ul class="recette-ingredients">
        <ListeIngredients v-if="!loading" v-for="ingredient in ingredients" :id="ingredient.id"
        :nom="ingredient.nom" :quantite="ingredient.quantite" :uniteMesure="ingredient.uniteMesure" />
        </ul>
        <ul class="recette-etapes">
        <ListeEtapes v-if="!loading" v-for="etape in etapes" :id="etape.id"
        :description="etape.description" :ordre="etape.ordre" />
        </ul>
        <button type="button" v-if="session.user && session.user.estAdmin" @click="enableEdit">Éditer</button>
    </div>
    <!-- Ajouter l'affichage d'édition de la recette -->
</template>

<script>
import ListeEtapes from './ListeEtapes.vue';
import ListeIngredients from './ListeIngredients.vue';
import { fetchRecette, fetchIngredients, fetchEtapes } from '../../RecetteService';
import { addApiPrefixToPath } from '../api_utils';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import session from '../session';

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
            ingredients: [],
            etapes: [],
            session: session,
            loading: true,
            loadError: false,
            errorMessage: null,
            product: null,
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
        },
        enableEdit() {
            this.edition = true;
        },
        cancelEdit() {
            this.edition = false;
            this.rafraichirRecette(this.id);
        },
        async submitUpdatedProduct() {
            try {
                await updateProduct(this.product);
                this.edition = false;
                this.rafraichirRecette(this.id);
            } catch (err) {
                console.error(err);
                alert(err.message);
            }
        },
        async submitImage() {
            const formData = new FormData();
            const fileField = document.querySelector("input[id='product-image']");
            formData.append('product-image', fileField.files[0]);

            try {
                await updateProductImage(this.id, formData);
                this.edition = false;
                this.rafraichirRecette(this.id);
            } catch (err) {
                console.error(err);
                alert(err.message);
            }
        }
    },
    computed: {
        formattedPrice() {
            return formatCurrency(this.product.price);
        },
        imageSrc() {
            return addApiPrefixToPath(this.product.image);
        }
    },
    watch: {
        id(newId) {
            this.rafraichirRecette(nouvelId);
        }
    },
    mounted() {
        this.rafraichirRecette(this.id),

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
    }
}
</script>