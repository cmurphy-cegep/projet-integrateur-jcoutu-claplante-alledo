import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

import CatalogueRecettes from './pages/CatalogueRecettes.vue';
import ItemRecetteDetaillee from './pages/recetteDetaillee/ItemRecetteDetaillee.vue';
import FormulaireLogin from './pages/FormulaireLogin.vue';
import NouveauCompte from './pages/NouveauCompte.vue';

const app = createApp(App);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/recettes' },
        { path: '/recettes/:id', component: ItemRecetteDetaillee, props: true },
        { path: '/connexion', component: FormulaireLogin },
        { path: '/recettes', component: CatalogueRecettes },
        { path: '/nouveauCompte', component: NouveauCompte }
        //{ path: '/admin/nouvelle-recette', component: A determiner },       
    ]
});

app.use(router);

app.mount("#app");