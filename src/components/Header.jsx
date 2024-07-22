import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../utils/Firebase';
import { useNavigate, } from 'react-router-dom';
import { useSelector } from 'react-redux';



const Header = () => {

  const navigate = useNavigate()
  const user = useSelector(store => store.user)

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/")
    }).catch((error) => {
      // An error happened.
      navigate("/error")

    });
    
  }

  return (
    <div className='absolute bg-gradient-to-b from-black w-screen z-30 flex justify-between'>
      <img className=' w-48 mx-20 ' src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" 
      alt="logo" 
      />

      {
      user &&       
        <div className='mx-28 my-5 w-12 h-12 flex'>
        <img src= {user.photoURL}
         alt="signout" 
         />
         <button onClick={handleSignOut} className='font-bold text-white px-2'>(SignOut)</button>
      </div>
      }
    </div>
  )
}

export default Header
