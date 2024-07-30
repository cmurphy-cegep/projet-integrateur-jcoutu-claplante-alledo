<template>
    <div class="boxed-left">
        <form @submit.prevent="login">
            <div><label for="nomCompte">Compte utilisateur: </label><input id="nomCompte" v-model="nomCompte" /></div>
            <div><label for="motDePasse">Mot de passe: </label><input id="motDePasse" type="password"
                    v-model="motDePasse" /></div>
            <button>Se connecter</button>
        </form>
    </div>
</template>

<script>

  import session from '../session';

  export default {
    data: function () {
        return {
            nomCompte: '',
            motDePasse: ''
        };
    },
    methods: {
        login() {
            session.login(this.nomCompte, this.motDePasse).then(user => {
               alert("Bienvenue, " + user.userFullName + (user.isAdmin ? ".\nVous êtes administrateur." : "."));
                this.$router.push('/');
            }).catch(authError => {
                alert(authError.message);
            });
        }
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