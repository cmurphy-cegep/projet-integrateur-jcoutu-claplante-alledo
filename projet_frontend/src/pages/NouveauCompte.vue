<template>
    <div class="boxed">
        <form @submit.prevent="soumettreCompte">
            <div class="formulaire">
                <div class="form-control">
                    <div><label for="utilisateurId">Votre identifiant: </label><input id="utilisateurId"
                            v-model="utilisateurId" /></div>
                </div>
                <div class="form-control" :class="{ invalide: !motDePasseIdentique }">
                    <div><label for="motDePasse">Mot de passe: </label><input id="motDePasse" type="password"
                            v-model="motDePasse" />
                        <span v-if="!motDePasseIdentique">Les deux champs doivent être identiques !</span>
                    </div>
                </div>
                <div class="form-control" :class="{ invalide: !motDePasseIdentique }">
                    <div><label for="confirmationMotDePasse">Confirmer mot de passe: </label><input
                            id="confirmationMotDePasse" type="password" v-model="confirmationMotDePasse" />
                        <span v-if="!motDePasseIdentique">Les deux champs doivent être identiques !</span>
                    </div>
                </div>
                <div class="form-control">
                    <div><label for="nomComplet">Nom complet: </label><input id="nomComplet" v-model="nomComplet" />
                    </div>
                    <button v-bind:disabled="!validerBouton" v-on="validerChamps" class="creerCompte">Créer le
                        compte</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { creerCompteUtilisateur } from '../NouveauCompteService';

export default {
    data: function () {
        return {
            utilisateurId: '',
            motDePasse: '',
            confirmationMotDePasse: '',
            nomComplet: '',
            motDePasseIdentique: true
        };
    },
    computed: {
        validerBouton() {
            return this.utilisateurId && this.motDePasse && this.confirmationMotDePasse && this.nomComplet;
        }
    },
    methods: {
        async soumettreCompte() {

            if (!this.validerMotDePasse()) {
                return;
            }

            const nouveauCompte = {
                utilisateurId: (this.utilisateurId).toLowerCase(),
                motDePasse: this.motDePasse,
                nomComplet: this.nomComplet
            };

            try {
                await creerCompteUtilisateur(nouveauCompte);
                this.$router.push('/connexion');
            } catch (err) {
                console.error(err);
                alert(err.message);
            }
        },
        validerMotDePasse() {
            this.motDePasseIdentique = this.motDePasse !== '' && this.confirmationMotDePasse !== '' && this.motDePasse === this.confirmationMotDePasse;
            return this.motDePasseIdentique;
        },
        validerChamps() {
            if (this.validerMotDePasse() && this.validerBouton) {
            }
        }
    }
}
</script>

<style scoped>
form * {
    margin: 0.3rem;
}

.formulaire {
    display: flex;
    flex-direction: column;
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
    padding: .25rem;
    font-size: 1rem;
    box-sizing: border-box;
}

.creerCompte {
    width: 20%;
    margin-top: 1rem;
    padding: .25rem;
    font-weight: bold;
}

.boxed {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    margin: 1rem auto;
    border-radius: 10px;
    padding: 1rem;
    text-align: left;
    width: 55%;
    max-width: 80rem;
}
</style>