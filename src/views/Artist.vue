<template>
    <div
        v-if="pageReady"
        class="page artist">

        <ul class="album__list">
            <album-list-item
                v-for="album in artistAlbums"
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
import { mapGetters } from 'vuex';
import { artistMixin, api } from '@/mixins/commonMixins';

export default {
    name: 'Artist',

    data () {
        return {
            artistAlbums: [],
            pageReady: false
        };
    },

    mixins: [artistMixin],

    components: {
        AlbumListItem
    },

    computed: {
        ...mapGetters(['artistsFromStore'])
    },

    mounted () {
        this.getArtistAlbums();
    },

    watch: {
        $route () {
            // route can change through search or through direct change in address bar
            this.getArtistAlbums();
        }
    },

    methods: {

        getArtistAlbums () {

            const apiUrl = `albums/?artistId=${this.$route.params.artistId}`;

            api.get(apiUrl)
                .then(val => {
                    this.artistAlbums = val.data;
                    this.pageReady = true;
                })
                .catch(error => {
                    console.log(error);
                });

        },

    }
};
</script>
