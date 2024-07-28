import React, { useEffect } from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import { useSelector } from 'react-redux';
import GptSearch from './GptSearch';


const Browse = () => {
  
  useNowPlayingMovies()
  const gptSearch = useSelector(store => store.gpt?.gptSearch)

  return (
    <div>
      <Header />
      {
        gptSearch ?  <GptSearch />  : <>  <MainContainer />
      <SecondaryContainer /> </>
      }
      
    

    </div>
  )
}

export default Browse
