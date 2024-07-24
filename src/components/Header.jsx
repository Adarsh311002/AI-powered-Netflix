import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/Firebase';
import { useNavigate, } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';




const Header = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(store => store.user)

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
     
    }).catch((error) => {
      // An error happened.
      navigate("/error")

    });
    
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid , email , displayName , photoURL} = user;
          dispatch(addUser({uid:uid , email:email , displayName: displayName , photoURL: photoURL}))
          navigate("/browse")
          // ...
        } else {
          dispatch(removeUser())
          navigate("/")
        }
      });

      return() => unsubscribe()

   },[])

  return (
    <div className='absolute bg-gradient-to-b from-black w-screen z-30 flex justify-between'>
      <img className={` w-48 mx-12 ${user && 'w-40'}`}  src={LOGO} 
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
