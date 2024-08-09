<template>
  <div id="recette-list">
    <h2>Catalogue de recettes</h2>
    <LoadingSpinner :error="loadError" :loading="loading"/>
    <ItemCatalogue v-for="recette in recettes" v-if="!loading" :id="recette.id" :desc="recette.desc"
                    :nom="recette.nom" :image="recette.image"/>
  </div>
</template>

<script>
import ItemCatalogue from './ItemCatalogue.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import { fetchRecettes } from '../RecetteService';

export default {
  components: {
    ItemCatalogue: ItemCatalogue,
    LoadingSpinner: LoadingSpinner
  },
  data() {
    return {
      recettes: [],
      loading: true,
      loadError: false
    };
  },
  mounted() {
    fetchRecettes().then(recettes => {
      this.recettes = recettes;
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

<style scoped>
#recette-list {
  flex-basis: 70%;
  margin-right: 20px;
  border: 1px solid black;
  padding: 10px;
}
</style>
