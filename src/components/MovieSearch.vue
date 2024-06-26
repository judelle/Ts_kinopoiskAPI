<template>
  <div>
    <form @submit.prevent="searchMovies">
    <input v-model="query" placeholder="Поиск фильма" />
    <button type="submit">Искать</button>
  </form>
    <ul class="movie-list">
      <li v-for="movie in movies" :key="movie.filmId">
        <img v-lazy="movie.posterUrl" alt="Poster" />
        <div>
          <p :class="{ 'watched-movie': isWatched(movie.filmId) }">{{ movie.nameRu }}</p>
          <button @click="addMovie(movie)">Добавить в просмотренные</button>
        </div>
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
      store.dispatch('movies/addMovie', movie);
    };

    const isWatched = (movieId: number) => {
      const watchedMovies = store.getters['movies/watchedMovies'] as Movie[];
      return watchedMovies.some(movie => movie.filmId === movieId);
    };

    return { query, movies, searchMovies, addMovie, isWatched };
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

    .watched-movie {
      color: #43d117;
      font-weight: bold;
    }
  }
}
</style>