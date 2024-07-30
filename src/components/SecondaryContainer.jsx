import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {

  const movies = useSelector(store => store.movies)

  return (
    <div className="   bg-black">
      <div className="-mt-0 md:-mt-60 relative z-20 pl-5 md:pl-10 overflow-hidden">
      <MovieList title={"Now Playing movies"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Thriller"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Comedy"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Horror"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Upcoming"} movies={movies.nowPlayingMovies} />
      </div>
    </div>
      
  )
}

export default SecondaryContainer
