import React from 'react'

const GptSeachBar = () => {
  return (
    <div className='pt-[10%] flex justify-center'>
      <form className='w-1/2 bg-black  grid grid-cols-12 rounded-lg'>
        <input
         type="text"
         placeholder='Getting confused with what to watch?'
         className='p-4 m-3 col-span-9 '
         />
         <button className='text-white bg-red-500 px-6 m-3  font-bold col-span-3'>Search</button>
      </form>
    </div>
  )
}

export default GptSeachBar
