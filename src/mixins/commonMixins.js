import axios from 'axios';

export const artistMixin = {
    methods: {
        $_getArtistName (artistId) {
            const artist = this.artistsFromStore.find(x => x.id === artistId);
            return artist.title;
        }
    }
};


export const api = axios.create({
    baseURL: 'http://localhost:3004/',
});
