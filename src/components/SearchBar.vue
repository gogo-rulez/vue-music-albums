<template>
    <div
        class="search__wrap"
        :class="{'is-hidden-on-mobile': !showSearchBar}">

        <input
            v-model="searchValue"
            type="text"
            placeholder="Search"
            class="search__input">

        <a
            role="button"
            class="search__btn"
            @click="triggerSearch()">
            <img
                src="@/assets/icons/Search.svg"
                alt="Search">
        </a>

        <ul
            v-if="suggestions.length"
            class="search__result_list">

            <li
                v-for="item in suggestions"
                :key="item.id"
                class="search__result">
                <figure class="search__result_figure">
                    <img
                        :src="item.imageUrl"
                        :alt="item.title">
                </figure>
                <div class="search__result_info_wrap">
                    <p class="search__result_title">
                        {{ item.title }}
                    </p>
                    <router-link
                        :to="{ name: 'Artist', params: {artistId: item.artistId} }"
                        class="search__result_artist">
                        {{ itemArtist(item.artistId) }}
                    </router-link>
                </div>
            </li>

        </ul>

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'SearchBar',

    data () {
        return {
            searchValue: '',
            timeoutController: undefined,
            suggestions: []
        };
    },

    props: {
        showSearchBar: Boolean
    },

    computed: {
        ...mapGetters(['artistsFromStore'])
    },

    watch: {

        searchValue (val) {

            clearTimeout(this.timeoutController);

            if (val.length < 2) return;

            this.timeoutController = setTimeout(() => {

                this.showSuggestions();

            }, 500);

        },

        $route () {
            this.searchValue = '';
            this.suggestions = [];
        },
    },


    methods: {

        ...mapActions(['getAlbums']),

        showSuggestions () {

            const apiUrl = `http://localhost:3004/albums/?q=${this.searchValue}&_limit=5`;

            fetch(apiUrl, {
                method: 'GET',
            })
                .then(val => val.json())
                .then(val => {
                    this.suggestions = [...val];
                });

        },

        itemArtist (artistId) {
            return this.artistsFromStore.find(x => x.id === Number(artistId)).title;
        },

        triggerSearch () {
            if (!this.searchValue) return;
            this.$router.push({ name: 'Home', query: { q: this.searchValue } });
            this.getAlbums();
        }

    }
};
</script>

<style lang="scss" scoped>

</style>
