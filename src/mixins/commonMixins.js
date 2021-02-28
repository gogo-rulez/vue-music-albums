export const artistMixin = {
    methods: {
        $_getArtistName (artistId) {
            const artist = this.artistsFromStore.find(x => x.id === artistId);
            return artist.title;
        }
    }
};
