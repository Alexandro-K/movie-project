 import { Children, createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedMovie, setSelectedMovie] = useState(null);

    // Fetching Favorites
    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
        setIsLoading(false);
    }, [])

    // Saving Favorite
    useEffect(() => {
        if(!isLoading){
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }, [favorites])

    // Adding To Favorite
    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie]);
    }

    // Removing From Favorite
    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId));
    }

    // Check If Movie Is In Favorite
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    }

    const value = {addToFavorites, removeFromFavorites, isFavorite, favorites, isLoading, selectedMovie, setSelectedMovie};

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}
