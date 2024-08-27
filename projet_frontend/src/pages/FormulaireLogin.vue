<template>
    <div class="boxed-left">
        <form @submit.prevent="login">
            <div class="formulaire">
                <div class="form-control" :class="{ invalide: !nomCompteValide }">
                    <div class="labelInputConteneur"><label for="nomCompte">Compte utilisateur: </label><input
                            id="nomCompte" v-model="nomCompte" @blur="validerNomCompte" />
                        <span v-if="!nomCompteValide">Veuillez entrer un nom !</span>
                    </div>
                </div>
                <div class="form-control" :class="{ invalide: !motDePasseValide }">
                    <div class="labelInputConteneur"><label for="motDePasse">Mot de passe: </label><input
                            id="motDePasse" type="password" v-model="motDePasse" @blur="validerMotDePasse" />
                        <span v-if="!motDePasseValide">Veuillez entrer un mot de passe !</span>
                    </div>
                </div>
                <button v-bind:disabled="!validerBouton" class="seConnecter">Se connecter</button>
                <div><router-link to="/nouveauCompte">Créer un compte</router-link></div>
            </div>
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

            const nomCompteMinuscules = this.nomCompte.toLowerCase()

            session.login(nomCompteMinuscules, this.motDePasse).then(user => {
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

.formulaire {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.form-control {
    display: flex;
    margin-bottom: 1rem;
    width: 100%;
}

.labelInputConteneur {
    width: 100%;
}

.form-control label {
    display: inline-block;
    width: 25%;
    margin-right: 1rem;
    text-align: left;
}

.form-control input {
    flex: 1;
    width: 30%;
    padding: 0.25rem;
    margin-right: 1rem;
    font-size: 1rem;
    box-sizing: border-box;
}

.seConnecter {
    width: 20%;
    margin-bottom: 1rem;
    padding: .25rem;
    font-weight: bold;
}

.boxed-left {

    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    margin: 1rem auto;
    border-radius: 10px;
    padding: 2rem;
    text-align: left;
    width: 50%;
    max-width: 80rem;
}
</style>