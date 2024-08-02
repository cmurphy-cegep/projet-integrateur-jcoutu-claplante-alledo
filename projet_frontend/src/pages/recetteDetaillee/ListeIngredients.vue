<template>
    <li class="ingredient">
        {{ quantite }}
        {{ uniteMesure }}
        {{ nom }}
    </li>
</template>

<script>
import session from '../../session';

export default {
    props: {
        idIngredient: Number,
        nom: String,
        quantite: Number,
        uniteMesure: String
    },
    data: function() {
        return {
            
            session: session
        };
    },
}

</script>