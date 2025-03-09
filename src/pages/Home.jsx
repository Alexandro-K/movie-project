import React from 'react'
import { useSearchContext } from '../Context/SearchContext'
import MovieCard from '../components/MovieCard';


const Home = () => {
  const {error, loading, movies} = useSearchContext();

  return (
    <div className=''>
      {error && <div className='error'>{error}</div> }
      {loading && <div className='flex justify-center items-center '>loading...</div>}
      {!loading && !error && movies.length === 0 && <div className="font-bold text-3xl flex justify-center my-8">No Movies Found</div>} 
        <div className="grid grid-cols-6 m-10 gap-6">
          {movies.map((movie) => (<MovieCard movie={movie} key={movie.id}/>))}
        </div>
    </div>
  )
}

export default Home