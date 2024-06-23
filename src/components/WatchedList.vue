<template>
    <div>
      <h2>Просмотренные фильмы</h2>
      <ul>
        <li v-for="movie in watchedMovies" :key="movie.filmId">
          <img :src="movie.posterUrl" alt="Poster" />
          {{ movie.nameRu }}
          <button @click="removeMovie(movie.filmId)">Удалить</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { Movie } from '@/types/movie';
  import { useStore } from 'vuex';
  
  export default defineComponent({
    setup() {
      const store = useStore();
      const watchedMovies = store.getters.watchedMovies as Movie[];
  
      const removeMovie = (movieId: number) => {
        store.dispatch('removeMovie', movieId);
      };
  
      return { watchedMovies, removeMovie };
    },
  });
  </script>
  
  <style scoped>
  img {
    max-width: 100px;
    margin-right: 10px;
  }
  </style>
  