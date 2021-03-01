import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Artist from '../views/Artist.vue';
import NotFound from '../views/NotFound.vue';
import Store from '../store';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/artist/:artistId',
        name: 'Artist',
        component: Artist,
        beforeEnter: (to, from, next) => {

            if (Store.getters.artistsFromStore.length) {
                console.log('evo me');
                next();
                return;
            }

            const { artistId } = to.params;

            Store.dispatch('getArtists').then(() => {

                const artists = Store.getters.artistsFromStore;
                const artist = artists.find(x => x.id === Number(artistId));

                if (artist) {
                    next();
                    return;
                }

                next({ name: 'NotFound' });


            });
        }
    },
    {
        path: '*',
        name: 'NotFound',
        component: NotFound,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
