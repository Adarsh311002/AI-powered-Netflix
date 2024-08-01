import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {

  const movies = useSelector(store => store.movies)

  return (
    <div className=" bg-black">
      <div className="mt- md:-mt-60 relative z-20 pl-5 md:pl-10 overflow-hidden">
      <MovieList title={"Now Playing movies"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Top Rated movies"} movies={movies.topRatedMovies} />
      <MovieList title={"Upcoming"} movies={movies.upComingMovies} />
      <MovieList title={"Popular"} movies={movies.popularMovies} />
      <MovieList title={"All time best"} movies={movies.topRatedMovies} />
      </div>
    </div>
      
  )
}

export default SecondaryContainer
