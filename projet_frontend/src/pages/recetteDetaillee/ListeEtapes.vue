<template>
    <li class="etape">
        {{ description }}
    </li>
</template>

<script>
import session from '../../session';

export default {
    props: {
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