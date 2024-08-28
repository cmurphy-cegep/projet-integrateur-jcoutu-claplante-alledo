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
                                @click="voirAjoutCommentaire = true" class="ajouter-Commentaire">Ajouter un
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
                        <div v-if="!loading" v-for="(commentaire, index) in commentaires" :key="index"
                            class="commentaire-conteneur">
                            <div class="commentaire-gauche">
                                <div class="commentaire-nom">{{ commentaire.nomComplet }}</div>
                                <div class="commentaire-date">{{ commentaire.date }}</div>
                            </div>
                            <div class="commentaire-droite">
                                <div class="commentaire-texte">{{ commentaire.texte }}</div>
                            </div>
                            <div v-if="index < commentaires.length - 1" style="margin-bottom: 1rem;"></div>
                        </div>
                    </div>
                </div>
                <div class="recette-conteneur2">
                    <div v-if="session.user && session.user.estAdmin">
                        <router-link :to="redirigerVersEdition" custom v-slot="{ navigate }"><button
                                class="bouton-editer" @click="navigate" role="link">Éditer</button></router-link>
                    </div>
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
                            <div> {{ recette.preparation }} min</div>
                        </div>
                        <div class="recette-cuisson">
                            <label for="recette-cuisson">Cuisson</label>
                            <div> {{ recette.cuisson }} min</div>
                        </div>
                        <div class="recette-portions">
                            <label for="recette-portions">Portions</label>
                            <div> {{ recette.portions }}</div>
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

        annulerEdition() {
            this.edition = false;
            this.rafraichirRecette(this.id);
        },
        async soumettreRecetteEditee() {
            try {
                await mettreAJourRecette(this.recette);
                this.edition = false;
                this.rafraichirRecette(this.id);
            } catch (err) {
                console.error(err);
                alert(err.message);
            }
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
                utilisateurId: session.user.compteUtilisateurId,
                recetteId: this.id
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
        },
        redirigerVersEdition() {
            return "/editerRecette/" + this.id;
        },
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
}

.recette-conteneur {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 60vw;
    padding: 2vw;
}

.recette-conteneur2 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 50vw;
    padding: 2vw;
}

.bouton-editer {
    margin-left: 1%;
    margin-top: 0.5%;
}

.recette-conteneur3 {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 2vh;
    border-bottom: 0.2vh solid black;
    border-top: 0.2vh solid black;
}

.image-redimensionnee {
    width: 50vw;
    height: 30vw;
    overflow: hidden;
}


.image-redimensionnee img {
    width: 100%;
    height: 100%;
    max-height: 100vw;
    object-fit: cover;
}

.recette-desc-longue {
    margin-top: 2vh;
    margin-bottom: 2vh;
    max-width: 100%;
}

.ajouter-Commentaire {
    margin-left: 1rem;
}

.commentaire-conteneur {
    display: flex;
    margin-bottom: 1rem;
    border-top: 1px solid lightgrey;
}

.commentaire-gauche {
    width: 25%;
    display: flex;
    flex-direction: column;
    margin-right: 1rem;
    padding-top: 0.5rem;
}

.commentaire-nom {
    font-weight: bold;
    flex: 1;
}

.commentaire-date {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: gray;
}

.commentaire-droite {
    padding-top: 0.5rem;
    flex: 1;
}

.recette-titre {
    font-size: 1.75vw;
    margin-top: 0;
}

.recette-titre-ingredient,
.recette-titre-preparation {
    font-size: 1.5vw;
}

.ingredient {
    margin-bottom: 1vh;
}

.etape {
    margin-bottom: 1vh;
}

.recette-preparation,
.recette-cuisson,
.recette-portions {
    flex: 1;
    box-sizing: border-box;
    padding: 2vw;
    text-align: center;
}

.recette-preparation div,
.recette-cuisson div,
.recette-portions div {
    font-weight: bold;
    margin-top: 1rem;
}

#commentaire-texte {
    resize: none;
}

.bouton-editer {
    padding: 5px;
    margin-bottom: 1vh;
}
</style>