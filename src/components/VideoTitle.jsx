import React from 'react'
import { FaPlay } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";

const VideoTitle = ({title, overview}) => {
  return (
    <div className='pt-60 px-16'>
      <h1 className='font-bold text-5xl '>{title}</h1>
      <p className='text-lg py-6 w-1/3'>{overview}</p>

      <div className='flex'>
        <div className=''>
        <button className='bg-[#6d6d6e] px-10 rounded-md text-lg text-black py-3 opacity-80 text-center flex items-center  '>
            <FaPlay />
            <span className='pl-4'>Play</span>
           
        </button>
        </div>
       <div><button className='bg-[#6d6d6e] px-10 rounded-md text-lg text-black py-3 opacity-80 text-center flex items-center mx-2 '>
            <BsInfoCircle />
            <span className='pl-4'>More Info</span>
           
        </button>
       </div>
        
      </div>
    </div>
  )
}

export default VideoTitle
