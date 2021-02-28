<template>
    <div
        class="page home">

        <h3
            v-if="$route.query.q && noAlbumData"
            class="page__title">
            There are no results for the term "{{ $route.query.q }}"
        </h3>

        <ul
            v-else-if="storeReady"
            class="album__list">
            <album-list-item
                v-for="album in albumsFromStore"
                :key="album.id"
                :album-data="album"
                :artist-name="$_getArtistName(album.artistId)"
            />
        </ul>

    </div>
</template>

<script>
// @ is an alias to /src
import AlbumListItem from '@/components/AlbumListItem';
import { mapGetters, mapActions } from 'vuex';
import { artistMixin } from '@/mixins/commonMixins';

export default {
    name: 'Home',

    data () {
        return {
            albums: [],
            pageReady: false
        };
    },

    mixins: [artistMixin],

    components: {
        AlbumListItem
    },

    computed: {
        ...mapGetters(['albumsFromStore', 'artistsFromStore', 'storeReady', 'noAlbumData'])
    },

    mounted () {
        if (!this.storeReady) return;
        this.pageReady = true;
    },

    methods: {
        ...mapActions(['getAlbums']),
    }
};
</script>
