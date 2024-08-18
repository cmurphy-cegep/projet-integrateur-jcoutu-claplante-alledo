<template>
    <div class="commentaire">
        {{ nomComplet }}
        {{ date }}
        {{ texte }}
    </div>
</template>

<script>
import session from '../../session';

export default {
    props: {
        idCommentaire: Number,
        texte: String,
        date: String,
        utilisateurId: String,
        recetteId: String,
        nomComplet: String
    },
    data: function() {
        return {
            session: session
        };
    },
}

</script>