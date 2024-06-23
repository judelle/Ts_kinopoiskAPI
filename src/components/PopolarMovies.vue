<template>
    <div>
      <h1>Популярные фильмы</h1>
      <ul>
        <li v-for="movie in popularMovies" :key="movie.filmId">
          <img :src="movie.posterUrl" alt="Poster" />
          {{ movie.nameRu }}
          <button @click="addMovie(movie)">Добавить в просмотренные</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { Movie } from '@/types/movie';
  import { getPopularMovies } from '@/services/movieService';
  import { useStore } from 'vuex';
  
  export default defineComponent({
    setup() {
      const popularMovies = ref<Movie[]>([]);
      const store = useStore();
  
      const fetchPopularMovies = async () => {
        try {
          popularMovies.value = await getPopularMovies();
          console.log('Популярные фильмы:', popularMovies.value);
        } catch (error) {
          console.error('Ошибка при получении популярных фильмов:', error);
        }
      };
  
      const addMovie = (movie: Movie) => {
        store.dispatch('addMovie', movie);
      };
  
      onMounted(fetchPopularMovies);
  
      return { popularMovies, addMovie };
    },
  });
  </script>
  
  <style scoped>
  img {
    max-width: 100px;
    margin-right: 10px;
  }
  </style>
  