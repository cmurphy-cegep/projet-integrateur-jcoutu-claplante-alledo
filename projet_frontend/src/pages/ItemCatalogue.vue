<template>
  <div class="recette">
    <img :src="imageSrc" alt="Image" />
    <div class="recette-info">
      <div class="recette-name">
        <router-link :to="recetteDetailUrl">{{ nom }}</router-link>
      </div>
      <div class="recette-description">{{ desc }}</div>
    </div>
  </div>
</template>

<script>
import {addApiPrefixToPath} from '@/api_utils';
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
  margin-bottom: 20px;
  border: 1px solid black;
  padding: 10px;
  overflow: hidden;
  clear: both;
}

.recette img {
  float: left;
  margin-right: 10px;
  width: 100px;
  object-fit: cover;
}

.recette-info {
  float: left;
  width: 60%;
}

.recette-name {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 5px;
}

.recette-description {
  margin-top: 5px;
  font-size: 0.9em;
  color: #666;
}
</style>
