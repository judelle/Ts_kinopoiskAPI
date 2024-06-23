import { Module } from 'vuex';
import { Movie } from '@/types/movie';

interface MoviesState {
    watchedMovies: Movie[];
}

const state: MoviesState = {
    watchedMovies: [],
};
// eslint-disable-next-line
const moviesModule: Module<MoviesState, any> = {
    namespaced: true,
    state,
    getters: {
        watchedMovies: (state) => state.watchedMovies,
    },
    mutations: {
        SET_WATCHED_MOVIES(state, movies: Movie[]) {
            state.watchedMovies = movies;
        },
        ADD_MOVIE(state, movie: Movie) {
            state.watchedMovies.push(movie);
        },
        REMOVE_MOVIE(state, movieId: number) {
            state.watchedMovies = state.watchedMovies.filter(movie => movie.filmId !== movieId);
        },
    },
    actions: {
        async fetchWatchedMovies({ commit }) {
            const movies: Movie[] = [];
            commit('SET_WATCHED_MOVIES', movies);
        },
        addMovie({ commit }, movie: Movie) {
            commit('ADD_MOVIE', movie);
        },
        removeMovie({ commit }, movieId: number) {
            commit('REMOVE_MOVIE', movieId);
        },
    },
};

export default moviesModule;
