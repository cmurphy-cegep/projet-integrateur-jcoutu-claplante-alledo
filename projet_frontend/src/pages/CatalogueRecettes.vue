<template>
  <div id="recette-liste">
    <LoadingSpinner :error="loadError" :loading="loading" />
    <div v-if="!loading" class="recette-grille">
      <div v-for="recette in recettes" :key="recette.id" class="recette-conteneur">
        <ItemCatalogue :id="recette.id" :image="recette.image" :nom="recette.nom" :desc="recette.desc" />
      </div>
    </div>
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
.recette-grille {
  display: grid;
  justify-content: center;
}


.recette-conteneur {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
}

@media (min-width: 600px) {
  .recette-grille {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .recette-grille {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
