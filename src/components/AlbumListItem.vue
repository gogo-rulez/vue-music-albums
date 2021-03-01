<template>
    <div class="album">

        <figure class="album__figure">
            <img
                :src="albumData.imageUrl"
                :alt="albumData.title">

            <img
                v-if="isFavorite"
                class="album__favorite_mark"
                src="@/assets/icons/Star.svg"
                alt="Favorite">
        </figure>

        <div class="album__info">
            <div class="album__name_wrap">
                <p class="album__name">{{ albumData.title }}</p>
                <router-link
                    :to="{ name: 'Artist', params: { artistId: albumData.artistId, artistName } }"
                    class="album__artist">
                    {{ artistName }}
                </router-link>
            </div>

            <p class="album__release_year">
                Released: <span>{{ new Date(albumData.releaseDate).getFullYear() }}</span>
            </p>

            <p class="album__price">{{ albumData.price }}</p>
        </div>

        <span
            role="button"
            class="btn is-turquoise"
            :class="{'is-active': isFavorite}"
            @click="markAsFavorite()">
            {{ isFavorite ? 'Remove favorite' : 'Mark as favorite' }}
        </span>


    </div>
</template>

<script>

export default {
    name: 'AlbumListItem',

    data () {
        return {
            isFavorite: false
        };
    },

    props: {
        albumData: Object,
        artistName: String
    },

    mounted () {
        const localStorageItem = JSON.parse(localStorage.getItem('userFavorites'));
        if (!localStorageItem) return;
        this.isFavorite = localStorageItem.find(x => x === this.albumData.id);
    },

    methods: {
        markAsFavorite () {

            this.isFavorite = !this.isFavorite;

            const localStorageItem = JSON.parse(localStorage.getItem('userFavorites'));
            const currentFavorites = localStorageItem || [];

            if (currentFavorites.includes(this.albumData.id)) {
                const idIndex = currentFavorites.findIndex(x => x === this.albumData.id);
                currentFavorites.splice(idIndex, 1);
            } else {
                currentFavorites.push(this.albumData.id);
            }

            localStorage.setItem('userFavorites', JSON.stringify(currentFavorites));

        },

        albumIsFavorite () {



        }
    }
};
</script>

<style lang="scss" scoped>

</style>
