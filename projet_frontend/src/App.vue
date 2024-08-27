<template>
    <EnteteNavigation />
    <router-view :key="$route.fullPath"></router-view>
</template>

<script>
import { computed } from 'vue';

import EnteteNavigation from './components/EnteteNavigation.vue';

export default {
    components: {
        EnteteNavigation
    },
    data() {
        return {
            recettes: []
        };
    },
    methods: {
        rafraichirRecettes() {
            fetch("/api/recettes")
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Erreur HTTP " + response.status);
                    }
                })
                .then((respRecettes) => {
                    this.recettes = respRecettes;
                }).catch((error) => {
                    console.error("Erreur", error);
                });
        }
    },
    provide() {
        return {
            recettes: computed(() => this.recettes),
            rafraichirRecettes: this.rafraichirRecettes
        };
    },
    mounted() {
        this.rafraichirRecettes();
    }
}
</script>

<style>
* {
    box-sizing: border-box;
}

html {
    font-family: sans-serif;
}
</style>