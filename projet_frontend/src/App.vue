<template>
    <EnteteNavigation />
    <router-view></router-view>
</template>

<script>
import { computed } from 'vue';

import EnteteNavigation from './components/EnteteNavigation.vue';

export default {
    components: {
        EnteteNavigation
    }
}
</script>

<style>
* {
    box-sizing: border-box;
}

html {
    font-family: sans-serif;
}
</style>