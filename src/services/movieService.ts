import axios from 'axios';
import { Movie } from '@/types/movie';

const API_KEY = '3a23d9d9-8027-4984-af19-0554507fcb67';
const BASE_URL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films';

export async function getMovies(query: string): Promise<Movie[]> {
    try {
        const response = await axios.get(`${BASE_URL}?keyword=${query}`, {
            headers: {
                'X-API-KEY': API_KEY,
            },
        });
        // eslint-disable-next-line
        const movies = response.data.items.map((item: any) => ({
            filmId: item.kinopoiskId,
            nameRu: item.nameRu,
            posterUrl: item.posterUrl,
            //   Сюда можно будет в бущуем добавить еще пункты
        }));

        return movies;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error response:', error.response);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
}

export async function getPopularMovies(): Promise<Movie[]> {
    try {
        const response = await axios.get(`${BASE_URL}/top?type=TOP_100_POPULAR_FILMS&page=1`, {
            headers: {
                'X-API-KEY': API_KEY,
            },
        });
        // eslint-disable-next-line
        const movies = response.data.films.map((item: any) => ({
            filmId: item.filmId,
            nameRu: item.nameRu,
            posterUrl: item.posterUrl,
            //   Сюда можно будет в бущуем добавить еще пункты
        }));

        return movies;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error response:', error.response);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
}
