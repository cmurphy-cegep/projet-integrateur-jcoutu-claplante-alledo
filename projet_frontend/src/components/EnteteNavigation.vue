<template>
    <header>
        <div class="container">
            <div class="title">
                <h1 class="black-title">Les recettes de Rodrigo</h1>
            </div>
            <div class="nav">
                <span v-if="session.user && session.user.isAdmin"> | 
                    <router-link to="/admin/new-product">Nouvelle recette</router-link>
                    <!-- rajouter image pour admin -->
                </span>
            </div>

            <div class="connexion">
                <div v-if="session.user">
                    <div>Bienvenue, {{ session.user.userFullName }}</div>
                    <div><a href="" @click.prevent="session.disconnect()">Déconnexion</a></div>
                </div>
                <div v-else><router-link to="/login">Se connecter</router-link></div>
            </div>
        </div>
    </header>
</template>

<script>
import session from '../session';

export default {
    data: function() {
        return {
            session: session
        };
    },
}
</script>

<style scoped>
.black-title {
    color: black;
}

.container {
    display: flex;
    justify-content: space-between;
    padding: 0rem;
}

.title {
    flex-basis: 30%;
    padding: 0.3rem;
}

.nav {
    flex-basis: 40%;
    padding: 0.3rem;
}

.panier {
    flex-basis: 15%;
    padding: 0.3rem;
}

.connexion {
    flex-basis: 15%;
    padding: 0.3rem;
    text-align: right;
}

.admin {
    background-color: darkred;
    color: white;
    text-align: center;
}
</style>
