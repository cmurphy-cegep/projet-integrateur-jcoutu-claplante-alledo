<template>
    <li class="etape">
        <div>{{ uniteMesure }}</div>
        <div>{{ nom }}</div>
    </li>
</template>

<script>
import session from '../../session';

export default {
    props: {
        id: Number,
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