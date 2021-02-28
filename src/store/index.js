import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        albums: [],
        artists: [],
        platform: '',
        storeReady: false
    },
    getters: {
        albumsFromStore: state => state.albums,
        artistsFromStore: state => state.artists,
        storeReady: state => state.storeReady,
        isDesk: state => state.platform === 'desk',
        isMob: state => state.platform === 'mob',
    },
    mutations: {
        SET_ALBUMS (state, data) {
            state.albums = [...data];
            state.storeReady = Boolean(state.artists.length && state.albums.length);
        },

        SET_ARTISTS (state, data) {
            state.artists = [...data];
            state.storeReady = Boolean(state.artists.length && state.albums.length);
        },

        SET_PLATFORM (state, data) {
            state.platform = data;
        }
    },
    actions: {
        getArtists ({ commit }) {
            const apiUrl = 'http://localhost:3004/artists/';

            fetch(apiUrl, {
                method: 'GET',
            })
                .then(val => val.json())
                .then(val => {
                    const artists = [...val];
                    commit('SET_ARTISTS', artists);
                });

        },

        getAlbums ({ commit }) {
            const query = document.location.search;
            query.replace('limit', '_limit');
            const apiUrl = `http://localhost:3004/albums/${query}`;

            fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(val => val.json())
                .then(val => {
                    const albums = [...val];
                    commit('SET_ALBUMS', albums);
                });

        },

        setPlatform ({ commit }) {
            const platform = window.innerWidth < 1024 ? 'mob' : 'desk';
            commit('SET_PLATFORM', platform);
        }
    },
    modules: {
    },
});
