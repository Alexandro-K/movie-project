import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useMovieContext } from '../Context/MovieContext';
import { useLocation } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const { isFavorite, addToFavorites, removeFromFavorites, setSelectedMovie } = useMovieContext();
  const favorite = isFavorite(movie.id);
  const location = useLocation();
  const TopRatedPage = location.pathname === "/topRated";
  const navigate = useNavigate();

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  function handleDetailClick(e){
    e.stopPropagation();
    setSelectedMovie(movie);
    // Mengarahkan pengguna ke movie yang sesuai
    navigate(`/movie/${movie.id}`)
  }

  return (
      <div className='text-white border-slate-600 border-2 rounded-xl overflow-hidden relative' >

        {/* Poster */}
        <div className="overflow-hidden">
          <img className='w-full h-auto object-cover hover:scale-115 hover:object-cover transition-transform duration-300' onClick={handleDetailClick} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>

        {/* Favorite Button */}
        <div className="">
          <button className="absolute top-2 right-2 flex items-center justify-center w-9 h-9 p-0 rounded-full border border-slate-400  hover:border-slate-600 bg-blue-100/30 hover:bg-red-500/30 transition-all duration-300" onClick={(e) => {e.preventDefault(); onFavoriteClick(e); }}>
            {/* Emoji */}
            <span className="relative text-lg z-10">{favorite ? '❤️' : '🤍'}</span>
          </button>

        </div>
        {/* Movie Title & Release Date */}
        <div className="flex flex-col justify-between m-2 text-slate-700 bg-slate">
          <h3 className='font-semibold tracking-wide'>{movie.title.length > 20 ? movie.title.slice(0,15) + '....' : movie.title}</h3>
          <p>{movie.release_date?.split("-")[0]}</p>
          {/* <button 
            onClick={handleMoreClick}
            className="self-end mt-2 px-4 py-2 bg-blue-800 text-white rounded opacity-100 hover:opacity-80 transition-all duration-300"
          >
            More &gt;
          </button> */}
        </div>
      </div>
  )
}

export default MovieCard