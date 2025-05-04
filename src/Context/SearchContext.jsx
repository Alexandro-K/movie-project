import React, { createContext, useContext, useEffect, useState } from 'react'
import { getPopularMovies, getMovieByGenre, searchMovies } from '../services/api.js';
import { useNavigate } from 'react-router-dom';

const SearchContext = createContext();

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider = ({children}) => {
    // Search
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchActive, setSearchActive] = useState(false);
    const navigate = useNavigate();
    
    // Mengambil Film berdasarkan ID
    const genreMap = {
        Action: 28,
        Comedy: 35,
        Thriller: 53,
        Mystery: 9648,
        Horror: 27,
    }
    const [moviesByGenre, setMoviesByGenre] = useState({});
    const [popularMovies, setPopularMovies] = useState([]);
    // loading & error
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // Popular Movies
    useEffect(() => {
        const loadMovieByGenre = async () => {
            try{
                const results = {};
                const fetchPopularMovies = await getPopularMovies();

                // Object entries mengubah object menjadi array berpasangan 
                for(const [genreName, genreId] of Object.entries(genreMap)){
                    const movies = await getMovieByGenre(genreId);
                    // contoh hasil results["Action"] = [array of movies];
                    results[genreName] = movies
                }
                setPopularMovies(fetchPopularMovies);
                setMoviesByGenre(results);
            }catch(err){
                console.log(err);
                setError("Unable to load movies...");
            }finally{
                setLoading(false);
            }
        }

        loadMovieByGenre();
    }, [])

    // SearchMovies
    const handleSearch = async (e) => {
        e.preventDefault();
        if(!searchQuery.trim()) return;
        if(loading) return;

        try{
            const searchResult = await searchMovies(searchQuery);
            setSearchResults(searchResult);
            navigate(`/searchResult`);
            setError(null);
            setSearchActive(false);
        }catch(err){
            console.log(err);
            setError("Unable to find the movies...");
        }finally{
            setLoading(false);
            setSearchQuery("");
        }
    }

    const value = {searchQuery, setSearchQuery, popularMovies, moviesByGenre, error, loading, handleSearch, searchResults, searchActive, setSearchActive};

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
}