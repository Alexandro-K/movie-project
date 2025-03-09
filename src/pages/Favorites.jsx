import React from 'react'
import { useMovieContext } from '../Context/MovieContext'
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const { favorites } = useMovieContext();

  if(favorites){
    return (
      <div className="">
        <h1 className='flex justify-center font-bold text-3xl my-4'>Your Favorites</h1>
        <div className="grid grid-cols-6 m-10 gap-6">
          {favorites.map((favorite) => (<MovieCard movie={favorite} key={favorite.id}/>))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>No Favorite Movies yet</h2>
      <p>Start adding your favorite movies and They will appear here!</p>    
    </div>
  )
}

export default Favorites