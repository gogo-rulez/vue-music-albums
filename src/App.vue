<template>
    <div
        id="app">
        <site-header/>
        <router-view/>
    </div>
</template>

<script>
import SiteHeader from '@/components/SiteHeader';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'App',

    components: {
        SiteHeader
    },

    computed: {
        ...mapGetters(['storeReady'])
    },

    mounted () {
        this.getAlbums();
        this.getArtists();
    },

    watch: {
        $route () {
            // watch for route change because if the $route.query changes, we have to reload the albums
            this.getAlbums();
        }
    },

    methods: {
        ...mapActions(['getAlbums', 'getArtists']),
    }
};
</script>

<style lang="scss">
@import "@/assets/scss/styles";
</style>
