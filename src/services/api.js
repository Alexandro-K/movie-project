const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
}

export const getTopRatedMovies = async () => {
    const response = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}

export const getMovieByGenre = async (genreID) => {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreID}`);
    const data = await response.json();
    return data.results;
}