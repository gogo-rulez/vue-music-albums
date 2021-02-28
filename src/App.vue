<template>
    <div
        v-if="pageReady"
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

    data () {
        return {
            pageReady: false
        };
    },

    components: {
        SiteHeader
    },

    computed: {
        ...mapGetters(['storeReady'])
    },

    mounted () {
        this.getAlbums();
        this.getArtists();
        this.setPlatform();
    },

    watch: {
        storeReady (val) {
            this.pageReady = val;
        }
    },

    methods: {
        ...mapActions(['getAlbums', 'getArtists', 'setPlatform']),
    }
};
</script>

<style lang="scss">
@import "@/assets/scss/styles";
</style>
