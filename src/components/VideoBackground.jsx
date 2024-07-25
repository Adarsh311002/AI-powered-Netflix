import React from 'react'
import useMovieTrailer from '../hooks/useMovieTrailer'
import { useSelector } from 'react-redux';

const VideoBackground = ({movieId}) => {

   useMovieTrailer(movieId);
   const trailerVideo = useSelector(store => store.movies?.trailerVideo)
   
  return (
    <div>
      <iframe 
      className='w-screen aspect-video overflow-hidden' 
      src={"https://www.youtube.com/embed/" + trailerVideo?.key + "?controls=0&autoplay=1&mute=1&rel=0&modestbranding=1&showinfo=0&autohide=1"}
      title="YouTube video player" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      >
     </iframe>
    </div>
  )
}

export default VideoBackground
