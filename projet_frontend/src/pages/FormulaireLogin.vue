<template>
    <div class="boxed-left">
        <form @submit.prevent="login">
            <div class="form-control" :class="{ invalide: !nomCompteValide }">
                <div><label for="nomCompte">Compte utilisateur: </label><input id="nomCompte" v-model="nomCompte" 
                @blur="validerNomCompte" />
                    <span v-if="!nomCompteValide">Veuillez entrer un nom !</span>
                </div>
            </div>
            <div class="form-control" :class="{ invalide: !motDePasseValide }">
                <div><label for="motDePasse">Mot de passe: </label><input id="motDePasse" type="password" v-model="motDePasse" 
                @blur="validerMotDePasse" />
                    <span v-if="!motDePasseValide">Veuillez entrer un mot de passe !</span>
                </div>
            </div>
            <button v-bind:disabled="!validerBouton" >Se connecter</button>
            <div><router-link to="/creationCompte">Créer un compte</router-link></div>
        </form>
    </div>
</template>

<script>

  import session from '../session';

  export default {
    data: function () {
        return {
            nomCompte: '',
            nomCompteValide: true,
            motDePasse: '',
            motDePasseValide: true
        };
    },
    computed: {
        validerBouton() {
            return this.nomCompte && this.motDePasse;
        }
    },
    methods: {
        login() {
            this.validerNomCompte();
            this.validerMotDePasse();

            session.login(this.nomCompte, this.motDePasse).then(user => {
               alert("Bienvenue, " + user.utilisateurNomComplet + (user.estAdmin ? ".\nVous êtes administrateur." : "."));
                this.$router.push('/');
            }).catch(authError => {
                alert(authError.message);
            });
        },
        validerNomCompte() {
            if (this.nomCompte === '') {
                this.nomCompteValide = false;
            } else {
                this.nomCompteValide = true;
            }
        },
        validerMotDePasse() {
            if (this.motDePasse === '') {
                this.motDePasseValide = false;
            } else {
                this.motDePasseValide = true;
            }
        },
        
    }
}
</script>

<style scoped>
.form-control.invalide input,

.form-control.invalide select {
    border-color: red;
}

.form-control.invalide label {
    color: red;
}
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