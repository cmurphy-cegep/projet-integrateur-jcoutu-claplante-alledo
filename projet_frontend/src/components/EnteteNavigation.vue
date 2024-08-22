<template>
    <header>
        <div class="container">
            <div class="title">
                <router-link to="/">
                    <h1 class="black-title">Les recettes de Rodrigo</h1>
                </router-link>
            </div>
            <div class="nav">
                <span v-if="session.user && session.user.estAdmin"> 
                    <router-link to="/nouvelleRecette">Nouvelle recette</router-link>
                </span>
            </div>

            <div v-if="session.user && session.user.estAdmin">
                <img class="admin-image" src="../../imageAdmin/admin.jpg" alt="Administrateur">
            </div>
            <div class="connexion">
                <div v-if="session.user">
                    <div>Bienvenue, {{ session.user.utilisateurNomComplet }}
                    <a href="" @click.prevent="session.disconnect()">Déconnexion</a></div>
                </div>
                <div v-else><router-link to="/connexion">Se connecter</router-link></div>
            </div>
        </div>
    </header>
</template>

<script>
import session from '../session';

export default {
    data: function () {
        return {
            session: session
        };
    },
}
</script>

<style scoped>
.admin-image {
    width: 4vw;
    height: auto;
}

.black-title {
    font-size: 2.25vw;
    color: black;
}

.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0rem;
}

.title {
    flex-basis: 0 0 40%;
    padding: 0.3rem;
}

.nav {
    flex-basis: 0 0 25%;
    padding: 0.3rem;
    margin-left: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}


.connexion {
    flex-basis: 0 0 30%;
    padding: 0.3rem;
    text-align: right;
}
.admin {
    flex-basis: 0 0 5%;
}
</style>
