import React from 'react'
import { useMovieContext } from '../Context/MovieContext';
import { useLocation } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);
  const location = useLocation();
  const TopRatedPage = location.pathname === "/topRated";

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
      <div className='border border-slate-600 rounded-xl overflow-hidden relative'>
        {/* Poster */}
        <div className="">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>
        {/* Favorite Button */}
        <div className="">
          <button className="absolute top-2 right-2 flex items-center justify-center w-9 h-9 p-0 rounded-full border border-slate-400  hover:border-slate-600 bg-blue-100/30 hover:bg-red-500/30"onClick={onFavoriteClick}>
          {/* Emoji */}
          <span className="relative text-lg z-10">{favorite ? '❤️' : '🤍'}</span>
</button>

        </div>
        {/* Movie Title & Release Date */}
        <div className="m-2">
          <h3 className='font-semibold tracking-wide'>{TopRatedPage ? movie.name : movie.title}</h3>
    
        </div>
      </div>
  )
}

export default MovieCard