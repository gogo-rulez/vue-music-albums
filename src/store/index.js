import Vue from 'vue';
import Vuex from 'vuex';
import { api } from '@/mixins/commonMixins';

Vue.use(Vuex);



export default new Vuex.Store({
    state: {
        albums: [],
        artists: [],
        platform: '',
        albumsLoaded: false,
        artistsLoaded: false,
        noAlbumData: true,
    },
    getters: {
        albumsFromStore: state => state.albums,
        artistsFromStore: state => state.artists,
        storeReady: state => state.albumsLoaded && state.artistsLoaded,
        noAlbumData: state => state.noAlbumData
    },
    mutations: {
        SET_ALBUMS (state, data) {
            if (!data.length) {
                state.noAlbumData = true;
                return;
            }
            state.noAlbumData = false;
            state.albums = data;
            state.albumsLoaded = true;
        },

        SET_ARTISTS (state, data) {
            state.artists = data;
            state.artistsLoaded = true;
        },

        SET_PLATFORM (state, data) {
            state.platform = data;
        }
    },
    actions: {
        async getArtists ({ commit }) {
            const apiUrl = 'artists';

            await api.get(apiUrl)
                .then(val => {
                    commit('SET_ARTISTS', val.data);
                })
                .catch(error => {
                    console.log(error);
                });

        },

        getAlbums ({ commit }) {
            let query = document.location.search;
            query = query.replace('limit', '_limit');
            const apiUrl = `albums/${query}`;

            api.get(apiUrl)
                .then(val => {
                    commit('SET_ALBUMS', val.data);
                })
                .catch(error => {
                    console.log(error);
                });

        }
    },
    modules: {
    },
});
