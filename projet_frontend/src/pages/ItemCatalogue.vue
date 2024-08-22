<template>
  <router-link :to="recetteDetailUrl">
    <div class="recette">
      <div class="recette-image">
        <img :src="imageSrc" alt="Image" />
      </div>
      <div class="recette-info">
        <div class="recette-nom">{{ nom }}</div>
        <div class="recette-description">{{ desc }}</div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { addApiPrefixToPath } from '@/api_utils';
import session from '../session';

export default {
  props: {
    id: String,
    nom: String,
    desc: String,
    image: String,
  },
  data: function () {
    return {
      session: session
    };
  },
  computed: {
    recetteDetailUrl() {
      return "/recettes/" + this.id;
    },
    imageSrc() {
      return `data:image/png;base64,${this.image}`;
    },

  }
}
</script>

<style scoped>
.recette {
  width: 100%;
  height: 100%;
  border: 1px solid black;
  overflow: hidden;
}

.recette img {
  width: 100%;
  height: 40vh;
  object-fit: hidden;
}

.recette-info {
  float: left;
  width: 100%;
}

.recette-nom {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 5px;
  text-align: center;
}

.recette-description {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 575px;
  margin-top: 5px;
  font-size: 0.9em;
  color: #666;
}
</style>
