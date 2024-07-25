import React from 'react'
import { FaPlay } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";

const VideoTitle = ({title, overview}) => {
  return (
    <div className='bg-gradient-to-r from-black w-screen aspect-video z-10 absolute text-white pt-60 px-16 '>
      <h1 className='font-bold text-5xl '>{title}</h1>
      <p className=' text-gray-300 text-lg py-6 w-1/3'>{overview}</p>

      <div className='flex'>
        <div className=''>
        <button className='bg-white px-10 rounded-md text-lg text-black py-3 opacity-80 text-center flex items-center hover:bg-opacity-80 '>
            <FaPlay />
            <span className='pl-4'>Play</span>
           
        </button>
        </div>
       <div><button className='bg-gray-600 px-10 rounded-md text-lg text-black py-3 bg-opacity-80 text-center flex items-center mx-2 hover:bg-opacity-70'>
            <BsInfoCircle />
            <span className='pl-4'>More Info</span>
           
        </button>
       </div>
        
      </div>
    </div>
  )
}

export default VideoTitle
