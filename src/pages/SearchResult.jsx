import React from 'react'
import { useSearchContext } from '../Context/SearchContext'
import MovieCard from '../components/MovieCard';

const SearchResult = () => {
    const {error, loading, searchResults} = useSearchContext();

    return (
      <div className=''>
        {error && <div className='error'>{error}</div> }
        {loading && <div className='flex justify-center items-center '>loading...</div>}
        {!loading && !error && searchResults.length === 0 && <div className="font-bold text-3xl flex justify-center my-8">No Movies Found</div>} 
          <div className="grid grid-cols-6 m-10 gap-6">
            {searchResults.map((movie) => (<MovieCard movie={movie} key={movie.id}/>))}
          </div>
      </div>
    )
}

export default SearchResult