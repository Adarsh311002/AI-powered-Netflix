import React from 'react'
import Header from './Header'

const Login = () => {
  return (
    <div>
      <Header />
      <div className='absolute'>
      <img className='bg-gradient-to-b from-black ' src="https://assets.nflxext.com/ffe/siteui/vlv3/655a9668-b002-4262-8afb-cf71e45d1956/5ff265b6-3037-44b2-b071-e81750b21783/IN-en-20240715-POP_SIGNUP_TWO_WEEKS-perspective_WEB_c6d6616f-4478-4ac2-bdac-f54b444771dd_large.jpg" alt="picture" />
      </div>
      <form className="absolute w-[500px] bg-black my-40 mx-auto right-0 left-0 bg-opacity-80 text-white px-4 py-4 flex flex-col space-y-4 rounded-lg">
      <h1 className="font-bold text-3xl py-4 px-4">Sign In</h1>
      <input className=" bg-opacity-70 bg-[#282727] m-4 p-4 rounded-md " type="email" placeholder="Email or mobile number"/>
      <input className=" bg-opacity-70 bg-[#282727] m-4 p-4 rounded-md " type="password" placeholder="Password"/>
      <button className="bg-[#e50914] m-4 p-2 rounded-md  ">Sign In</button>
      <button className='m-4 py-6'>New to Netflix? Sign up now.</button>
      </form>

    </div>
  )
}

export default Login
