import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GptMovieSuggest = () => {

  const {movieNames , movieResults} = useSelector(store => store.gpt)
  if(!movieNames) return null;

  return (
    <div className='p-4 m-4 bg-black text-white bg-opacity-90 overflow-hidden'>
      <div>
       {
        movieNames.map((movieName , index) => {
          return <MovieList
           title={movieName}
           key={movieName}
           movies={movieResults[index]}
          />
        })
       }
      </div>      
    </div>
  )
}

export default GptMovieSuggest
