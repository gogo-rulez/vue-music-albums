<template>
    <div
        v-if="pageReady"
        class="page home">

        <ul class="album__list">
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
        ...mapGetters(['albumsFromStore', 'artistsFromStore', 'storeReady'])
    },

    watch: {
        storeReady (val) {
            this.pageReady = val;
        },

        $route () {
            // route will change when coming from '/' with query params to just '/' without query params
            this.getAlbums();
        }
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
