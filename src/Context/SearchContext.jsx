import React, { createContext, useContext, useEffect, useState } from 'react'
import { getPopularMovies, searchMovies } from '../services/api.js';
import { useNavigate } from 'react-router-dom';

const SearchContext = createContext();

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider = ({children}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Popular Movies
    useEffect(() => {
        const loadPopularMovies = async () => {
            try{
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            }catch(err){
                console.log(err);
                setError("Unable to load movies...");
            }finally{
                setLoading(false);
            }
        }

        loadPopularMovies();
    }, [])

    // SearchMovies
    const handleSearch = async (e) => {
        e.preventDefault();
        if(!searchQuery.trim()) return;
        if(loading) return;

        try{
            const searchResult = await searchMovies(searchQuery);
            setSearchResults(searchResult);
            navigate(`${import.meta.env.BASE_URL}searchResult`);
            setError(null);
        }catch(err){
            console.log(err);
            setError("Unable to find the movies...");
        }finally{
            setLoading(false);
            setSearchQuery("");
        }
    }

    const value = {searchQuery, setSearchQuery, movies, error, loading, handleSearch, searchResults};

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
}