<template>
    <li class="ingredient">
        <div>{{ quantite }}</div>
        <div>{{ uniteMesure }}</div>
        <div>{{ nom }}</div>
    </li>
</template>

<script>
import session from '../../session';

export default {
    props: {
        id: String,
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