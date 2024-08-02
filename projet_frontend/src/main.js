import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

//import ItemRecetteDetaillee from './pages/recetteDetaillee/ItemRecetteDetaillee.vue';
//import ListeIngredients from './pages/recetteDetaillee/ListeIngredients.vue';
//import ListeEtapes from './pages/recetteDetaillee/ListeEtapes.vue';
import FormulaireLogin from './pages/FormulaireLogin.vue';

const app = createApp(App);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        //{ path: '/recettes/:id', component: ItemRecetteDetaillee, props: true },
       // { path: '/ingredients/:id', component: ListeIngredients, props: true },
       // { path: '/etapes/:id', component: ListeEtapes, props: true },
        { path: '/connexion', component: FormulaireLogin }
    ]
});

app.use(router);

app.mount("#app");