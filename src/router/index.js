import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Artist from '../views/Artist.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/artist/:id',
        name: 'Artist',
        component: Artist,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
