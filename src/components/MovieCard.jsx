import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({posterpath}) => {
  if(!posterpath) return null;
  return (
    <div className='w-32 mx-1 '>
      <img src={IMG_CDN_URL + posterpath } alt="movie card" />
    </div>
  )
}

export default MovieCard
