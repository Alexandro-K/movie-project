import React, { useEffect, useState } from 'react'
import { useSearchContext } from '../Context/SearchContext';
import { getTopRatedMovies } from '../services/api';
import MovieCard from '../components/MovieCard';

const TopRated = () => {
  const {loading, error, setError, setLoading} = useSearchContext();
  const [topRated, setTopRated] = useState([]);

  // Load Top Rated Movies
  useEffect(() => {
    const loadTopRatedMovies = async () => {
      try{
        let TopRatedMovies = await getTopRatedMovies();

        TopRatedMovies = TopRatedMovies.map(movie => ({
          ...movie,
          title: movie.name, // Copy "name" ke "title"
        }));
        
        setTopRated(TopRatedMovies)
      }catch (err){
        console.log(err);
        setError("Failed to load Top Rated Movies...")
      }finally{
        setLoading(false)
      }
    }

    loadTopRatedMovies();
  }, [])

  return (
    <div className=''>
      {error && <div className='error'>{error}</div> }

      {loading ? <div className='flex justify-center items-center '>loading...</div> :
        <div className="grid grid-cols-3 lg:grid-cols-5 m-10 gap-6">
          {topRated.map((movie) => (<MovieCard movie={movie} key={movie.id}/>))}
        </div>
      }
    </div>
  )
}

export default TopRated