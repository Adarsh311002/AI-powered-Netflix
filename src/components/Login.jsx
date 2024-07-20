import React, { useRef, useState } from 'react'
import Header from './Header'
import { Validate } from '../utils/Validate'

const Login = () => {
    
     const [isSignInForm , setIsSignInForm] = useState(true)
     const email = useRef(null)
     const password = useRef(null)
     const [errorMessage , setErrorMessage] = useState(null)

     const toggleSignForm = (e) => {
          setIsSignInForm(!isSignInForm)
     }

     const handleValidation = () => {
      // console.log(email.current.value)
      // console.log(password.current.value)

      const message = Validate(email.current.value,password.current.value)
      // console.log(message)

      setErrorMessage(message)



     }
    
  return (
    <div>
      <Header />
      <div className='absolute'>
      <img className=' h-screen w-screen ' src="https://assets.nflxext.com/ffe/siteui/vlv3/655a9668-b002-4262-8afb-cf71e45d1956/5ff265b6-3037-44b2-b071-e81750b21783/IN-en-20240715-POP_SIGNUP_TWO_WEEKS-perspective_WEB_c6d6616f-4478-4ac2-bdac-f54b444771dd_large.jpg" alt="picture" />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="absolute w-[500px] bg-black my-48 mx-auto right-0 left-0 bg-opacity-80 text-white px-4 py-4 flex flex-col space-y-6 rounded-lg">
      <h1 className="font-bold text-3xl py-4 px-12">{isSignInForm ? "Sign In": "Sign up"}</h1>
      {
        !isSignInForm && <input className=" bg-opacity-70 bg-[#282727] m-12 p-4 rounded-md border-[0.5px] border-gray " type="text" placeholder="Full name"/>

      }
      <input ref={email} className=" bg-opacity-70 bg-[#282727] m-12 p-4 rounded-md border-[0.5px] border-gray " type="email" placeholder="Email or mobile number"/>
      <input ref={password} className=" bg-opacity-70 bg-[#282727] m-12 p-4 rounded-md border-[0.5px] border-gray " type="password" placeholder="Password"/>
      <p className='text-red-600 m-12'>{errorMessage}</p>
      <button className="bg-[#e50914] m-12 p-3 rounded-md " onClick={handleValidation}>{isSignInForm ? "Sign In": "Sign up"}</button>
      <button onClick={toggleSignForm} className='m-4 py-6'>{isSignInForm ? "New to Netflix? Sign up now.": "Already a user? Sign in"}</button>
      </form>

    </div>
  )
}

export default Login
