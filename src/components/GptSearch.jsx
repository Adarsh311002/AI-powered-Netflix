import React from 'react'
import GptSeachBar from './GptSeachBar'
import GptMovieSuggest from './GptMovieSuggest'
import { HOME_BG } from '../utils/constants'

const GptSearch = () => {
  return (
    <div>
      <div className="fixed -z-20">
        <img
          className=" h-screen w-screen object-cover"
          src={HOME_BG}
          alt="picture"
        />
      </div>
      <GptSeachBar />
      <GptMovieSuggest />
    </div>
  )
}

export default GptSearch
