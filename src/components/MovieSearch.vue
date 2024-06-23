<template>
    <div>
      <input v-model="query" @input="searchMovies" placeholder="Поиск фильма" />
      <ul>
        <li v-for="movie in movies" :key="movie.filmId">
          <img :src="movie.posterUrl" alt="Poster" />
          {{ movie.nameRu }}
          <button @click="addMovie(movie)">Добавить в просмотренные</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Movie } from '@/types/movie';
  import { getMovies } from '@/services/movieService';
  import { useStore } from 'vuex';
  
  export default defineComponent({
    setup() {
      const query = ref('');
      const movies = ref<Movie[]>([]);
      const store = useStore();
  
      const searchMovies = async () => {
        if (query.value) {
          movies.value = await getMovies(query.value);
        }
      };
  
      const addMovie = (movie: Movie) => {
        store.dispatch('addMovie', movie);
      };
  
      return { query, movies, searchMovies, addMovie };
    },
  });
  </script>
  
  <style scoped>

  img {
    max-width: 100px;
    margin-right: 10px;
  }
  </style>
  