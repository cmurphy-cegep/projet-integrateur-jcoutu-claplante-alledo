import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

import ItemRecetteDetaillee from './pages/recetteDetaillee/ItemRecetteDetaillee.vue';
import FormulaireLogin from './pages/FormulaireLogin.vue';

const app = createApp(App);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/recettes/:id', component: ItemRecetteDetaillee, props: true },
        { path: '/connexion', component: FormulaireLogin }
    ]
});

app.use(router);

app.mount("#app");