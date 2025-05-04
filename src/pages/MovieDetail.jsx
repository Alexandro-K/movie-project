import React from 'react'
import { useMovieContext } from '../Context/MovieContext'

const MovieDetail = () => {
    const { selectedMovie } = useMovieContext();
    

    return (
        <div className="flex justify-center p-32">
            <div className=' '>
                <div className="w-full border-b border-slate-300">
                    <div className="text-4xl">{selectedMovie.title}</div>
                    <div className="text-lg mb-4">{selectedMovie.release_date}</div>
                </div>
                <div className="w-full mt-4">
                    <div className="text-2xl max-w-xl pr-4">{selectedMovie.overview}</div>
                </div>
            </div>

            <div className=" border-l border-slate-300 pl-4">
                <img src={`https://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`} alt={selectedMovie.title} className='rounded-2xl inline-block'/>
            </div>
        </div>
    )
}

export default MovieDetail