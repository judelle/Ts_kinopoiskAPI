<template>
    <div>
      <h2>Просмотренные фильмы</h2>
      <ul class="movie-list">
        <li v-for="movie in watchedMovies" :key="movie.filmId">
          <img v-lazy="movie.posterUrl" alt="Poster" />
          <div>
            <p>{{ movie.nameRu }}</p>
            <button @click="removeMovie(movie.filmId)">Удалить</button>
          </div>
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
  
  <style lang="scss" scoped>
  .movie-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  
    li {
      display: flex;
      align-items: center;
      background-color: #fff;
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
      img {
        max-width: 100px;
        margin-right: 10px;
      }
  
      button {
        margin-left: auto;
      }
    }
  }
  </style>
  