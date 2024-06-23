<template>
  <div>
    <h1>Популярные фильмы</h1>
    <ul class="movie-list">
      <li v-for="movie in popularMovies" :key="movie.filmId">
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
      } catch (error) {
        console.error('Ошибка при получении популярных фильмов:', error);
      }
    };

    const addMovie = (movie: Movie) => {
      store.dispatch('movies/addMovie', movie)
        .catch(error => {
          console.error('Ошибка при добавлении фильма в просмотренные:', error);
        });
    };

    const isWatched = (movieId: number) => {
      const watchedMovies = store.getters['movies/watchedMovies'] as Movie[];
      return watchedMovies.some(movie => movie.filmId === movieId);
    };

    onMounted(fetchPopularMovies);

    return { popularMovies, addMovie, isWatched };
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
