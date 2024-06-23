import { createRouter, createWebHistory } from 'vue-router';
import MovieSearch from '@/components/MovieSearch.vue';
import WatchedList from '@/components/WatchedList.vue';
import PopularMovies from '@/components/PopolarMovies.vue';

const routes = [
  {
    path: '/',
    name: 'PopularMovies',
    component: PopularMovies
  },
  {
    path: '/search',
    name: 'MovieSearch',
    component: MovieSearch
  },
  {
    path: '/watched',
    name: 'WatchedList',
    component: WatchedList
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
