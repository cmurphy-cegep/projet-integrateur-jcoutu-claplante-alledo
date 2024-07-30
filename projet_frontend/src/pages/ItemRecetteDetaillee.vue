<template>
    <!-- ajouter code pour l'image -->
    <div class="recette-detaillee" v-if="!edition">
        <div class="recette-desc-longue"> {{ recette.desc }}</div>
        <div class="recette-titre"> {{ recette.nom }}</div>
        <div class="recette-preparation"> {{ recette.preparation }}</div>
        <div class="recette-cuisson"> {{ recette.cuisson }}</div>
        <div class="recette-portions"> {{ recette.portions }}</div>
        <div class="recette-ingredients"> {{ recette.ingredients }}</div>
        <div class="recette-preparation"> {{ recette.etapes }}</div>
        <!-- Modifier ingredients et preparation -->
        <button type="button" v-if="session.user && session.user.estAdmin" @click="enableEdit">Éditer</button>
    </div>
    <!-- Ajouter l'affichage d'édition de la recette -->
</template>