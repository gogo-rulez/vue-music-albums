<template>
    <header
        v-if="storeReady"
        class="header">

        <div class="header__inner_wrap">

            <h1 class="header__title">
                <template
                    v-if="$route.name === 'Artist'">
                    <router-link
                        :to="{ name: 'Home' }">
                        Album List
                    </router-link>
                    &rsaquo;
                    <span>{{ showArtistName() }}</span>
                </template>
                <template
                    v-else-if="$route.name === 'NotFound'">
                    <router-link
                        :to="{ name: 'Home' }">
                        Album List
                    </router-link>
                    &rsaquo;
                    <span>404</span>
                </template>
                <template v-else >
                    <router-link
                        v-if="Object.keys($route.query).length"
                        :to="{ name: 'Home' }">
                        Album List
                    </router-link>

                    <template v-else>Album List</template>
                </template>
            </h1>

            <a
                role="button"
                class="header__search_toggle"
                :class="{'is-active': showSearchBar}"
                @click="showSearchBar = !showSearchBar">
                <img
                    v-if="!showSearchBar"
                    src="@/assets/icons/Search.svg"
                    alt="Search">
            </a>

            <search-bar :show-search-bar="showSearchBar"/>

        </div>

    </header>
</template>

<script>
import { mapGetters } from 'vuex';
import SearchBar from '@/components/SearchBar';

export default {
    name: 'SiteHeader',

    data () {
        return {
            showSearchBar: false
        };
    },

    components: {
        SearchBar
    },

    computed: {
        ...mapGetters(['storeReady', 'artistsFromStore']),
    },

    watch: {
        $route () {
            this.showSearchBar = false;
        },
    },

    methods: {
        showArtistName () {

            if (this.$route.params.artistName) {
                return this.$route.params.artistName;
            }

            const artist = this.artistsFromStore.find(x => x.id === Number(this.$route.params.artistId));

            if (artist) return artist.title;
        }
    }

};
</script>

<style lang="scss" scoped>

</style>
