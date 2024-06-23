import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'PopularMovies',
    component: () => import('@/components/PopolarMovies.vue')
  },
  {
    path: '/search',
    name: 'MovieSearch',
    component: () => import('@/components/MovieSearch.vue')
  },
  {
    path: '/watched',
    name: 'WatchedList',
    component: () => import('@/components/WatchedList.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
