<template>
    <div class="boxed">
        <form @submit.prevent="creerCompteUtilisateur">
            <div><label for="nomCompte">Compte utilisateur: </label><input id="nomCompte" v-model="nomCompte" /></div>
            <div><label for="motDePasse">Mot de passe: </label><input id="motDePasse" type="password"
                    v-model="motDePasse" /></div>
            <div><label for="confirmationMotDePasse">Confirmer mot de passe: </label><input id="confirmationMotDePasse"
                    type="password" v-model="confirmationMotDePasse" /></div>
            <div><label for="nomComplet">Nom complet: </label><input id="nomComplet" v-model="nomComplet" /></div>
            <button><router-link to="/recettes">Créer compte</router-link></button>
            
        </form>
    </div>
</template>

<script>


export default {
    data: function () {
        return {
            nomCompte: '',
            motDePasse: '',
            confirmationMotDePasse: '',
            nomComplet: ''
        };
    }
}
</script>

<style scoped>
form * {
    margin: 0.3rem;
}

.boxed-left {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    margin: 1rem auto;
    border-radius: 10px;
    padding: 1rem;
    text-align: left;
    width: 90%;
    max-width: 80rem;
}
</style>