<template>
    <div class="boxed">
        <form @submit.prevent="soumettreCompte">
            <div><label for="utilisateurId">Votre identifiant: </label><input id="utilisateurId"
                    v-model="utilisateurId" /></div>
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
            <div><label for="nomComplet">Nom complet: </label><input id="nomComplet" v-model="nomComplet" /></div>
            <!-- <button v-bind:disabled="!validerBouton" @click="gererCreationCompte">Créer le compte</button> -->
            <button v-bind:disabled="!validerBouton">Créer le compte</button>
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
                utilisateurId: this.utilisateurId,
                motDePasse: this.motDePasse,
                nomComplet: this.nomComplet
            };

            try {
                await creerCompteUtilisateur(nouveauCompte);
            } catch (err) {
                console.error(err);
                alert(err.message);
            }
        },
        validerMotDePasse() {
        this.motDePasseIdentique = this.motDePasse !== '' && this.confirmationMotDePasse !== '' && this.motDePasse === this.confirmationMotDePasse;
        return this.motDePasseIdentique;
    },
        naviguerSiValide() {
        if (this.validerMotDePasse() && this.validerBouton) {
            this.$router.push('/connexion');
        }
    },
        gererCreationCompte() {
        this.naviguerSiValide();
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