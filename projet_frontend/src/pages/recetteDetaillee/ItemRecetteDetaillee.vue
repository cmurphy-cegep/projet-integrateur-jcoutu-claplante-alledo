<template>
    <LoadingSpinner :loading="loading" :error="loadError" :errorMessage="errorMessage" />
    <div v-if="recette && ingredients && etapes" class="recette">
        <div class="recette-detaillee" v-if="!edition">
            <div class="recette-conteneur-principal">
                <div class="recette-conteneur">
                    <div class="image-redimensionnee ">
                        <img v-bind:src="imageSrc" />
                    </div>
                    <div class="recette-desc-longue" v-html="recette.desc"></div>
                    <div class="recette-conteneur4">
                        <h3>Commentaires <button type="button" v-if="session.user && !voirAjoutCommentaire"
                                @click="voirAjoutCommentaire = true">Ajouter un
                                commentaire</button></h3>

                        <div v-if=voirAjoutCommentaire>
                            <form @submit.prevent="soumettreCommentaire">
                                <div>
                                    <label for="commentaire-texte">Veuillez saisir votre commentaire : </label>
                                </div>
                                <div>
                                    <textarea id="commentaire-texte" v-model="ajoutCommentaireTexte" maxlength="700"
                                        rows="7" cols="100"> </textarea>
                                </div>
                                <button type="submit">Soumettre le commentaire</button>
                                <button type="button" @click="annulerAjoutCommentaire">Annuler</button>
                            </form>
                        </div>
                        <ListeCommentaires v-if="!loading" v-for="commentaire in commentaires"
                            :id="commentaire.idCommentaire" :texte="commentaire.texte" :date="commentaire.date"
                            :utilisateurId="commentaire.utilisateurId" :recetteId="commentaire.recetteId"
                            :nomComplet="commentaire.nomComplet" />
                    </div>
                </div>
                <div class="recette-conteneur2">
                    <h2 class="recette-titre">
                        {{ recette.nom }}
                        <div v-if="appreciation">{{ appreciation }}/5 <span
                                style="font-size:150%;color:yellow;">&#9733;</span>
                        </div>
                    </h2>
                    <form @submit.prevent="soumettreAppreciation" v-if="session.user">
                        <p>
                        <p>Votre avis:</p>

                        <select v-model="selected">
                            <option value="1"><span style="font-size:150%;color:yellow;">&#9733;</span></option>
                            <option value="2"><span style="font-size:150%;color:yellow;">&#9733;</span><span
                                    style="font-size:150%;color:yellow;">&#9733;</span></option>
                            <option value="3"><span style="font-size:150%;color:yellow;">&#9733;</span><span
                                    style="font-size:150%;color:yellow;">&#9733;</span><span
                                    style="font-size:150%;color:yellow;">&#9733;</span></option>
                            <option value="4"><span style="font-size:150%;color:yellow;">&#9733;</span><span
                                    style="font-size:150%;color:yellow;">&#9733;</span><span
                                    style="font-size:150%;color:yellow;">&#9733;</span><span
                                    style="font-size:150%;color:yellow;">&#9733;</span></option>
                            <option value="5"><span style="font-size:150%;color:yellow;">&#9733;</span><span
                                    style="font-size:150%;color:yellow;">&#9733;</span><span
                                    style="font-size:150%;color:yellow;">&#9733;</span><span
                                    style="font-size:150%;color:yellow;">&#9733;</span><span
                                    style="font-size:150%;color:yellow;">&#9733;</span></option>
                        </select>
                        </p>
                        <button type="submit">Soumettre</button>
                    </form>


                    <div class="recette-conteneur3">
                        <div class="recette-preparation">
                            <label for="recette-preparation">Préparation</label>
                            {{ recette.preparation }}
                        </div>
                        <div class="recette-cuisson">
                            <label for="recette-cuisson">Cuisson</label>
                            {{ recette.cuisson }}
                        </div>
                        <div class="recette-portions">
                            <label for="recette-portions">Portions</label>
                            {{ recette.portions }}
                        </div>
                    </div>
                    <h3 class="ingredient"> Ingrédients</h3>
                    <ul class="recette-ingredients">
                        <ListeIngredients v-if="!loading" v-for="ingredient in ingredients"
                            :id="ingredient.idIngredient" :nom="ingredient.nom" :quantite="ingredient.quantite"
                            :uniteMesure="ingredient.uniteMesure" />
                    </ul>
                    <h3 class="etape"> Étapes</h3>
                    <ol class="recette-etapes">
                        <ListeEtapes v-if="!loading" v-for="etape in etapes" :id="etape.idEtape"
                            :description="etape.description" :ordre="etape.ordre" />
                    </ol>
                </div>

            </div>

        </div>
        <button type="button" v-if="session.user && session.user.estAdmin" @click="enableEdit">Éditer</button>
        <!-- Ajouter l'affichage d'édition de la recette -->
    </div>
</template>

<script>
import ListeEtapes from './ListeEtapes.vue';
import ListeIngredients from './ListeIngredients.vue';
import ListeCommentaires from './ListeCommentaires.vue';
import { fetchRecette, fetchIngredients, fetchEtapes, fetchCommentaires, ajouterCommentaire, fetchAppreciations, ajouterAppreciation } from '../../RecetteService';
import LoadingSpinner from '../../components/LoadingSpinner.vue';
import session from '../../session';

export default {
    components: {
        LoadingSpinner,
        ListeIngredients,
        ListeEtapes,
        ListeCommentaires
    },
    props: {
        id: String
    },
    data() {
        return {
            recette: null,
            ingredients: [],
            etapes: [],
            commentaires: [],
            appreciation: null,
            nouvelleAppreciation: [],
            session: session,
            loading: true,
            loadError: false,
            errorMessage: null,
            edition: false,
            voirAjoutCommentaire: false,
            ajoutCommentaireTexte: '',
            selected: "3"
        };
    },
    methods: {
        rafraichirRecette(id) {
            this.loadError = false;
            this.loading = true;
            this.errorMessage = null;
            this.recette = null;

            fetchRecette(id).then(recette => {
                this.recette = recette;
                this.loading = false;
            }).catch(err => {
                this.recette = null;
                this.loadError = true;
                this.loading = false;
                this.errorMessage = err.message;
            });

            fetchIngredients(id).then(ingredients => {
                this.ingredients = ingredients;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.loadError = true;
                this.errorMessage = err.message;
            });

            fetchEtapes(id).then(etapes => {
                this.etapes = etapes;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.loadError = true;
                this.errorMessage = err.message;
            });

            fetchCommentaires(id).then(commentaires => {
                this.commentaires = commentaires;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.loadError = true;
                this.errorMessage = err.message;
            });

            fetchAppreciations(id).then(appreciation => {
                this.appreciation = appreciation % 1 === 0 ? Number(appreciation) : appreciation;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.loadError = true;
                this.errorMessage = err.message;
            });
        },

        async soumettreCommentaire() {
            const nouveauCommentaire = {
                texte: this.ajoutCommentaireTexte,
                utilisateurId: session.user.compteUtilisateurId,
                recetteId: this.id
            };

            try {
                await ajouterCommentaire(nouveauCommentaire);
                this.voirAjoutCommentaire = false;
                this.rafraichirRecette(this.id);
            } catch (err) {
                console.error(err);
                alert(err.message);
            }
        },

        async annulerAjoutCommentaire() {
            this.voirAjoutCommentaire = false;
            this.rafraichirRecette(this.id);
        },

        async soumettreAppreciation() {
            const nouvelleAppreciation = {
                etoiles: parseInt(this.selected),
                utilisateur_id: session.user.compteUtilisateurId,
                recette_id: this.id
            };
            try {
                await ajouterAppreciation(nouvelleAppreciation);
                this.rafraichirRecette(this.id);
            } catch (err) {
                console.error(err);
                alert(err.message);
            }
        }
    },

    computed: {
        imageSrc() {
            return `data:image/png;base64,${this.recette.image}`;
        }
    },
    watch: {
        id(nouvelId) {
            this.rafraichirRecette(nouvelId);
        }
    },
    mounted() {
        this.rafraichirRecette(this.id);
    }
}
</script>
<style scoped>
.recette-conteneur-principal {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    height: 100vh;
    /* Utilisez la hauteur de la fenêtre */
}

.recette-conteneur {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 45vw;
    /* Utilisez des unités relatives pour la largeur */
    padding: 2vw;
    /* Utilisez des unités relatives pour le padding */
}

.recette-conteneur2 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 50vw;
    /* Utilisez des unités relatives pour la largeur */
    padding: 2vw;
    /* Utilisez des unités relatives pour le padding */
}

.recette-conteneur3 {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 2vh;
    /* Utilisez des unités relatives pour la marge */
    border-bottom: 0.2vh solid black;
    /* Utilisez des unités relatives pour la bordure */
    border-top: 0.2vh solid black;
    /* Utilisez des unités relatives pour la bordure */
}

.image-redimensionnee {
    max-width: 100%;
    height: auto;
    flex: 0 0 auto;
    /* Utilisez des unités relatives pour la marge */
}

.image-redimensionnee img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
}

.recette-desc-longue {
    margin-top: 2vh;
    /* Utilisez des unités relatives pour la marge */
    margin-bottom: 2vh;
    /* Utilisez des unités relatives pour la marge */
    max-width: 100%;
}

.recette-desc-longue br {
    margin-bottom: 1em !important;
    /* Ajustez cette valeur selon l'espace souhaité */
    display: block !important;
    /* Assurez-vous que le br est traité comme un élément de bloc */
}

.recette-titre {
    font-size: 1.75vw;
    /* Utilisez des unités relatives pour la taille de la police */
    margin-top: 0;
}

.recette-titre-ingredient,
.recette-titre-preparation {
    font-size: 1.5vw;
    /* Utilisez des unités relatives pour la taille de la police */
}

.ingredient {
    margin-bottom: 1vh;
    /* Utilisez des unités relatives pour la marge */
}

.etape {
    margin-bottom: 1vh;
    /* Utilisez des unités relatives pour la marge */
}

.recette-preparation,
.recette-cuisson,
.recette-portions {
    flex: 1;
    box-sizing: border-box;
    padding: 2vw;
    /* Utilisez des unités relatives pour le padding */
}

#commentaire-texte {
    resize: none;
}
</style>