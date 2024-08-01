import React from 'react'
import { FaPlay } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";

const VideoTitle = ({title, overview}) => {
  return (
    <div className='bg-gradient-to-r from-black w-screen h-screen aspect-video z-10 absolute text-white pt-44 md:pt-60 px-6 md:px-16 overflow-hidden'>
      <h1 className='md:font-bold text-lg font-semibold md:text-5xl '>{title}</h1>
      <p className=' text-gray-300 hidden md:block text-lg py-6 w-1/3'>{overview}</p>

      <div className='flex'>
        <div className=''>
        <button className='bg-white px-2 md:px-10 rounded-md text-sm md:text-lg text-black py-1 my-2 md:py-3 opacity-80 text-center flex items-center hover:bg-opacity-80 '>
            <FaPlay />
            <span className='pl-4'>Play</span>
           
        </button>
        </div>
       <div className='hidden md:block'><button className='md:mt-2 bg-gray-600 px-10 rounded-md text-lg text-black py-3 bg-opacity-80 text-center flex items-center mx-2 hover:bg-opacity-70'>
            <BsInfoCircle />
            <span className='pl-4'>More Info</span>
           
        </button>
       </div>
        
      </div>
    </div>
  )
}

export default VideoTitle
