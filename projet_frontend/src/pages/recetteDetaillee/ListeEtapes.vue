<template>
    <li class="etape">
        <div>{{ description }}</div>
        <div>{{ ordre }}</div>
    </li>
</template>

<script>
import session from '../../session';

export default {
    props: {
        id: String,
        idEtape: Number,
        description: String,
        ordre: Number
    },
    data: function() {
        return {
            session: session
        };
    },
}

</script>