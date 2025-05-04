import { React }  from 'react'
import { useSearchContext } from '../Context/SearchContext'
import MovieSlider from '../components/MovieSlider';


const Home = () => {
  const {error, loading, moviesByGenre, popularMovies} = useSearchContext();

  return (
    <div className='relative'>

      {/* Error Checker */}
      {error && <div className='error'>{error}</div> }

      {/* Loading */}
      {loading && <div className='flex justify-center items-center '>loading...</div>}

      {/* Jika Movie Tidak ditemukan */}
      {/* {!loading && !error && movies.length === 0 && <div className="font-bold text-3xl flex justify-center my-8">No Movies Found</div>} */}

      {/* Memanggil movie slider */}

      <MovieSlider key={popularMovies.id} title='Popular Movies' movies={popularMovies}/>
      {Object.entries(moviesByGenre).map(([genreName, movies]) => (
        <MovieSlider key={genreName} title={`${genreName} Movies`} movies={movies}/>
      ))}
    </div>
  );
};

export default Home