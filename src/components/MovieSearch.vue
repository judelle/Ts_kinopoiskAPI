<template>
    <div>
      <input v-model="query" @input="searchMovies" placeholder="Поиск фильма" />
      <ul class="movie-list">
        <li v-for="movie in movies" :key="movie.filmId">
          <img v-lazy="movie.posterUrl" alt="Poster" />
          <div>
            <p>{{ movie.nameRu }}</p>
            <button @click="addMovie(movie)">Добавить в просмотренные</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Movie } from '@/types/movie'; // Импорт интерфейса Movie
  import { getMovies } from '@/services/movieService'; // Импортируем сервис Кинопоиск
  import { useStore } from 'vuex';
  
  export default defineComponent({
    setup() {
      const query = ref('');
      const movies = ref<Movie[]>([]); // Указываем тип Movie для массива movies
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
  